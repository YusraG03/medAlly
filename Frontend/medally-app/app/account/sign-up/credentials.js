import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, confirmPassword]);

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  };

  const toggleConfirmSecureText = () => {
    setIsConfirmSecure(!isConfirmSecure);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    let valid = true;
    if (!firstName || !lastName || !email) {
      valid = false;
    }
    if (password && !validatePassword(password)) {
      setPasswordError(
        'Password should be at least 8 characters long, and should contain at least one capital letter and a numerical character.'
      );
      valid = false;
    } else {
      setPasswordError('');
    }
    if (confirmPassword && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }
    setIsValid(valid && password && confirmPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFirstName(text.trim())}
            value={firstName}
            placeholder="First Name"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLastName(text.trim())}
            value={lastName}
            placeholder="Last Name"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text.trim())}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setPassword(text.trim())}
              value={password}
              placeholder="Password"
              secureTextEntry={isSecure}
            />
            <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
              <Ionicons name={isSecure ? 'eye-off' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setConfirmPassword(text.trim())}
              value={confirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={isConfirmSecure}
            />
            <TouchableOpacity onPress={toggleConfirmSecureText} style={styles.iconContainer}>
              <Ionicons name={isConfirmSecure ? 'eye-off' : 'eye'} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          ) : null}
        </View>

        <Link href="/account/sign-up/general-information">
          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    marginTop: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  formHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'lightgrey',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
