import { useLocalSearchParams, Link } from "expo-router";
import { SafeAreaView, View, Text, Pressable, StyleSheet, FlatList } from "react-native";

export default function RevealScreen() {
  const params = useLocalSearchParams<{ players?: string; spies?: string }>();
  const players = Number(params.players) || 4;
  const spies = params.spies ? new Set(JSON.parse(params.spies)) : new Set();

  const data = Array.from({ length: players }, (_, i) => ({
    id: i,
    role: spies.has(i) ? "Spy" : "Not Spy",
  }));

  return (
    <SafeAreaView style={s.root}>
      <View style={s.center}>
        <Text style={s.title}>Players & Roles</Text>

        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={[s.spyName, item.role !== "Spy" && { color: "white" }]}>
                Player {item.id + 1}: {item.role}
              </Text>
            </View>
          )}
        />

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
