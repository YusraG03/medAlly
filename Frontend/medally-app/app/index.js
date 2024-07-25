import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import textStyles from '../assets/textStyles';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Thin': require('../fonts/Inter-Thin.ttf'),
        'Inter-ExtraLight': require('../fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('../fonts/Inter-Light.ttf'),
        'Inter-Regular': require('../fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('../fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('../fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('../fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('../fonts/Inter-ExtraBold.ttf'),
        'Inter-Black': require('../fonts/Inter-Black.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <View><Text>Loading fonts...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.screenTitle}>Medally Testing HQ</Text>
        <Text style={textStyles.contentText}>Select your path!</Text>
      </View>
      <Link style={styles.button} href="./initialtesting"><Text>Enter the Playground</Text></Link>
      <StatusBar style="auto" />
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
  button: {
    color: '#F7F7F7',
    backgroundColor: '#121419',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
  header: {
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
    gap: 6,    
  }
});