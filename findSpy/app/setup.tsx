// SetupScreen.js
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SetupScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Setup</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Number of Players</Text>
          <View style={styles.row}>
            <Text style={styles.step}>-</Text>
            <Text style={styles.value}>4</Text>
            <Text style={styles.step}>+</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startText}>Start Game ▶</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 16, gap: 5 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 8 },

  card: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
  },
  label: { fontSize: 14, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  step: { fontSize: 18, paddingHorizontal: 12, paddingVertical: 4 }, // “-” dhe “+” placeholder
  value: { fontSize: 16 },

  startBtn: {
    marginTop: 8,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
  },
  startText: { fontSize: 16, fontWeight: '600' },
});
