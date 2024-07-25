import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import textStyles from '../../assets/textStyles';
import colors from '../../assets/colors';

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.screenTitle}>Playground</Text>
      </View>
      <Link style={styles.button} href="./forms">Forms</Link>
      <Link style={styles.button} href="./testdatepicker">DatePicker</Link>
      <Link style={styles.button} href="../password&nextbutton/pw">Password Validator</Link>
      <Link style={styles.button} href="../account/sign-up/credentials">Sign Up</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    gap: '10%'
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
    marginHorizontal: '5%'
  },
  header: {
    flexDirection: 'column',
    padding: 30,
    alignItems: 'center',
    gap: 6,    
  },
  logo: {
    width: 100, // Adjust as needed
    height: 100, // Adjust as needed
    resizeMode: 'contain', // This will maintain the aspect ratio
  },
});