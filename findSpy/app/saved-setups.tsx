import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Link, router } from "expo-router";

export const screenOptions = {
  headerShown: true,
  title: "Saved Setups",
  headerStyle: { backgroundColor: "#0d0d0f" },
  headerTintColor: "white",
};

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0d0d0f" }}>
      <View style={{ flex: 1, padding: 20 }}>
        <FlatList
          data={setups}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 15,
                backgroundColor: "#222",
                marginBottom: 12,
                borderRadius: 12,
              }}
            >
              <Text style={{ color: "white" }}>Players: {item.players}</Text>
              <Text style={{ color: "white" }}>Spies: {item.spies}</Text>
              <Text style={{ color: "white" }}>Duration: {item.duration}</Text>

              <Link
                href={{
                  pathname: "/setup",
                  params: {
                    players: String(item.players),
                    spies: String(item.spies),
                    duration: String(item.duration),
                  },
                }}
                asChild
              >
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    backgroundColor: "#0a826c",
                    paddingVertical: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontWeight: "700",
                    }}
                  >
                    Use this setup ▶️
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity onPress={() => deleteSetup(item.id)}>
                <Text style={{ color: "red", marginTop: 10 }}>Delete ❌</Text>
              </TouchableOpacity>

              <Link
                href={{
                  pathname: "/edit",
                  params: { id: item.id },
                }}
              >
                <Text style={{ color: "lightblue", marginTop: 10 }}>
                  Edit ✏️
                </Text>
              </Link>
              
            </View>
          )}
        />
        <Link href="/setup" asChild>
  <TouchableOpacity
    style={{
      marginTop: 20,
      paddingVertical: 14,
      backgroundColor: "#26423dff",
      borderRadius: 14,
      alignItems: "center",
    }}
  >
    <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
      ⬅ Back to Setup
    </Text>
  </TouchableOpacity>
</Link>
      </View>
    </SafeAreaView>
  );
}
