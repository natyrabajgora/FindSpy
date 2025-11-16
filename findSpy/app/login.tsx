// app/login.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const [loading, setLoading] = useState(false);

    // Google OAuth – PA useProxy (që t’mos ta japë error)
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "GOOGLE_CLIENT_ID_YT", // nga Google Cloud Console
    });

    useEffect(() => {
        const signInWithGoogleFirebase = async () => {
            if (response?.type === "success") {
                const idToken = response.authentication?.idToken;

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

    const validate = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email || !email.includes("@")) {
            newErrors.email = "Email i pavlefshëm.";
        }

        if (!password || password.length < 6) {
            newErrors.password = "Passwordi duhet ≥ 6 karaktere.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleGoogleLogin = async () => {
        if (!request) {
            Alert.alert("Gabim", "Google Login nuk është gati.");
            return;
        }
        await promptAsync();
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

            <TouchableOpacity
                style={[styles.button, styles.googleButton]}
                onPress={handleGoogleLogin}
                disabled={!request || loading}
            >
                <Text style={styles.buttonText}>Vazhdo me Google</Text>
            </TouchableOpacity>
        </View>
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
});
