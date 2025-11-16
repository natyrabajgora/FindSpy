// app/login.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Platform,
    SafeAreaView,
    StatusBar,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import type { AuthValidationErrors } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

type GoogleOAuthConfig = Google.GoogleAuthRequestConfig & {
    expoClientId?: string;
};

export default function LoginScreen() {
    const { validateAuthForm } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<AuthValidationErrors>({});
    const [loading, setLoading] = useState(false);

    const googleOAuthConfig = useMemo(() => {
        const config: GoogleOAuthConfig = {};

        const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

        if (webClientId) {
            // për web mjafton kjo
            config.clientId = webClientId;
            config.webClientId = webClientId;
        }

        // Android / iOS nuk na duhen për browser, por po i lë nëse i shton ndonjëherë
        if (process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID) {
            config.androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
        }

        if (process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID) {
            config.iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
        }

        return config;
    }, []);

    const googleSignInConfigured = useMemo(() => {
        return Boolean(googleOAuthConfig.clientId);
    }, [googleOAuthConfig]);

    const googleClientEnvHint = useMemo(() => {
        return (
            Platform.select({
                ios: "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ose EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID",
                android: "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ose EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID",
                default: "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID",
            }) ?? "Client ID-të e Google"
        );
    }, []);

    const validate = () => {
        const formErrors = validateAuthForm({ email, password });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (e: any) {
            Alert.alert("Gabim në login", e.message || "Kontrollo email/password.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
            Alert.alert("Sukses", "Llogaria u krijua me sukses!");
        } catch (e: any) {
            Alert.alert("Gabim në regjistrim", e.message || "Diçka shkoi keq.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="light-content" />
            <View style={styles.center}>
                <Text style={styles.title}>SPY</Text>
                <Text style={styles.subtitle}>Kyçu ose krijo llogari për të vazhduar</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9E9E9E"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9E9E9E"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <TouchableOpacity style={[styles.btn, styles.primary]} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.btnText}>{loading ? "Duke hyrë..." : "LOGIN"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.btnText}>
                            {loading ? "Duke regjistruar..." : "REGISTER"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>ose</Text>
                    <View style={styles.divider} />
                </View>

                {googleSignInConfigured ? (
                    <GoogleSignInButton config={googleOAuthConfig} loading={loading} />
                ) : (
                    <View style={styles.googleBlockedContainer}>
                        <TouchableOpacity style={[styles.btn, styles.googleButton]} disabled>
                            <Text style={styles.btnText}>VAZHDO ME GOOGLE</Text>
                        </TouchableOpacity>
                        <Text style={styles.googleHint}>
                            Shto {googleClientEnvHint} në .env sipas README që ky buton të aktivizohet.
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

type GoogleSignInButtonProps = {
    config: Google.GoogleAuthRequestConfig;
    loading: boolean;
};

function GoogleSignInButton({ config, loading }: GoogleSignInButtonProps) {
    // @ts-ignore – TypeScript nuk e njeh useProxy, por runtime punon
    const redirectUri = makeRedirectUri({ useProxy: true });

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            config.clientId ??
            config.webClientId ??
            config.androidClientId ??
            config.iosClientId,
        iosClientId: config.iosClientId,
        androidClientId: config.androidClientId,
        webClientId: config.webClientId,
        redirectUri,
    });

    useEffect(() => {
        const signInWithGoogleFirebase = async () => {
            if (response?.type === "success") {
                const idToken =
                    response.params?.id_token ?? response.authentication?.idToken;

                if (!idToken) {
                    Alert.alert("Gabim", "Nuk u mor ID token nga Google.");
                    return;
                }

                const credential = GoogleAuthProvider.credential(idToken);

                try {
                    await signInWithCredential(auth, credential);
                    // _layout e sheh user-in dhe shkon automatikisht në index
                } catch (e: any) {
                    Alert.alert("Gabim", e.message || "Nuk u kyç me Google.");
                }
            }
        };

        signInWithGoogleFirebase();
    }, [response]);

    const handleGoogleLogin = async () => {
        if (!request) {
            Alert.alert("Gabim", "Google Login nuk është gati.");
            return;
        }
        await promptAsync();
    };

    return (
        <TouchableOpacity
            style={[styles.btn, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={!request || loading}
        >
            <Text style={styles.btnText}>VAZHDO ME GOOGLE</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#121212" },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: "900",
        letterSpacing: 1,
        color: "#26423dff",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#EDEDED",
        opacity: 0.9,
        marginBottom: 24,
        textAlign: "center",
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "86%",
        backgroundColor: "#1E1E1E",
        borderRadius: 22,
        paddingVertical: 14,
        paddingHorizontal: 18,
        color: "#fff",
        marginBottom: 10,
    },
    btn: {
        width: "86%",
        paddingVertical: 16,
        borderRadius: 22,
        backgroundColor: "#2B2B2B",
        alignItems: "center",
        marginTop: 12,
    },
    primary: { backgroundColor: "#26423dff" },
    btnText: { color: "white", fontWeight: "800", letterSpacing: 1, fontSize: 16 },
    error: { color: "#ff6b6b", alignSelf: "flex-start", marginLeft: "7%", marginBottom: 6 },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
        width: "86%",
    },
    divider: { flex: 1, height: 1, backgroundColor: "#2F2F2F" },
    dividerText: { marginHorizontal: 8, color: "#EDEDED", opacity: 0.6 },
    googleBlockedContainer: { width: "100%", marginTop: 16, alignItems: "center" },
    googleButton: {
        backgroundColor: "#db4437",
        marginTop: 16,
    },
    googleHint: {
        marginTop: 8,
        textAlign: "center",
        color: "#EDEDED",
        opacity: 0.7,
        width: "86%",
    },
});
