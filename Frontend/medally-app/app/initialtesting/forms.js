import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Link } from 'expo-router';
import textStyles from '../../assets/textStyles';
import form from '../../assets/form';

export default function Page() {
  return (
    <View style={styles.renderer}>
      <View style={styles.global.full}>
    <Text style={styles.title}>First Name</Text>
    <TextInput
        style={styles.formWrapper}
        placeholder="e.g Jean"
        keyboardType="alphabetic"
      />
    </View>
    <View style={styles.global.full}>
    <Text style={styles.title}>First Name</Text>
    <TextInput
        style={styles.formWrapper}
        placeholder="e.g Jean"
        keyboardType="alphabetic"
      />
    </View>
    </View>)
    ;
}

const styles = StyleSheet.create({
  renderer:{
    marginTop : '10%',
    flexDirection : 'column',
    gap: '25%',
    justifyContent: 'center'
  },

  title: {
  fontSize: 14,
  letterSpacing: -0.1,
  lineHeight: 15,
  fontWeight: "600",
  fontFamily: "Inter-SemiBold",
  color: "#121419",
  textAlign: "left",
  alignSelf: "stretch"
  },

  formWrapper: {
  font : textStyles.contentText,
  paddingLeft: 15,
  borderRadius: 4,
  borderStyle: "solid",
  borderColor: "#dbdbdb",
  borderWidth: 1,
  height: 40, 
  marginTop: 6,
  alignSelf: "stretch"

  },
  global: {
    full:{
      marginHorizontal: '5%'
    },
    half:{
      width: '45%'
    },
  }
  });
  