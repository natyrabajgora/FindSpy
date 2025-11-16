import { router, useLocalSearchParams } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
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
    <View style={{ padding: 20 }}>
      <Text style={{ color: "white", fontSize: 20, marginBottom: 10 }}>
        Edit players
      </Text>

      <TextInput
        value={players}
        onChangeText={setPlayers}
        style={{
          backgroundColor: "white",
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={save}
        style={{
          backgroundColor: "green",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Save ✔</Text>
      </TouchableOpacity>

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          backgroundColor: "#444",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}
