import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API'
import { storeUserId, getUserId, removeUserId } from '../userStorage';


const API = new APIEndpoint()

export default function GeneralInformation() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [gender, height, weight, date]);

  const validateForm = () => {
    let valid = true;

    if (!gender || !height || !weight || !date) {
      valid = false;
    }

    // Add more specific validations if needed
    if (height && (isNaN(height) || height <= 0)) {
      valid = false;
    }

    if (weight && (isNaN(weight) || weight <= 0)) {
      valid = false;
    }

    setIsValid(valid);
  };

  const dateUpdate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setValue('DateOfBirth', currentDate.toLocaleDateString('en-GB'));
  };

  const onSubmit = async () => {
    if (isValid) {
      const userMedicalHistory = {
        gender: gender,
        height: height,
        weight: weight,
        dateOfBirth: date.toISOString()
      };

      const userId = getUserId(); // Example, replace with actual user ID retrieval
      const response = await API.addUserBasicInfo(userMedicalHistory, userId);
      router.push('./physical-habits');
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      
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
          <View style={styles.formItemHalf}>
            <Text style={styles.formHeader}>Gender:</Text>
            <Controller
              name="Gender"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => {
                    setGender(itemValue);
                    onChange(itemValue);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                  <Picker.Item label="Other" value="other" />
                </Picker>
              )}
            />
            {errors.Gender && <Text style={styles.errorText}>Gender is required.</Text>}
          </View>
          <View style={styles.formItemHalf}>
            <Text style={styles.formHeader}>Date of Birth:</Text>
            <Controller
              name="DateOfBirth"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <>
                  <TouchableOpacity onPress={showDatepicker} style={styles.datePicker}>
                    <TextInput
                      style={styles.datePickerInput}
                      value={value}
                      editable={false}
                      placeholder="Select Date"
                    />
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      display="default"
                      onChange={dateUpdate}
                    />
                  )}
                </>
              )}
            />
            {errors.DateOfBirth && <Text style={styles.errorText}>Date of Birth is required.</Text>}
          </View>
        </View>
        <View style={styles.HeightAndWeight}>
          <View style={styles.formItemHalf}>
            <Text style={styles.formHeader}>Height (in cm):</Text>
            <Controller
              name="Height"
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    setHeight(text);
                    onChange(text);
                  }}
                  value={value}
                  keyboardType="numeric"
                  placeholder="Height"
                />
              )}
            />
            {errors.Height && <Text style={styles.errorText}>Height is required and should be a number.</Text>}
          </View>
          <View style={styles.formItemHalf}>
            <Text style={styles.formHeader}>Weight (in kg):</Text>
            <Controller
              name="Weight"
              control={control}
              rules={{ required: true, pattern: /^\d+$/ }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    setWeight(text);
                    onChange(text);
                  }}
                  value={value}
                  keyboardType="numeric"
                  placeholder="Weight"
                />
              )}
            />
            {errors.Weight && <Text style={styles.errorText}>Weight is required and should be a number.</Text>}
          </View>
        </View>
      </View>
      <TouchableOpacity 
        onPress={handleSubmit(onSubmit)} 
        style={[styles.button, !isValid && styles.disabledButton]}
        disabled={!isValid}
      >
        <Text style={[styles.buttonText, !isValid && styles.disabledButtonText]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightpink,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
  },
  headertext: {
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.darkbrown,
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    color: colors.brown,
    textAlign: 'center',
  },
  form: {
    marginBottom: 30,
  },
  GenderAndDOB: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HeightAndWeight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formItemHalf: {
    flex: 0.45,
    marginBottom: 20,
  },
  formHeader: {
    fontSize: 16,
    color: colors.darkbrown,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: colors.darkbrown,
  },
  picker: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: colors.darkbrown,
  },
  datePicker: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
  },
  datePickerInput: {
    fontSize: 16,
    color: colors.darkbrown,
  },
  disabledButton: {
    backgroundColor: "#cecece",
    borderColor: "#cecece",
  },
  disabledButtonText: {
    color: "#7d7d7d",
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: colors.darkbrown,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold',
  },
});
