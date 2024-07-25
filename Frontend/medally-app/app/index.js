import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';



export default function App() {
  return (
    <View style={styles.container}>
      <View style = {styles.header}>
      <Text style = {styles.h1}>Medally Testing HQ</Text>
      <Text style = {styles.posttitle} >Select your path.</Text>
      </View>
      <Link style = {styles.button} href="./initialtesting">About</Link>
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
  h1: {
    fontSize : 30,
  },
  posttitle: {
    fontSize : 22,
    color: '#4F4F4F',
  },
  button:{
    color: '#F7F7F7',
    backgroundColor : '#121419',
    paddingHorizontal:20,
    paddingVertical:10,
    fontSize : 18,
  },
  header:{
    flexDirection:'column',
    padding:50,
    alignItems: 'center',
  }
});
