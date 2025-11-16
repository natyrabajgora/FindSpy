import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Link } from "expo-router";

export default function SavedSetupsScreen() {
  const [setups, setSetups] = useState<any[]>([]);

  useEffect(() => {
  const unsub = onSnapshot(collection(db, "setups"), (snapshot) => {
    setSetups(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  });

  return () => unsub();
}, []);

  const deleteSetup = async (id: string) => {
    await deleteDoc(doc(db, "setups", id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", color: "white", marginBottom: 10 }}>
        Saved Setups
      </Text>

      <FlatList
        data={setups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ 
            padding: 15,
            backgroundColor: "#222",
            marginBottom: 12,
            borderRadius: 12
          }}>
            <Text style={{ color: "white" }}>Players: {item.players}</Text>
            <Text style={{ color: "white" }}>Spies: {item.spies}</Text>
            <Text style={{ color: "white" }}>Duration: {item.duration}</Text>

            <TouchableOpacity onPress={() => deleteSetup(item.id)}>
              <Text style={{ color: "red", marginTop: 10 }}>Delete ❌</Text>
            </TouchableOpacity>

            <Link
  href={{
    pathname: "/edit",
    params: { id: item.id }
  }}
>
  <Text style={{ color: "lightblue", marginTop: 10 }}>Edit ✏️</Text>
</Link>

          </View>
        )}
      />
    </View>
  );
}
