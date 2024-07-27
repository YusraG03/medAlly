import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import colors from '../../../assets/colors';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style ={styles.header}>
            <Image 
                source={require('../../../assets/medAlly-logo/large.png')} 
                style={styles.logo}
            />
            <View style={styles.headertext}>
                <Text style={styles.screenTitle}>Physical Habits</Text>
                <Text style={styles.contentText}>Enter basic details about yourself to get started.</Text>
            </View>
     </View>
     <View style = {styles.form}>
     <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>How many times do you exercise per week?</Text>
        <Controller
          name="exerciseFrequency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="None (0 Times per week)" value="None (0 Times per week)" />
              <Picker.Item label="Slightly Active (1-2 Times per week)" value="Slightly Active (1-2 Times per week)" />
              <Picker.Item label="Moderately Active (3-4 Times per week)" value="Moderately Active (3-4 Times per week)" />
              <Picker.Item label="Highly Active (5-6 Times per week)" value="Highly Active (5-6 Times per week)" />
            </Picker>
          )}
        />
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>How often do you consume alcohol?</Text>
        <Controller
          name="alcoholFrequency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="None (0 Times per week)" value="None (0 Times per week)" />
              <Picker.Item label="Sometimes (1-2 Times per week)" value="Sometimes (1-2 Times per week)" />
              <Picker.Item label="Often (3-4 Times per week)" value="Often (3-4 Times per week)" />
              <Picker.Item label="A Lot (>5 Times per week)" value="A Lot (5 Times per week)" />
            </Picker>
          )}
        />
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>How often do you smoke?</Text>
        <Controller
          name="smokeFrequency"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="None (0 Times per week)" value="None (0 Times per week)" />
              <Picker.Item label="Sometimes (1-2 Times per week)" value="Sometimes (1-2 Times per week)" />
              <Picker.Item label="Often (3-4 Times per week)" value="Often (3-4 Times per week)" />
              <Picker.Item label="A Lot (>5 Times per week)" value="A Lot (5 Times per week)" />
            </Picker>
          )}
        />
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>How often do you drink coffee?</Text>
        <Controller
          name="coffeeFrequency"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="None (0 Times per week)" value="None (0 Times per week)" />
              <Picker.Item label="Sometimes (1-2 Times per week)" value="Sometimes (1-2 Times per week)" />
              <Picker.Item label="Often (3-4 Times per week)" value="Often (3-4 Times per week)" />
              <Picker.Item label="A Lot (>5 Times per week)" value="A Lot (5 Times per week)" />
            </Picker>
          )}
        />
        {errors.coffeeFrequency && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>Do you do any other substances?</Text>
        <Controller
          name="otherSubstances"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Type.."
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>Do you have problem sleeping?</Text>
        <Controller
          name="sleepProblems"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          )}
        />
        {errors.sleepProblems && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <View style={styles.formItem.full}>
        <Text style ={styles.formHeader}>Are you currently/post partum pregnant?</Text>
        <Controller
          name="pregnancyStatus"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              style={styles.input}
            >
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          )}
        />
        {errors.pregnancyStatus && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      <Link href="./medical-history-one" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Link>
    </View>
      </ScrollView>
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