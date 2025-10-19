// app/reveal.tsx
import React from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function RevealScreen() {
  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <Text style={s.title}>The Spy is...</Text>

        <View style={s.card}>
          {/* Placeholder statik */}
          <Text style={s.spyName}>Player …</Text>
        </View>

        {/* Kthen te Setup (/ root) */}
        <Link href="/setup" asChild>
          <Pressable style={s.btnPrimary}>
            <Text style={s.btnPrimaryText}>Start New Game</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#26423dff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { color: "white", fontSize: 26, fontWeight: "900", marginBottom: 20 },
  card: {
    backgroundColor: "#111827",
    paddingVertical: 30,
    paddingHorizontal: 60,
    borderRadius: 18,
    marginBottom: 30,
  },
  spyName: { color: "#ff0000ff", fontSize: 28, fontWeight: "900" },
  btnPrimary: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  btnPrimaryText: { color: "#111827", fontWeight: "800" },
});
