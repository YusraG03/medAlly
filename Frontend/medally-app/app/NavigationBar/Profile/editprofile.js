import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>First Name</Text>
          <TextInput style={styles.input} placeholder="e.g Jean" />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput style={styles.input} placeholder="e.g Paul" />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="user@email.com" />
      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="**********" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Change password</Text>
      </TouchableOpacity>

      <Text style={styles.medicalRecordTitle}>Medical Record</Text>
      <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('GeneralInformation')}>
        <Text style={styles.recordText}>General Information</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('PhysicalHabits')}>
        <Text style={styles.recordText}>Physical Habits</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('MedicalHistoryOne')}>
        <Text style={styles.recordText}>Medical History</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.recordItem} onPress={() => navigation.navigate('NutritionHabits')}>
        <Text style={styles.recordText}>Nutrition & Eating Habits</Text>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#121419',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  medicalRecordTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  recordText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 25,
    color: '#000000',
  },
});

export default EditProfileScreen;
