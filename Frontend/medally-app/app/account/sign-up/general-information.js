import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import colors from '../../_assets/colors';

export default function generalInformation() {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    // Manually update the form value with the selected date
    control.setValue('DateOfBirth', currentDate.toLocaleDateString('en-GB'));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onSubmit = data => {
    console.log(data);
    router.push('./physical-habits');
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
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Gender:</Text>
            <Controller
              name="Gender"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Picker selectedValue={value} onValueChange={onChange} style={styles.input}>
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                </Picker>
              )}
            />
            {errors.Gender && <Text style={styles.errorText}>This field is required.</Text>}
          </View>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Date of Birth:</Text>
            <Controller
              name="DateOfBirth"
              control={control}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <View>
                  <TouchableOpacity onPress={showDatepicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="DD/MM/YYYY"
                      value={value}
                      editable={false} // Disable direct input
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
              )}
            />
            {errors.DateOfBirth && <Text style={styles.errorText}>This field is required.</Text>}
          </View>
        </View>
        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Weight(kg):</Text>
          <Controller
            name="Weight"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="000"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.Weight && <Text style={styles.errorText}>This field is required.</Text>}
        </View>
        <View style={styles.formItem.full}>
          <Text style={styles.formHeader}>Height(cm):</Text>
          <Controller
            name="Height"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="000"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="numeric"
              />
            )}
          />
          {errors.Height && <Text style={styles.errorText}>This field is required.</Text>}
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
    gap: '5%',
  },
  formItem: {
    full: {
      width: '100%',
    },
    half: {
      width: '49%',
    },
  },
  GenderAndDOB: {
    flexDirection: 'row',
    gap: '2%',
    width: '100%',
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
    gap: 0,
  },
  headertext: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
