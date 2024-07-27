import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import colors from '../../../assets/colors';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <View style ={styles.header}>
            <Image 
                source={require('../../../assets/medAlly-logo/large.png')} 
                style={styles.logo}
            />
            <View style={styles.headertext}>
                <Text style={styles.screenTitle}>General Information</Text>
                <Text style={styles.contentText}>Enter basic details about yourself to get started.</Text>
            </View>
     </View>
     <View style = {styles.form}>
     <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>Any other conditions/injuries we should be aware of?</Text>
        <Controller
          name="conditionsInjuries"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Select.."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>Any drug allergies?</Text>
        <Controller
          name="drugAllergies"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Select.."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Link href="./nutrition-habits" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Link>
     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: colors.defaultwhite,
      justifyContent: 'center',
      alignContent:'center'
  },
  screenTitle: {
      alignSelf: "stretch",
      fontSize: 24,
      letterSpacing: -0.7,
      lineHeight: 24,
      fontWeight: "800",
      fontFamily: "Inter-ExtraBold",
      color: "#121419",
      textAlign: "center"
  },
  contentText: {
      alignSelf: "stretch",
      fontSize: 14,
      letterSpacing: -0.6,
      lineHeight: 16,
      fontFamily: "Inter-Regular",
      color: "#4f4f4f",
      textAlign: "center"
  },
  formHeader: {
      alignSelf: "stretch",
      fontSize: 14,
      letterSpacing: -0.1,
      lineHeight: 20,
      fontWeight: "600",
      fontFamily: "Inter-SemiBold",
      color: "#121419",
      textAlign: "left"
      },
  form: {
      flexDirection: 'column',
      marginTop: '10%',
      marginHorizontal : '5%',
      gap: '1%'
  },
  formItem:{
      full:{
          width: '100%'
      },
      half:{
          width: '49%'
      }
  },
  GenderAndDOB:{
      flexDirection : 'row',
      gap : '2%',
      width: '100%'
  },
  errorText:{
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.errorred,
  },
  input: {

      height: 40,
      borderColor: '#dbdbdb',
      fontSize: 16,
      letterSpacing: -0.2,
      lineHeight: 17,
      fontFamily: "Inter-Regular",
      color: "#7d7d7d",
      textAlign: "left",
      borderWidth: 1,
      borderRadius: 4,
      paddingLeft: 15,
      marginBottom: 10
  },

  button: {
    borderRadius: 6,
    backgroundColor: "#121419",
    borderStyle: "solid",
    borderColor: "#282f41",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20
    },
  buttonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#f7f7f7",
},
  header: {
      alignItems: 'center',
      gap:0
  },
  headertext:{
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
  },
  
  logo: {
      width: 72,
      height: 50,
      resizeMode: 'contain',
      marginBottom: 20,
  },
});