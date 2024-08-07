import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API';
import { storeUserId, getUserId, removeUserId } from '../userStorage';
import { router } from 'expo-router';

const API = new APIEndpoint();

export default function NutritionHabits() {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isValid, setIsValid] = useState(false);
  
  // Initial setting of values
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [foodAvoidance, setFoodAvoidance] = useState('');

  useEffect(() => {
    validateForm();
  }, [dietaryPreference, foodAllergies, foodAvoidance]);

  const validateForm = () => {
    let valid = true;

    if (!dietaryPreference || !foodAllergies || !foodAvoidance) {
      valid = false;
    }

    setIsValid(valid);
  };

  const onSubmit = async data => {
    if (isValid) {
      const userMedicalHistory = {
        dietaryPreference: data.dietaryPreference,
        foodAllergies: data.foodAllergies,
        foodAvoidance: data.foodAvoidance
      };
      const userId = await getUserId(); 
      const response = await API.addUserNutrition(userMedicalHistory, userId);
      router.push('./success');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../_assets/logo.png')} 
          style={styles.logo}
        />
        <View style={styles.headertext}>
          <Text style={styles.screenTitle}>Nutrition Habits</Text>
          <Text style={styles.contentText}>Tell us more about your general activity & consumption.</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Are you Non Veg, Veg or Vegan? (3 Choices)</Text>
          <Controller
            name="dietaryPreference"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Picker
                selectedValue={value}
                onValueChange={(itemValue) => {
                  setDietaryPreference(itemValue);
                  onChange(itemValue);
                }}
                style={styles.input.dropdown}
              >
                <Picker.Item label="Non Veg" value="Non Veg" />
                <Picker.Item label="Veg" value="Veg" />
                <Picker.Item label="Vegan" value="Vegan" />
              </Picker>
            )}
          />
          {errors.dietaryPreference && <Text style={styles.errorText}>This field is required.</Text>}
        </View>

        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Do you have any food allergies?</Text>
          <Controller
            name="foodAllergies"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Type.."
                onBlur={onBlur}
                onChangeText={(text) => {
                  setFoodAllergies(text);
                  onChange(text);
                }}
                value={value}
              />
            )}
          />
        </View>

        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Any food you avoid for personal reasons?</Text>
          <Controller
            name="foodAvoidance"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Type.."
                onBlur={onBlur}
                onChangeText={(text) => {
                  setFoodAvoidance(text);
                  onChange(text);
                }}
                value={value}
              />
            )}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, !isValid && styles.disabledButton]} 
          onPress={handleSubmit(onSubmit)} 
          disabled={!isValid}
        >
          <Text style={[styles.buttonText, !isValid && styles.disabledButtonText]}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    justifyContent: 'center',
    alignContent: 'center'
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
    marginHorizontal: '5%'
  },
  formItem: {
    full: {
      width: '100%',
      marginBottom: 15,
    },
    half: {
      width: '49%',
      marginBottom: 15,
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
    paddingVertical: 20
  },
  disabledButton: {
    backgroundColor: "#cecece",
    borderColor: "#cecece",
  },
  disabledButtonText: {
    color: "#7d7d7d",
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
    marginBottom: 20,
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
