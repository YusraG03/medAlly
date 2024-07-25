import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);

  const navigation = useNavigation();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const isFormValid = () => {
    return (
      validatePassword(password) &&
      password === confirmPassword
    );
  };

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  };

  const toggleConfirmSecureText = () => {
    setIsConfirmSecure(!isConfirmSecure);
  };

  const handleNextPage = () => {
    if (isFormValid()) {
      navigation.goBack(); // Ensure this route exists in your navigation setup
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecure}
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
          <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {!validatePassword(password) && password.length > 0 && (
        <Text style={styles.errorText}>
          Password must be at least 8 characters long, with at least one uppercase letter and one number.
        </Text>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isConfirmSecure}
          placeholder="Confirm your password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <TouchableOpacity onPress={toggleConfirmSecureText} style={styles.iconContainer}>
          <Ionicons name={isConfirmSecure ? 'eye-off' : 'eye'} size={20} color="#000" />
        </TouchableOpacity>
      </View>
      {password !== confirmPassword && confirmPassword.length > 0 && (
        <Text style={styles.errorText}>Passwords do not match.</Text>
      )}
      <TouchableOpacity
        style={[styles.button, !isFormValid() && styles.buttonDisabled]}
        onPress={handleNextPage}
        disabled={!isFormValid()}
      >
        <Text style={styles.buttonText}>Next Page</Text>
      </TouchableOpacity>
      <Text>Pressing next page will only take you back :D</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    borderRadius: 6,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SignUp;
