import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform, ScrollView, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import colors from '../../_assets/colors';

export default function GeneralInformation() {
  const router = useRouter();

  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    validateForm();
  }, [gender, dateOfBirth, weight, height]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDateOfBirth(currentDate.toLocaleDateString('en-GB'));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const validateForm = () => {
    const isGenderValid = gender !== '';
    const isDateOfBirthValid = dateOfBirth !== '';
    const isWeightValid = weight !== '' && !isNaN(weight);
    const isHeightValid = height !== '' && !isNaN(height);

    setIsValid(isGenderValid && isDateOfBirthValid && isWeightValid && isHeightValid);
  };

  const onSubmit = () => {
    if (isValid) {
      console.log({ gender, dateOfBirth, weight, height });
      router.push('./physical-habits');
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
          <Text style={styles.screenTitle}>General Information</Text>
          <Text style={styles.contentText}>Enter basic details about yourself to get started.</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.GenderAndDOB}>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Gender:</Text>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.input}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Date of Birth:</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                value={dateOfBirth}
                editable={false}
              />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
        </View>
        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Weight(kg):</Text>
          <TextInput
            style={styles.input}
            placeholder="000"
            onChangeText={setWeight}
            value={weight}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Height(cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="000"
            onChangeText={setHeight}
            value={height}
            keyboardType="numeric"
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
  // ... (keep the existing styles)
  
  // Add these new styles
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
  disabledButton: {
    borderRadius: 6,
    borderWidth: 0,
    backgroundColor: "#cecece",
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
    color: colors.defaultwhite
  },
  disabledButtonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultblack
  },
});