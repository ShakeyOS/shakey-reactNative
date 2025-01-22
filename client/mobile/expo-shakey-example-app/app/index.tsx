import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigation/MainNavigator";
import "@walletconnect/react-native-compat";
import { WalletConnectModal } from "@walletconnect/modal-react-native";

const App = () => {
    axios.defaults.baseURL =
        Platform.OS === "ios"
            ? "http://localhost:3000/"
            : "http://10.0.2.2:3000/";

    const projectId = "e2b0a522f1630d3c160069657082a3bc";
    const providerMetadata = {
        name: "rnshakeyosexample",
        description: "First Mobile Ai Agent App",
        url: "https://rnshakeyosexample.com/",
        icons: ["https://rnshakeyosexample.com/"],
        redirect: {
            native: "rnshakeyosexample://",
            universal: "https://rnshakeyosexample.com",
        },
        chains: [1 || ""],
    };

    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <WalletConnectModal
                projectId={projectId}
                providerMetadata={providerMetadata}
            />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <MainNavigator />
            </KeyboardAvoidingView>
        </SafeAreaProvider>
    );
};

export default App;
