import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditScreen() {
  const { id } = useLocalSearchParams();
  const docId = String(id);

  const [players, setPlayers] = useState("");

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "setups", docId));
      const data = snap.data();

      if (!data) return;
      setPlayers(String(data.players));
    };
    load();
  }, []);

  const save = async () => {
    await updateDoc(doc(db, "setups", docId), {
      players: Number(players),
    });
    alert("Updated!");
  };

  return (
    <View style={s.safe}>
      <View style={s.container}>

        <Text style={s.title}>Edit Setup</Text>

        <View style={s.card}>
          <Text style={s.label}>Players</Text>

          <TextInput
            value={players}
            onChangeText={setPlayers}
            keyboardType="numeric"
            style={s.input}
          />
        </View>

        <TouchableOpacity style={s.btnPrimary} onPress={save}>
          <Text style={s.btnPrimaryText}>Save ✔</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.btnSecondary} onPress={() => router.back()}>
          <Text style={s.btnSecondaryText}>⬅ Back</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const s = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d0d0f",
  },

  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 20,
  },

  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#262a33",
    backgroundColor: "#181a1f",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  label: {
    color: "#e7e9ee",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    fontWeight: "600",
  },

  btnPrimary: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: "#26423dff",
    alignItems: "center",
    shadowColor: "#0a826cff",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },

  btnSecondary: {
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#2e323b",
    alignItems: "center",
  },

  btnSecondaryText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
});
