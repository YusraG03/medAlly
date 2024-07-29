import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Disease History</Text>
      <Text style={styles.placeholder}>No history available yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: '800',
    fontFamily: 'screenTitle', // Ensure you have the appropriate font family
    color: 'defaultBlack',
    textAlign: 'left',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HistoryScreen;
