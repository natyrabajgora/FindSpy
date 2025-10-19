import React, { useMemo, useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Link } from 'expo-router';

const WORDS = [
  "Bar", "Beach", "Cinema", "School", "Hospital",
  "Stadium", "Airport", "Cafe", "Library", "Museum"
] as const;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}


export default function CardsScreen() {
  const params = useLocalSearchParams<{ players?: string; spies?: string }>();
  const players = Math.max(3, Math.min(8, Number(params.players) || 4));
  const spies = Math.max(1, Math.min(3, Math.min(players - 1, Number(params.spies) || 1)));

  const [current, setCurrent] = useState(0);          // indeksi i lojtarit qe sheh card
  const [revealed, setRevealed] = useState(false);    // card per current player 
  const [finished, setFinished] = useState(false);    // a e kan shiku te gjith card 

  const word = useMemo(() => pickRandom(WORDS), []);

  // random choosing per spies 
  const spySet = useMemo(() => {
    const indices = new Set<number>();
    while (indices.size < spies) {
      indices.add(Math.floor(Math.random() * players));
    }
    return indices;
  }, [players, spies]);

  const isSpy = spySet.has(current);

  const handleReveal = () => {
    if (!revealed) setRevealed(true);
  };

  const handleNext = () => {
    if (!revealed) return;
    if (current + 1 < players) {
      setCurrent(current + 1);
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    router.back(); // kthehu te setup per rekonfigurim 
  };

  if (finished) {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Text style={s.bigText}>TIMER</Text>
          <View style={{ height: 20 }} />
          <Link href="/setup" asChild>
  <Pressable style={s.btnDark}>
    <Text style={s.btnDarkText}>Start New Game</Text>
  </Pressable>
</Link>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.root}>
      <View style={s.centerContent}>
        <Pressable style={s.card} onPress={handleReveal}>
          <Text style={s.playerTitle}>Player {current + 1}</Text>

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

        {!revealed ? (
          <Pressable style={s.btnLight} onPress={handleReveal}>
            <Text style={s.btnLightText}>Reveal</Text>
          </Pressable>
        ) : (
          <Pressable style={s.btnDark} onPress={handleNext}>
            <Text style={s.btnDarkText}>
              {current + 1 < players ? 'Next Player' : 'Finish'}
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#26423dff" },

  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Ekrani i gameOver
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "85%",
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
  spy: { color: "#ff0000ff" },
  sub: { color: "#cbd5e1", marginTop: 8, textAlign: "center" },

  // Butonat
  btnLight: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "60%",
    marginTop: 24, 
  },

  btnLightText: { color: "#111827", fontWeight: "800" },
  btnDark: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    width: "60%",
    marginTop: 24,
  },
  btnDarkText: { color: "white", fontWeight: "800" },

  bigText: { color: "white", fontSize: 32, fontWeight: "900" },
});
