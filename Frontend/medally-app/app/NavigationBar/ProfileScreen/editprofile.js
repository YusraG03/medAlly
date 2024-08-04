import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input} placeholder="First Name" />
      <TextInput style={styles.input} placeholder="Last Name" />
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Change password" onPress={() => {}} />
      <Text style={styles.medicalRecord}>Medical Record</Text>
      <Text>• General Information</Text>
      <Text>• Physical Habits</Text>
      <Text>• Medical History</Text>
      <Text>• Nutrition & Eating Habits</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8d7da',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
  },
  medicalRecord: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
