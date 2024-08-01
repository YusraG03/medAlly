import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import textStyles from '../_assets/textStyles';
import colors from '../_assets/colors';

export default function App() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={textStyles.screenTitle}>Playground</Text>
      </View>
      <Link style={styles.button} href="./forms">Forms</Link>
      <Link style={styles.button} href="./camera">Camera</Link>
      <Link style={styles.button} href="./testdatepicker">DatePicker</Link>
      <Link style={styles.button} href="./password&nextbutton/pw">Password Validator</Link>
      <Link style={styles.button} href="../account/sign-up/credentials">Sign Up</Link>
      <Link style={styles.button} href="../symptomChecker/sympchecker">Symptom Checker</Link>
      <Link style={styles.button} href="../medication/medication">Medications Page</Link>
      <Link style={styles.button} href="../NavigationBar/Home">Nav Bar</Link>
      <Link style={styles.button} href="../nutrition/nutritionOverview">Nutrition</Link>
      <Link style={styles.button} href="../Homepage/homepage">Homepage</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    gap: 16 // Use a valid unit like pixels
  },
  
  button: {
    color: colors.defaultwhite,
    backgroundColor: colors.defaultblack,
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
    gap: 6 // Use a valid unit like pixels
  },
});
