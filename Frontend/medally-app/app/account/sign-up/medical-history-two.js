import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API';
import { getUserId } from '../userStorage';

const API = new APIEndpoint();

export default function MedicalHistoryTwo() {
  const { control, handleSubmit, watch } = useForm();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState(false);

  const conditionsInjuries = watch('conditionsInjuries');
  const drugAllergies = watch('drugAllergies');

  useEffect(() => {
    validateForm();
  }, [conditionsInjuries, drugAllergies]);

  const validateForm = () => {
    // Form is valid if at least one field is filled
    setIsValid(!!conditionsInjuries || !!drugAllergies);
  };

  const onSubmit = async data => {
    if (isValid) {
      const userMedicalHistory = {
        conditionsInjuries: data.conditionsInjuries,
        drugAllergies: data.drugAllergies,
      };
      const userId = await getUserId();
      const response = await API.addUserMedicalHistory(userMedicalHistory, userId);
      navigation.navigate('NutritionHabits');
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
          <Text style={styles.screenTitle}>Medical History (2/2)</Text>
          <Text style={styles.contentText}>Tell us more about your general activity & consumption.</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Any other conditions/injuries we should be aware of?</Text>
          <Controller
            name="conditionsInjuries"
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

        <View style={styles.formGroup}>
          <Text style={styles.formHeader}>Any drug allergies?</Text>
          <Controller
            name="drugAllergies"
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
    marginHorizontal: '5%',
    gap: '1%'
  },
  formGroup: {
    marginBottom: 15
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
    gap: 0
  },
  headertext: {
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
