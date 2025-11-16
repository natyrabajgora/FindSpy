// app/login.tsx
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
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
        const config: GoogleOAuthConfig = {clientId: "", redirectUri: ""};

        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        if (process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID) {
            config.webClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID;
            // expoClientId still helps when running inside Expo Go even though the type
            // is missing it.
            config.expoClientId = process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID;
        }

        if (process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID) {
            config.androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID;
        }

        if (process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID) {
            config.iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
        }

        if (process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID) {
            config.webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
        }

        return config;
    }, []);

    const googleSignInConfigured = useMemo(() => {
        return Boolean(
            Platform.select({
                ios: googleOAuthConfig.iosClientId ?? googleOAuthConfig.clientId,
                android: googleOAuthConfig.androidClientId ?? googleOAuthConfig.clientId,
                default: googleOAuthConfig.webClientId ?? googleOAuthConfig.clientId,
            }),
        );
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
        <View style={styles.container}>
            <Text style={styles.title}>FindSpy Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? "Duke hyrë..." : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={handleRegister}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Duke regjistruar..." : "Register"}
                </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>ose</Text>
                <View style={styles.divider} />
            </View>

            {googleSignInConfigured ? (
                <GoogleSignInButton config={googleOAuthConfig} loading={loading} />
            ) : (
                <View style={styles.googleBlockedContainer}>
                    <TouchableOpacity style={[styles.button, styles.googleButton]} disabled>
                        <Text style={styles.buttonText}>Vazhdo me Google</Text>
                    </TouchableOpacity>
                    <Text style={styles.googleHint}>
                        Shto {googleClientEnvHint} në .env sipas README që ky buton të aktivizohet.
                    </Text>
                </View>
            )}
        </View>
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
            style={[styles.button, styles.googleButton]}
            onPress={handleGoogleLogin}
            disabled={!request || loading}
        >
            <Text style={styles.buttonText}>Vazhdo me Google</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#fff" },
    title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#1e90ff",
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    secondaryButton: {
        backgroundColor: "#4caf50",
    },
    googleButton: {
        backgroundColor: "#db4437",
        marginTop: 16,
    },
    buttonText: { color: "#fff", fontWeight: "600" },
    error: { color: "red", marginBottom: 8 },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    divider: { flex: 1, height: 1, backgroundColor: "#ccc" },
    dividerText: { marginHorizontal: 8, color: "#777" },
    googleBlockedContainer: { width: "100%", marginTop: 16 },
    googleHint: {
        marginTop: 8,
        textAlign: "center",
        color: "#555",
    },
});
