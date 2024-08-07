import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import textStyles from './_assets/textStyles';
import colors from './_assets/colors';
import APIEndpoint from './API';



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter-Thin': require('./_assets/fonts/Inter-Thin.ttf'),
        'Inter-ExtraLight': require('./_assets/fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('./_assets/fonts/Inter-Light.ttf'),
        'Inter-Regular': require('./_assets/fonts/Inter-Regular.ttf'),
        'Inter-Medium': require('./_assets/fonts/Inter-Medium.ttf'),
        'Inter-SemiBold': require('./_assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Bold': require('./_assets/fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('./_assets/fonts/Inter-ExtraBold.ttf'),
        'Inter-Black': require('./_assets/fonts/Inter-Black.ttf'),
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
      <View style = {styles.main}>
      <Image 
      source={require('./_assets/logo.png')} style={styles.logo}/>
      <View style={styles.header}>
        <Text style={textStyles.screenTitle}>Medally</Text>
        <Text style={textStyles.contentText}>A health app by GMC</Text>
      </View>
      <Link style={styles.button} href="./account/sign-up">Sign Up</Link>
      <Link style={styles.button} href="./account/login/">Log In</Link>
      </View>
      <Image 
      source={require('./_assets/main_page_splash.png')} style={styles.splash} resizeMode="contain"/>
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
    color: colors.defaultwhite,
    backgroundColor: colors.defaultblack,
    font: textStyles.containerActionText,
    borderColor: '#282f41',
    borderRadius: 6,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    marginTop: '5%'
  },
  main:{
    bottom: -200,
    alignItems : 'center',
    zIndex : 1
  },
  header: {
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
    gap: 6,    
  },
  splash:{
    width : '100%'
  },
  logo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    resizeMode: 'contain', // This will maintain the aspect ratio
  },
});