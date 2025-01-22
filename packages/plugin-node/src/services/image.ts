import {
    elizaLogger,
    getEndpoint,
    IAgentRuntime,
    IImageDescriptionService,
    ModelProviderName,
    models,
    Service,
    ServiceType,
} from "@elizaos/core";
import {
    AutoProcessor,
    AutoTokenizer,
    env,
    Florence2ForConditionalGeneration,
    Florence2Processor,
    PreTrainedModel,
    PreTrainedTokenizer,
    RawImage,
    type Tensor,
} from "@huggingface/transformers";
import fs from "fs";
import gifFrames from "gif-frames";
import os from "os";
import path from "path";

const IMAGE_DESCRIPTION_PROMPT =
    "Describe this image and give it a title. The first line should be the title, and then a line break, then a detailed description of the image. Respond with the format 'title\\ndescription'";

interface ImageProvider {
    initialize(): Promise<void>;
    describeImage(
        imageData: Buffer,
        mimeType: string
    ): Promise<{ title: string; description: string }>;
}

// Utility functions
const convertToBase64DataUrl = (
    imageData: Buffer,
    mimeType: string
): string => {
    const base64Data = imageData.toString("base64");
    return `data:${mimeType};base64,${base64Data}`;
};

const handleApiError = async (
    response: Response,
    provider: string
): Promise<never> => {
    const responseText = await response.text();
    elizaLogger.error(
        `${provider} API error:`,
        response.status,
        "-",
        responseText
    );
    throw new Error(`HTTP error! status: ${response.status}`);
};

const parseImageResponse = (
    text: string
): { title: string; description: string } => {
    const [title, ...descriptionParts] = text.split("\n");
    return { title, description: descriptionParts.join("\n") };
};

class LocalImageProvider implements ImageProvider {
    private model: PreTrainedModel | null = null;
    private processor: Florence2Processor | null = null;
    private tokenizer: PreTrainedTokenizer | null = null;
    private modelId: string = "onnx-community/Florence-2-base-ft";

    async initialize(): Promise<void> {
        env.allowLocalModels = false;
        env.allowRemoteModels = true;
        env.backends.onnx.logLevel = "fatal";
        env.backends.onnx.wasm.proxy = false;
        env.backends.onnx.wasm.numThreads = 1;

        elizaLogger.info("Downloading Florence model...");
        this.model = await Florence2ForConditionalGeneration.from_pretrained(
            this.modelId,
            {
                device: "gpu",
                progress_callback: (progress) => {
                    if (progress.status === "downloading") {
                        const percent = (
                            (progress.loaded / progress.total) *
                            100
                        ).toFixed(1);
                        const dots = ".".repeat(
                            Math.floor(Number(percent) / 5)
                        );
                        elizaLogger.info(
                            `Downloading Florence model: [${dots.padEnd(20, " ")}] ${percent}%`
                        );
                    }
                },
            }
        );

        elizaLogger.info("Downloading processor...");
        this.processor = (await AutoProcessor.from_pretrained(
            this.modelId
        )) as Florence2Processor;

        elizaLogger.info("Downloading tokenizer...");
        this.tokenizer = await AutoTokenizer.from_pretrained(this.modelId);
        elizaLogger.success("Image service initialization complete");
    }

    async describeImage(
        imageData: Buffer
    ): Promise<{ title: string; description: string }> {
        if (!this.model || !this.processor || !this.tokenizer) {
            throw new Error("Model components not initialized");
        }

        const base64Data = imageData.toString("base64");
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        const image = await RawImage.fromURL(dataUrl);
        const visionInputs = await this.processor(image);
        const prompts = this.processor.construct_prompts("<DETAILED_CAPTION>");
        const textInputs = this.tokenizer(prompts);

        elizaLogger.log("Generating image description");
        const generatedIds = (await this.model.generate({
            ...textInputs,
            ...visionInputs,
            max_new_tokens: 256,
        })) as Tensor;

        const generatedText = this.tokenizer.batch_decode(generatedIds, {
            skip_special_tokens: false,
        })[0];

        const result = this.processor.post_process_generation(
            generatedText,
            "<DETAILED_CAPTION>",
            image.size
        );

        const detailedCaption = result["<DETAILED_CAPTION>"] as string;
        return { title: detailedCaption, description: detailedCaption };
    }
}

class OpenAIImageProvider implements ImageProvider {
    constructor(private runtime: IAgentRuntime) {}

    async initialize(): Promise<void> {}

    async describeImage(
        imageData: Buffer,
        mimeType: string
    ): Promise<{ title: string; description: string }> {
        const imageUrl = convertToBase64DataUrl(imageData, mimeType);

        const content = [
            { type: "text", text: IMAGE_DESCRIPTION_PROMPT },
            { type: "image_url", image_url: { url: imageUrl } },
        ];

        const endpoint =
            this.runtime.imageVisionModelProvider === ModelProviderName.OPENAI
                ? getEndpoint(this.runtime.imageVisionModelProvider)
                : "https://api.openai.com/v1";

        const response = await fetch(endpoint + "/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.runtime.getSetting("OPENAI_API_KEY")}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content }],
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            await handleApiError(response, "OpenAI");
        }

        const data = await response.json();
        return parseImageResponse(data.choices[0].message.content);
    }
}

class GoogleImageProvider implements ImageProvider {
    constructor(private runtime: IAgentRuntime) {}

    async initialize(): Promise<void> {}

    async describeImage(
        imageData: Buffer,
        mimeType: string
    ): Promise<{ title: string; description: string }> {
        const endpoint = getEndpoint(ModelProviderName.GOOGLE);
        const apiKey = this.runtime.getSetting("GOOGLE_GENERATIVE_AI_API_KEY");

        const response = await fetch(
            `${endpoint}/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: IMAGE_DESCRIPTION_PROMPT },
                                {
                                    inline_data: {
                                        mime_type: mimeType,
                                        data: imageData.toString("base64"),
                                    },
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            await handleApiError(response, "Google Gemini");
        }

        const data = await response.json();
        return parseImageResponse(data.candidates[0].content.parts[0].text);
    }
}

export class ImageDescriptionService
    extends Service
    implements IImageDescriptionService
{
    static serviceType: ServiceType = ServiceType.IMAGE_DESCRIPTION;

    private initialized: boolean = false;
    private runtime: IAgentRuntime | null = null;
    private provider: ImageProvider | null = null;

    getInstance(): IImageDescriptionService {
        return ImageDescriptionService.getInstance();
    }

    async initialize(runtime: IAgentRuntime): Promise<void> {
        elizaLogger.log("Initializing ImageDescriptionService");
        this.runtime = runtime;
    }

    private async initializeProvider(): Promise<void> {
        if (!this.runtime) {
            throw new Error("Runtime is required for image recognition");
        }

        const model = models[this.runtime?.character?.modelProvider];

        if (this.runtime.imageVisionModelProvider) {
            if (
                this.runtime.imageVisionModelProvider ===
                ModelProviderName.LLAMALOCAL
            ) {
                this.provider = new LocalImageProvider();
                elizaLogger.debug("Using llama local for vision model");
            } else if (
                this.runtime.imageVisionModelProvider ===
                ModelProviderName.GOOGLE
            ) {
                this.provider = new GoogleImageProvider(this.runtime);
                elizaLogger.debug("Using google for vision model");
            } else if (
                this.runtime.imageVisionModelProvider ===
                ModelProviderName.OPENAI
            ) {
                this.provider = new OpenAIImageProvider(this.runtime);
                elizaLogger.debug("Using openai for vision model");
            } else {
                elizaLogger.error(
                    `Unsupported image vision model provider: ${this.runtime.imageVisionModelProvider}`
                );
            }
        } else if (model === models[ModelProviderName.LLAMALOCAL]) {
            this.provider = new LocalImageProvider();
            elizaLogger.debug("Using llama local for vision model");
        } else if (model === models[ModelProviderName.GOOGLE]) {
            this.provider = new GoogleImageProvider(this.runtime);
            elizaLogger.debug("Using google for vision model");
        } else {
            elizaLogger.debug("Using default openai for vision model");
            this.provider = new OpenAIImageProvider(this.runtime);
        }

        await this.provider.initialize();
        this.initialized = true;
    }

    private async loadImageData(
        imageUrl: string
    ): Promise<{ data: Buffer; mimeType: string }> {
        const isGif = imageUrl.toLowerCase().endsWith(".gif");
        let imageData: Buffer;
        let mimeType: string;

        if (isGif) {
            const { filePath } = await this.extractFirstFrameFromGif(imageUrl);
            imageData = fs.readFileSync(filePath);
            mimeType = "image/png";
            fs.unlinkSync(filePath); // Clean up temp file
        } else {
            if (fs.existsSync(imageUrl)) {
                imageData = fs.readFileSync(imageUrl);
                const ext = path.extname(imageUrl).slice(1);
                mimeType = ext ? `image/${ext}` : "image/jpeg";
            } else {
                const response = await fetch(imageUrl);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch image: ${response.statusText}`
                    );
                }
                imageData = Buffer.from(await response.arrayBuffer());
                mimeType = response.headers.get("content-type") || "image/jpeg";
            }
        }

        if (!imageData || imageData.length === 0) {
            throw new Error("Failed to fetch image data");
        }

        return { data: imageData, mimeType };
    }

    private async extractFirstFrameFromGif(
        gifUrl: string
    ): Promise<{ filePath: string }> {
        const frameData = await gifFrames({
            url: gifUrl,
            frames: 1,
            outputType: "png",
        });

        const tempFilePath = path.join(
            os.tmpdir(),
            `gif_frame_${Date.now()}.png`
        );

        return new Promise((resolve, reject) => {
            const writeStream = fs.createWriteStream(tempFilePath);
            frameData[0].getImage().pipe(writeStream);
            writeStream.on("finish", () => resolve({ filePath: tempFilePath }));
            writeStream.on("error", reject);
        });
    }

    async describeImage(
        imageUrl: string
    ): Promise<{ title: string; description: string }> {
        if (!this.initialized) {
            await this.initializeProvider();
        }

        try {
            const { data, mimeType } = await this.loadImageData(imageUrl);
            return await this.provider!.describeImage(data, mimeType);
        } catch (error) {
            elizaLogger.error("Error in describeImage:", error);
            throw error;
        }
    }
}

export default ImageDescriptionService;
