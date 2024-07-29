import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import colors from '../../_assets/colors';

export default function App() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const onSubmit = data => {
    console.log(data);
    // Navigate to the next page upon successful form submission
    router.push('./medical-history-two');
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.formHeader}>Do you have any cardiovascular problems?</Text>
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
          <Text style={styles.formHeader}>Do you have any cholesterol problems?</Text>
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
          <Text style={styles.formHeader}>Do you have any diabetes problems?</Text>
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
          <Text style={styles.formHeader}>Do you have any injuries/orthopedic problems?</Text>
          <Controller
            name="injuriesOrthopedicProblems"
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
          <Text style={styles.formHeader}>Any past history of surgeries?</Text>
          <Controller
            name="pastSurgeries"
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Submit</Text>
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
