import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';
import colors from '../../../assets/colors';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text>How many times do you exercise per week?</Text>
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

      <View style={styles.formGroup}>
        <Text>How often do you consume alcohol?</Text>
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

      <View style={styles.formGroup}>
        <Text>How often do you smoke?</Text>
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

      <View style={styles.formGroup}>
        <Text>How often do you drink coffee?</Text>
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

      <View style={styles.formGroup}>
        <Text>Do you do any other substances?</Text>
        <Controller
          name="otherSubstances"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Do you do any other substances?"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Do you have problem sleeping?</Text>
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

      <View style={styles.formGroup}>
        <Text>Are you currently/post partum pregnant?</Text>
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Link href="./medical-history-one" asChild>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formGroup: {
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    color: colors.defaultblack,
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: colors.highlighttext,
    fontSize: 16,
  },
});
