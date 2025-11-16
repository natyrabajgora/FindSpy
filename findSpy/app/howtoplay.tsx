
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  StatusBar,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function HowToPlay() {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>HOW TO PLAY</Text>

        <Text style={styles.text}>
          🎯 <Text style={styles.bold}>Spy Game</Text> është lojë për 3+ lojtarë.
          {"\n\n"}
          🕵️‍♂️ Njëri lojtar është SPIUN – ai nuk e di vendin sekret.{"\n"}
          👥 Të tjerët e dinë vendin dhe përpiqen të zbulojnë kush është SPIU.{"\n\n"}
          ❓ Lojtarët bëjnë pyetje me radhë për ta zbuluar njëri-tjetrin.{"\n"}
          🗳️ Në fund, votohet për të gjetur SPIUN.{"\n"}
          🏆 Nëse grupi e gjen – fitojnë ata. Përndryshe, fiton SPIU!
        </Text>

        <Pressable style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>← BACK TO HOME</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#26423dff",
    marginBottom: 20,
    letterSpacing: 1,
  },
  text: {
    color: "#EDEDED",
    fontSize: 17,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 40,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  btn: {
    backgroundColor: "#26423dff",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 22,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
