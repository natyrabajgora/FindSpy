import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";

const WORDS = [
  "Bar", "Beach", "Cinema", "School", "Hospital",
  "Stadium", "Airport", "Cafe", "Library", "Museum"
] as const;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function App() {
  const [player, setPlayer] = useState(0); 
  const [revealed, setRevealed] = useState(false);
  const [word, setWord] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false); 

  // Kur lojtari prek card 
  const handleReveal = () => {
    if (revealed) return;

    if (player === 0) {
      const newWord = word ?? pickRandom(WORDS);
      setWord(newWord);
    }

    setRevealed(true);
  };

  // Kalon te lojtari tjeter
  const handleNextPlayer = () => {
    if (player === 0) {
      setPlayer(1);
      setRevealed(false);
    } else {
      // kur mbaron Player 2 → loja mbaron
      setGameOver(true);
    }
  };

  // Rifillon loja
  const handleRestart = () => {
    setPlayer(0);
    setRevealed(false);
    setWord(null);
    setGameOver(false);
  };

  const isSpy = player === 1;

  
  if (gameOver) {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Text style={s.bigText}>TIMER</Text>
          <Pressable style={s.btnDark} onPress={handleRestart}>
            <Text style={s.btnDarkText}>Start New Game</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  
  return (
    <SafeAreaView style={s.root}>
      {/* Titulli */}
      <View style={s.header}>
        <Text style={s.headerX}>✕</Text>
      </View>

      {/* Karta */}
      <Pressable style={s.card} onPress={handleReveal}>
        <Text style={s.playerTitle}>Player {player + 1}</Text>

        {!revealed ? (
          <Text style={s.revealHint}>Tap to Reveal</Text>
        ) : (
          <View style={s.revealBox}>
            {isSpy ? (
              <>
                <Text style={[s.role, s.spy]}>Spy</Text>
                <Text style={s.sub}>Figure out the secret word.</Text>
              </>
            ) : (
              <>
                <Text style={[s.role, s.word]}>{word}</Text>
                <Text style={s.sub}>Find who the spy is!</Text>
              </>
            )}
          </View>
        )}
      </Pressable>

      {/* Butonat posht */}
      <View style={s.footer}>
        {!revealed && (
          <Pressable style={s.btnLight} onPress={handleReveal}>
            <Text style={s.btnLightText}>Reveal</Text>
          </Pressable>
        )}

        {revealed && (
          <Pressable style={s.btnDark} onPress={handleNextPlayer}>
            <Text style={s.btnDarkText}>
              {player === 0 ? "Next Player" : "Finish Game"}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#ff3b30" },
  header: {
    height: 44,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  headerX: { color: "white", fontSize: 18, opacity: 0.9 },
  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#111827",
    height: 320,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  playerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },
  revealHint: {
    color: "white",
    opacity: 0.9,
    textAlign: "center",
    marginTop: 40,
    fontWeight: "700",
  },
  revealBox: {
    backgroundColor: "#0f172a",
    marginTop: 20,
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  role: { fontSize: 36, fontWeight: "900" },
  word: { color: "white" },
  spy: { color: "#F43F5E" },
  sub: { color: "#cbd5e1", marginTop: 8, textAlign: "center" },
  footer: {
    paddingHorizontal: 16,
    marginTop: 20,
    alignItems: "center",
  },
  btnLight: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "60%",
  },
  btnLightText: { color: "#111827", fontWeight: "800" },
  btnDark: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "60%",
  },
  btnDarkText: { color: "white", fontWeight: "800" },
  bigText: { color: "white", fontSize: 32, fontWeight: "900" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 20 },
});
