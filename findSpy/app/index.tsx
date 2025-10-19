import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

export default function Home() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar />
      <View style={styles.center}>
        <Image source={require("./spy.jpg")} style={styles.illu} />

        <Text style={styles.title}>SPY</Text>
        <Text style={styles.subtitle}>Party Game for 3+ Players</Text>

       <Pressable
  style={[styles.btn, styles.primary]}
  onPress={() => router.push("/setup")} // kjo e hap faqen setup.tsx
>
  <Text style={styles.btnText}>NEW GAME</Text>
</Pressable>

        <Pressable style={styles.btn} onPress={() => {}}> 
          <Text style={styles.btnText}>LOG IN</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => router.push("/howtoplay")} // lidhja me faqen HowToPlay
        >
          <Text style={styles.btnText}>HOW TO PLAY</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#121212" },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  illu: { width: 260, height: 200, resizeMode: "contain", marginBottom: 8 },
  title: {
    fontSize: 56,
    fontWeight: "900",
    letterSpacing: 2,
    color: "#D22",
    marginTop: 6,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 18,
    color: "#EDEDED",
    opacity: 0.9,
    marginBottom: 22,
    textAlign: "center",
  },
  btn: {
    width: "86%",
    paddingVertical: 16,
    borderRadius: 22,
    backgroundColor: "#2B2B2B",
    alignItems: "center",
    marginTop: 12,
  },
  primary: { backgroundColor: "#7A1B1B" },
  btnText: { color: "white", fontWeight: "800", letterSpacing: 1, fontSize: 18 },
});
