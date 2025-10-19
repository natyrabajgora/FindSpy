import React from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

export default function RevealScreen() {
  const params = useLocalSearchParams<{ spies?: string }>();
  const spies = params.spies ? JSON.parse(params.spies) : [];

  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <Text style={s.title}>
          {spies.length > 1 ? "The Spies are..." : "The Spy is..."}
        </Text>

        <View style={s.card}>
          {spies.map((spyIndex: number, i: number) => (
            <Text key={i} style={s.spyName}>
              Player {spyIndex + 1}
            </Text>
          ))}
        </View>

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
    alignItems: "center",
  },
  spyName: { color: "#ff0000ff", fontSize: 28, fontWeight: "900", marginBottom: 10 },
  btnPrimary: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },
  btnPrimaryText: { color: "#111827", fontWeight: "800" },
});
