import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Pressable, View, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function SignupScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSignup = () => {
        if (!email || !password || !confirm) {
            Alert.alert("Gabim", "Ju lutem plotësoni të gjitha fushat.");
            return;
        }

        if (password !== confirm) {
            Alert.alert("Gabim", "Fjalëkalimet nuk përputhen.");
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

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={s.input}
                />

                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirm}
                    onChangeText={setConfirm}
                    style={s.input}
                />

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
