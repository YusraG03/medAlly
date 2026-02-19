import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import './app/firebase'; // Initialize Firebase
import { testFirebaseConnection } from './app/testFirebase';

// run a quick Firebase init test on startup (no-op if test file missing)
try { testFirebaseConnection(); } catch (e) { /* ignore */ }

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>MedAlly — development build</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});
