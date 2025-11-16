// app/_layout.tsx
import { Stack } from "expo-router";
import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
function RootNavigator() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            {user ? (
                // Nëse është i kyçur -> shkon në Home (index) + ekranet tjera të lojës
                <>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="setup" />
                    <Stack.Screen name="cards" />
                    <Stack.Screen name="reveal" />
                </>
            ) : (
                // Nëse NUK është i kyçur -> vetëm login-i
                <Stack.Screen name="login" />
            )}
        </Stack>
    );
}
