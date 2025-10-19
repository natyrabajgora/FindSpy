import React, { useState } from "react";
import { SafeAreaView, Text, TextInput, Pressable, Alert, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // 👈 importo useRouter

export default function LoginScreen() {
    const router = useRouter(); // 👈 inicializo router-in
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Gabim", "Ju lutem plotësoni të gjitha fushat.");
            return;
        }

        if (email === "example@user.com" && password === "12345678") {
            // ✅ Shko në faqen tjetër (p.sh. game.tsx)
            router.push("/setup");
        } else {
            Alert.alert("Gabim", "Kredencialet janë të pasakta.");
        }
    };

    return (
        <SafeAreaView style={s.root}>
            <View style={s.center}>
                <Text style={s.title}>Login</Text>

                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={s.input}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={s.input}
                />

                <Pressable style={s.btnDark} onPress={handleLogin}>
                    <Text style={s.btnDarkText}>Login</Text>
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
        marginTop: 10,
    },
    btnDarkText: { color: "white", fontWeight: "800" },
});
