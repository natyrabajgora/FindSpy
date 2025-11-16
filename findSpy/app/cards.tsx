import React, { useMemo, useState, useEffect } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, router, Link } from "expo-router";

const CATEGORY_WORDS: Record<string, string[]> = {
  places: ["Bar", "Beach", "Cinema", "School", "Hospital", "Stadium", "Airport", "Cafe", "Library", "Museum"],
  food: ["Pizza", "Burger", "Tacos", "Pasta", "Soup", "Ice Cream"],
  sports: ["Football", "Basketball", "Tennis", "Running", "Boxing", "Swimming"],
};

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function CardsScreen() {
  const params = useLocalSearchParams<{
    players?: string;
    spies?: string;
    duration?: string;
    category?: string;
  }>();

  const players = Math.max(3, Math.min(8, Number(params.players) || 4));
  const spiesParam = Number(params.spies);
  const spies =
    !isNaN(spiesParam) && spiesParam >= 1 && spiesParam < players
      ? spiesParam
      : 1;

  const duration = Number(params.duration) || 5;
  const category = params.category || "places";

  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const word = useMemo(() => {
  return pickRandom(CATEGORY_WORDS[category] || CATEGORY_WORDS["places"]);
}, [category]);

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

  // ===== TIMER EFFECT =====
  useEffect(() => {
    if (!timerStarted) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted]);

  // ===== SCREEN WHEN FINISHED =====
  if (finished) {
    if (!timerStarted) {
      setTimerStarted(true);
      setTimeLeft(duration * 60);
    }

    return (
      <SafeAreaView style={s.root}>
        <View style={s.center}>
          <Text style={s.bigText}>{formatTime(timeLeft)}</Text>

          <View style={{ height: 20 }} />

          <Link
            href={{
              pathname: "/reveal",
              params: {
                players: String(players),
                spies: JSON.stringify(Array.from(spySet)),
              },
            }}
            asChild
          >
            <Pressable style={s.btnDark}>
              <Text style={s.btnDarkText}>Reveal Spy</Text>
            </Pressable>
          </Link>
        </View>
      </SafeAreaView>
    );
  }

  // ===== MAIN GAME SCREEN =====
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
              {current + 1 < players ? "Next Player" : "Finish"}
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
