import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Pressable, View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import type { AuthValidationErrors } from "../context/AuthContext";

export default function SignupScreen() {
    const router = useRouter();
    const { validateAuthForm } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState<AuthValidationErrors>({});

    const handleSignup = () => {
        const formErrors = validateAuthForm({
            email,
            password,
            confirmPassword: confirm,
            requireConfirm: true,
        });

        setErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            const firstErrorMessage =
                formErrors.email || formErrors.password || formErrors.confirmPassword;
            if (firstErrorMessage) {
                Alert.alert("Gabim", firstErrorMessage);
            }
            return;
        }

        Alert.alert("Sukses", "Llogaria u krijua me sukses!");
        router.push("/"); // kthehu te login
    };

    return (
        <SafeAreaView style={s.root}>
            <View style={s.center}>
                <Text style={s.title}>Sign Up</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                    style={s.input}
                />
                {errors.email && <Text style={s.error}>{errors.email}</Text>}

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={s.input}
                />
                {errors.password && <Text style={s.error}>{errors.password}</Text>}

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirm}
                    onChangeText={setConfirm}
                    style={s.input}
                />
                {errors.confirmPassword && (
                    <Text style={s.error}>{errors.confirmPassword}</Text>
                )}

                <Pressable style={s.btnDark} onPress={handleSignup}>
                    <Text style={s.btnDarkText}>Sign Up</Text>
                </Pressable>

                <Pressable style={s.btnLight} onPress={() => router.push("/login")}>
                    <Text style={s.btnLightText}>Back to Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#26423dff" },
    center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 20 },
    title: { color: "white", fontSize: 32, fontWeight: "900" },
    input: {
        backgroundColor: "#111827",
        color: "white",
        width: "80%",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    error: {
        color: "#f87171",
        width: "80%",
        textAlign: "left",
        marginTop: -12,
    },
    btnDark: {
        backgroundColor: "#111827",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        width: "60%",
    },
    btnDarkText: { color: "white", fontWeight: "800" },
    btnLight: {
        backgroundColor: "white",
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        width: "60%",
    },
    btnLightText: { color: "#111827", fontWeight: "800" },
});
