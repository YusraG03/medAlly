import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import textStyles from '../../assets/textStyles';

export default function Page() {
  return <View style={styles.container}>
    <Text style={textStyles.contentText}>You have reached the testing level!</Text>
    </View>
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  }
});