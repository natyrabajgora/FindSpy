
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from "@react-native-community/slider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";



export default function SetupScreen() {

  const min_players =3;
  const max_players = 8;

    const [players, setPlayers] = useState(min_players);
    const [spy, setSpy] = useState(1);

    const getMaxSpy = (players: number) => {
    if (players <= 4) return 1;   
    if (players <= 6) return 2;  
    return 3;                     
  };

    const increasePlayers = () => {
    if (players < max_players) {
      const next = players + 1;
      setPlayers(next);

      const allowedMax = getMaxSpy(next);
      if (spy > allowedMax) setSpy(allowedMax);
    }
  };

  const decreasePlayers = () => {
    if (players > min_players) {
      const next = players - 1;

      setPlayers(next);

      const allowedMax = getMaxSpy(next);
      if (spy > allowedMax) setSpy(allowedMax);
    }
  };

   const increaseSpy = () => {
    const allowedMax = getMaxSpy(players);
    if (spy < allowedMax) setSpy(spy + 1);
  };

    const decreaseSpy = () => {
        if(spy > 1) setSpy(spy - 1);
    }

    const [duration, setDuration] = useState(5); 

    const saveSetup = async () => {
    try {
      await addDoc(collection(db, "setups"), {
        players,
        spies: spy,
        duration,
        category: "default",
        createdAt: Date.now(),
      });
      alert("Setup u ruajt me sukses!");
    } catch (err) {
      console.log(err);
      alert("Gabim gjatë ruajtjes!");
    }
  };


  return ( 
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>  
        <Text style={styles.title}>Game Setup</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Number of Players</Text>
          <View style={styles.row}>
            <TouchableOpacity onPress={decreasePlayers}>
              <Text style={styles.stepSimbol}>-</Text>
            </TouchableOpacity>

            <Text style={styles.value}>{players}</Text>

            <TouchableOpacity onPress={increasePlayers}>
              <Text style={styles.stepSimbol}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
            <Text style={styles.label}>Number of Spys</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={decreaseSpy}>
                    <Text style={styles.stepSimbol}>-</Text>
                </TouchableOpacity>
                <Text style={styles.step}>{spy}</Text>

                <TouchableOpacity onPress={increaseSpy}>
                    <Text style={styles.stepSimbol}>+</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.cardDuration}>
  <View style={styles.durationHeader}>
    <Text style={styles.label}>Duration</Text>
    <Text style={styles.durationValue}>{duration} min</Text>
  </View>

  <Slider
    style={{ width: '100%' }}
    minimumValue={1}
    maximumValue={10}
    step={1}
    value={duration}
    minimumTrackTintColor="#0a826cff"
    maximumTrackTintColor="#555"
    thumbTintColor="#0a826cff"
    onValueChange={(value) => setDuration(value)}
  />
</View>

         <View style={styles.card}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.row}>
                <Text style={styles.step}>choose</Text>
            </View>
        </View>

        <Link
          href={{
            pathname: '/cards',
            params: { players: String(players), spies: String(spy) },
          }}
          asChild
        >
          <TouchableOpacity style={styles.startBtn}>
            <Text style={styles.startText}>Start Game ▶</Text>
          </TouchableOpacity>
        </Link>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0d0d0f' },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 8,
  },

  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#262a33',
    backgroundColor: '#181a1f',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  label: { fontSize: 14, color: '#e7e9ee', fontWeight: '600' },

  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },

  roundBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#2e323b',
    backgroundColor: '#1f2229',
    alignItems: 'center',
    justifyContent: 'center',
  },

  step: { fontSize: 16, color: '#e7e9ee', fontWeight: '700' },
  stepSimbol: { fontSize: 32, color: '#26423dff', fontWeight: '900' },

  value: { fontSize: 16, color: '#ffffff', fontWeight: '700', minWidth: 28, textAlign: 'center' },
  valueDim: { fontSize: 15, color: '#b6bcc6', fontWeight: '600' },

  startBtn: {
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: '#26423dff',
    alignItems: 'center',

    shadowColor: '#0a826cff',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  cardDuration: {
  padding: 14,
  borderWidth: 1,
  borderColor: '#262a33',
  backgroundColor: '#181a1f',
  borderRadius: 16,
},

durationHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},

durationValue: {
  fontSize: 16,
  fontWeight: '700',
  color: '#e7e9ee',
},

  startText: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
});

