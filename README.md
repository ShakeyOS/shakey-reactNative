# Welcome to the Shakey World! 

![Header 01](https://github.com/user-attachments/assets/8f784417-e185-4c09-a4cf-b769ab17ca5b)

Shakey OS is the first open source Mobile AI Framework for React Native allowing people to build apps for IOS and Android with AI tooling and wallet integrated out of the box.

## How it works ( this demo example app is provided in the code ) 




https://github.com/user-attachments/assets/9adb1b8f-54bb-462a-8616-a4f06152b395




## ShakeyOS Guide
### Prerequisites 

Before getting started with ShakyOS, ensure you have the following installed:
> Node.js 23+
> pnpm 9+
> Git for version control
> A code editor (VS Code or VSCodium recommended)
> React Native environment setup
> Flutter Environment Setup

## Installation For the Base AI Tooling

### Clone and Install
> Navigate to the project directory:
> cd shakey-reactnative
> Install dependencies (on initial run):
> pnpm install --no-frozen-lockfile

### Build local libraries:
> pnpm build
> Configure Environment
> Copy the example environment file:
> cp .env.example .env
> Edit .env and add your values:

## Suggested quick-start environment variables
DISCORD_APPLICATION_ID=  # For Discord integration
DISCORD_API_TOKEN=       # Bot token
HEURIST_API_KEY=         # Heurist API key for LLM and image generation
OPENAI_API_KEY=          # OpenAI API key
GROK_API_KEY=            # Grok API key
ELEVENLABS_XI_API_KEY=   # API key from ElevenLabs (for voice)
LIVEPEER_GATEWAY_URL=    # Livepeer gateway URL

## Create Your First Agent

### To create a Character File
> Check out characters/trump.character.json or characters/tate.character.json as templates for creating and customizing your agent's personality and behavior. Additionally, you can review core/src/core/defaultCharacter.ts (in version 0.0.10, but post-refactor, it will be located in packages/core/src/defaultCharacter.ts).

### Start the Agent
Specify which character you want to run:

> pnpm start --character="characters/trump.character.json"
To load multiple characters, use a comma-separated list:
> pnpm start --characters="characters/trump.character.json,characters/tate.character.json"

Interacting with the Agent
You're now ready to start a conversation with your agent! Open a new terminal window and begin interacting.

## React Native Project Setup

Ensure React Native Environment is Set Up

### Install Dependencies

### We have three example projects setup, two are with vanilla react native and one is with expo so you can use any that you like 

Install the Node modules for the base app rn-shakey-app:
> npm run react-native-install

Install the Node modules for the example app:
> npm run rn-example-install

Install the Node modules for the Expo example app:
> npm run expo-example-install


Install Pods (for iOS) In the root directory:

For the base app:
> cd client/mobile/rn-shakey-app
> npx pod-install ios

For the React Native example app:
> cd client/mobile/rn-shakey-example-app
> npx pod-install ios


Run App on Emulator (Android) Note: To access the Wallet Connect feature, download a wallet app (e.g., MetaMask, Trust Wallet, etc.) in the emulator.

For the Base App:
> npm run start:react-native

For the Example App:
> npm run start:rn-shakeyos-example

For the Expo Example App:
> npm run start:expo-shakeyos-example


### Run on Simulator (iOS) Note: The Wallet Connect feature is currently unavailable on iOS due to deployment issues but will be available soon!

For the Base App:
> cd client/mobile/rn-shakey-app
> npm run ios

Alternatively, start the build via Xcode by opening rn-shakey-example/Shakey_RN.xcworkspace.

For the Example App:
> cd client/mobile/rn-shakey-example-app
> npm run ios

Alternatively, start the build via Xcode by opening rn-shakey-example/RN_ShakeyOs.xcworkspace.

For the Expo Example App:
> npm run start:expo-shakeyos-example
> press i for iOS.

Now you’re all set up to develop with ShakyOS!

### Note - We are still early development and improving our systems, we would appreciate code contributions to make Shakey the best open source AI resource for mobile apps! 
