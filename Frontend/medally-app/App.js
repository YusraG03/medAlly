{/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import * as React from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SymptomScreen from './symptomChecker'; 
import MedicationScreen from './app/medication/medication';
import Addmedication from './app/medication/Addmedication';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!helloooo</Text>
      <Text>Welcome to MedAlly!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MedicationScreen">
        <Stack.Screen name="MedicationScreen" component={MedicationScreen} />
        <Stack.Screen name="Addmedication" component={Addmedication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  text:{
    fontSize : 20,
  }
});
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ title: 'Symptom Checker' }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Disease History' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
*/}