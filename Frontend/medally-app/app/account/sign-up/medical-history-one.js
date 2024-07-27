import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.formGroup}>
        <Text>Do you have any blood pressure problems?</Text>
        <Controller
          name="bloodPressureProblems"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Hypertension" value="Hypertension" />
              <Picker.Item label="Hypotension" value="Hypotension" />
            </Picker>
          )}
        />
        {errors.bloodPressureProblems && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Do you have any cardiovascular problems?</Text>
        <Controller
          name="cardiovascularProblems"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
              <Picker.Item label="Abnormal heart rhythms, or arrhythmias" value="Abnormal heart rhythms, or arrhythmias" />
              <Picker.Item label="Aorta disease and Marfan syndrome" value="Aorta disease and Marfan syndrome" />
              <Picker.Item label="Congenital heart disease" value="Congenital heart disease" />
              <Picker.Item label="Coronary artery disease (narrowing of the arteries)" value="Coronary artery disease (narrowing of the arteries)" />
              <Picker.Item label="Deep vein thrombosis and pulmonary embolism" value="Deep vein thrombosis and pulmonary embolism" />
              <Picker.Item label="Heart attack" value="Heart attack" />
              <Picker.Item label="Heart failure" value="Heart failure" />
              <Picker.Item label="Heart muscle disease (cardiomyopathy)" value="Heart muscle disease (cardiomyopathy)" />
              <Picker.Item label="Heart valve disease" value="Heart valve disease" />
              <Picker.Item label="Pericardial disease" value="Pericardial disease" />
              <Picker.Item label="Peripheral vascular disease" value="Peripheral vascular disease" />
              <Picker.Item label="Rheumatic heart disease" value="Rheumatic heart disease" />
              <Picker.Item label="Stroke Vascular disease (blood vessel disease)" value="Stroke Vascular disease (blood vessel disease)" />
            </Picker>
          )}
        />
        {errors.cardiovascularProblems && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Do you have any cholesterol problems?</Text>
        <Controller
          name="cholesterolProblems"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Do you have any diabetes problems?</Text>
        <Controller
          name="diabetesProblems"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
              <Picker.Item label="Yes" value="Yes" />
              <Picker.Item label="No" value="No" />
            </Picker>
          )}
        />
        {errors.diabetesProblems && <Text style={styles.errorText}>This field is required.</Text>}
      </View>

      <View style={styles.formGroup}>
        <Text>Do you have any injuries/orthopedic problems?</Text>
        <Controller
          name="injuriesOrthopedicProblems"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Do you have any injuries/orthopedic problems?"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Any past history of surgeries?</Text>
        <Controller
          name="pastSurgeries"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Any past history of surgeries?"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Link href="./medical-history-two" asChild>
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
    marginBottom: 20,
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
    marginTop: 20,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
