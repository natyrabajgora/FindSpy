// App.tsx — Expo/React Native + TypeScript (2 players: P1 random word, P2 Spy)
import React, { useCallback, useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";

const WORDS = [
  "Bar",
  "Beach",
  "Cinema",
  "School",
  "Hospital",
  "Stadium",
  "Airport",
  "Cafe",
  "Library",
  "Museum",
] as const;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

type PlayerIndex = 0 | 1;

export default function App() {
  // 0 -> Player 1, 1 -> Player 2 (Spy)
  const [player, setPlayer] = useState<PlayerIndex>(0);
  const [revealed, setRevealed] = useState(false);
  const [word, setWord] = useState<string | null>(null); // “lock” kur P1 e hap

  const onReveal = useCallback(() => {
    if (revealed) return;
    if (player === 0) {
      const w = word ?? pickRandom(WORDS);
      setWord(w);
    }
    setRevealed(true);
  }, [player, revealed, word]);

  const nextPlayer = useCallback(() => {
    if (player === 0) {
      setPlayer(1);
      setRevealed(false);
    }
  }, [player]);

  const reset = useCallback(() => {
    setPlayer(0);
    setRevealed(false);
    setWord(null);
  }, []);

  const isSpy = player === 1;

  return (
    <SafeAreaView style={s.root}>
      {/* Header “X” si në screenshot */}
      <View style={s.header}>
        <Text style={s.headerX}>✕</Text>
      </View>

      {/* Karta */}
      <Pressable style={s.card} onPress={onReveal}>
        <Text style={s.playerTitle}>Player {player + 1}</Text>

        {!revealed ? (
          <Text style={s.revealHint}>Move up to Reveal</Text>
        ) : (
          <View style={s.revealBox}>
            {isSpy ? (
              <>
                <Text style={[s.role, s.spy]}>Spy</Text>
                <Text style={s.sub}>Figure out the secret key.</Text>
              </>
            ) : (
              <>
                <Text style={[s.role, s.word]}>{word}</Text>
                <Text style={s.sub}>Find the Spy before time runs out!</Text>
              </>
            )}
          </View>
        )}
      </Pressable>

      {/* Footer / Controls */}
      <View style={s.footer}>
        <Text style={s.footerHint}>
          Drag your card up to reveal the word. Make sure no one else sees it.
        </Text>

        {!revealed && (
          <Pressable style={[s.btn, s.btnLight]} onPress={onReveal}>
            <Text style={s.btnLightText}>Reveal</Text>
          </Pressable>
        )}

        {revealed && player === 0 && (
          <Pressable style={[s.btn, s.btnDark]} onPress={nextPlayer}>
            <Text style={s.btnDarkText}>Next Player</Text>
          </Pressable>
        )}

        {revealed && player === 1 && (
          <Pressable style={[s.btn, s.btnDark]} onPress={reset}>
            <Text style={s.btnDarkText}>New Round</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#ff3b30" },
  header: { height: 44, alignItems: "flex-end", justifyContent: "center", paddingHorizontal: 12 },
  headerX: { color: "white", fontSize: 18, opacity: 0.9 },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#111827",
    height: 320,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  playerTitle: { color: "white", fontSize: 26, fontWeight: "900", textAlign: "center", marginTop: 6 },
  revealHint: { color: "white", opacity: 0.9, textAlign: "center", marginTop: 180, fontWeight: "700" },
  revealBox: {
    backgroundColor: "#0f172a",
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  role: { fontSize: 36, fontWeight: "900" },
  word: { color: "white" },
  spy: { color: "#F43F5E" },
  sub: { color: "#cbd5e1", marginTop: 8, textAlign: "center" },
  footer: { paddingHorizontal: 16, marginTop: 18 },
  footerHint: { color: "white", textAlign: "center", opacity: 0.9, marginBottom: 12 },
  btn: { borderRadius: 14, paddingVertical: 14, alignItems: "center", marginTop: 6 },
  btnLight: { backgroundColor: "white" },
  btnLightText: { color: "#111827", fontWeight: "800" },
  btnDark: { backgroundColor: "#111827" },
  btnDarkText: { color: "white", fontWeight: "800" },
});
