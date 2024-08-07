import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API';
import { storeUserId, getUserId, removeUserId } from '../userStorage';

const API = new APIEndpoint();

export default function MedicalHistoryOne() {
  const router = useRouter();

  const [bloodPressure, setBloodPressure] = useState('');
  const [cardiovascular, setCardiovascular] = useState('');
  const [cholesterol, setCholesterol] = useState('');
  const [diabetes, setDiabetes] = useState('');
  const [injuries, setInjuries] = useState('');
  const [surgeries, setSurgeries] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [bloodPressure, cardiovascular, cholesterol, diabetes, injuries, surgeries]);

  const validateForm = () => {
    const isBloodPressureValid = bloodPressure !== '';
    const isCardiovascularValid = cardiovascular !== '';
    const isCholesterolValid = cholesterol !== '';
    const isDiabetesValid = diabetes !== '';
    // Injuries and surgeries are optional, so we don't validate them

    setIsValid(isBloodPressureValid && isCardiovascularValid && isCholesterolValid && isDiabetesValid);
  };

  const onSubmit = async () => {
    if (isValid) {
      //console.log({ bloodPressure, cardiovascular, cholesterol, diabetes, injuries, surgeries });
        const userMedicalHistory = {
          bloodPressure: bloodPressure,
          cardiovascular : cardiovascular,
          cholesterol: cholesterol,
          diabetes: diabetes,
          injuries: injuries,
          surgeries: surgeries,
        };
        const userId = await getUserId(); 
        const response = await API.addUserMedicalHistory(userMedicalHistory, userId);
        console.log(response);
        router.push('./medical-history-two');
      }
    };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../_assets/logo.png')} 
          style={styles.logo}
        />
        <View style={styles.headertext}>
          <Text style={styles.screenTitle}>Medical History (1/2)</Text>
          <Text style={styles.contentText}>Tell us more about your general activity & consumption.</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Do you have any blood pressure problems?</Text>
          <Picker
            selectedValue={bloodPressure}
            onValueChange={(itemValue) => setBloodPressure(itemValue)}
            style={styles.input.dropdown}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Hypertension" value="Hypertension" />
            <Picker.Item label="Hypotension" value="Hypotension" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Do you have any cardiovascular problems?</Text>
          <Picker
            selectedValue={cardiovascular}
            onValueChange={(itemValue) => setCardiovascular(itemValue)}
            style={styles.input.dropdown}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="None" value="None" />
            <Picker.Item label="Abnormal heart rhythms, or arrhythmias" value="Abnormal heart rhythms, or arrhythmias" />
            <Picker.Item label="Aorta disease and Marfan syndrome" value="Aorta disease and Marfan syndrome" />
            {/* Add other cardiovascular options here */}
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Do you have any cholesterol problems?</Text>
          <Picker
            selectedValue={cholesterol}
            onValueChange={(itemValue) => setCholesterol(itemValue)}
            style={styles.input.dropdown}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Do you have any diabetes problems?</Text>
          <Picker
            selectedValue={diabetes}
            onValueChange={(itemValue) => setDiabetes(itemValue)}
            style={styles.input.dropdown}
          >
            <Picker.Item label="Select" value="" />
            <Picker.Item label="Yes" value="Yes" />
            <Picker.Item label="No" value="No" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Do you have any injuries/orthopedic problems?</Text>
          <TextInput
            style={styles.input}
            placeholder="Type.."
            onChangeText={setInjuries}
            value={injuries}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Any past history of surgeries?</Text>
          <TextInput
            style={styles.input}
            placeholder="Type.."
            onChangeText={setSurgeries}
            value={surgeries}
          />
        </View>

        <Pressable 
          style={[styles.button, !isValid && styles.disabledButton]} 
          onPress={onSubmit}
          disabled={!isValid}
        >
          <Text style={isValid ? styles.buttonText : styles.disabledButtonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: colors.defaultwhite,
    justifyContent: 'center',
    alignContent: 'center',
  },
  screenTitle: {
    alignSelf: "stretch",
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    textAlign: "center",
  },
  contentText: {
    alignSelf: "stretch",
    fontSize: 14,
    letterSpacing: -0.6,
    lineHeight: 16,
    fontFamily: "Inter-Regular",
    color: "#4f4f4f",
    textAlign: "center",
  },
  formHeader: {
    alignSelf: "stretch",
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#121419",
    textAlign: "left",
  },
  form: {
    flexDirection: 'column',
    marginTop: '10%',
    marginHorizontal: '5%',
  },
  formItem: {
    full:{
  width: '100%'
    }

  },
  errorText: {
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.errorred,
  },
  disabledButton: {
    backgroundColor: "#cecece",
    borderColor: "#cecece",
  },
  disabledButtonText: {
    color: "#7d7d7d",
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
    marginBottom: 10,
    dropdown:{
      height: 'auto'
    }
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
    paddingVertical: 20,
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
  },
  headertext: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});