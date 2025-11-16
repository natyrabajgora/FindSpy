import { View, Text, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { router } from "expo-router";

const CATEGORIES = [
  { key: "places", label: "Places" },
  { key: "food", label: "Food" },
  { key: "sports", label: "Sports" },
];

export default function CategoriesScreen() {
  const chooseCategory = (cat: string) => {
    router.push({
      pathname: "/setup",
      params: { category: cat },
    });
  };

  return (
    <SafeAreaView style={s.safe}>
      <View style={s.container}>
        <Text style={s.title}>Choose Category</Text>

        {CATEGORIES.map((c) => (
          <Pressable
            key={c.key}
            style={s.card}
            onPress={() => chooseCategory(c.key)}
          >
            <Text style={s.cardText}>{c.label}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0d0d0f" },
  container: { flex: 1, padding: 24, justifyContent: "center", gap: 16 },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#181a1f",
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#262a33",
  },
  cardText: { color: "white", fontSize: 18, fontWeight: "700" },
});
