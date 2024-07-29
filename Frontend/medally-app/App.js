import { StyleSheet, View } from 'react-native';
import Chatbot from './sympcheck2yus'


export default function App() {
  return (
    <View style={styles.container}>
      <Chatbot />
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
  text:{
    fontSize : 20,
  }
});
