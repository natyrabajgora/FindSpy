// SetupScreen.js
import { Link } from 'expo-router';
import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SetupScreen() {
  return ( /*gjdo sen qe bohet mrena return ka me u shfaq ne screen ne form tu UI*/
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>  {/* si container munen me e mar si div */}
        <Text style={styles.title}>Game Setup</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Number of Players</Text>
          <View style={styles.row}>
            <Text style={styles.step}>-</Text>
            <Text style={styles.value}>4</Text>
            <Text style={styles.step}>+</Text>
          </View>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Number of Spys</Text>
            <View style={styles.row}>
                <Text style={styles.step}>-</Text>
                <Text style={styles.step}>2</Text>
                <Text style={styles.step}>+</Text>
            </View>
        </View>

         <View style={styles.card}>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.row}>
                <Text style={styles.step}>-</Text>
                <Text style={styles.step}>5</Text>
                <Text style={styles.step}>+</Text>
            </View>
        </View>

         <View style={styles.card}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.row}>
                <Text style={styles.step}>chose</Text>
            </View>
        </View>

        <Link href="/cards" style={styles.startBtn}>
  <Text style={styles.startText}>Start Game ▶</Text>
</Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {  flexDirection: 'column', justifyContent: 'center',flex: 1, padding: 30, gap: 20 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 8 },

  card: {
    padding: 14,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: { fontSize: 14,},
  
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
                
  step: { fontSize: 18, paddingHorizontal: 4, paddingVertical: 12 }, // “-” dhe “+” placeholder
  
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
