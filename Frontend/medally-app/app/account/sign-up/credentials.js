import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import colors from '../../../assets/colors';

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
    if (!firstName || !lastName || !email) {
      valid = false;
    }
    else {
        valid = true
    }
    if (password && !validatePassword(password)) {
      setPasswordError(
        'Password should be at least 8 characters long, and should contain at least one capital letter and a numerical character.'
      );
      valid = false;
    } else {
      setPasswordError('');
      valid = true;
    }
    if (confirmPassword && (password !== confirmPassword)) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
      valid = true;
    }
   setIsValid(isValid)
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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

        {isValid ? (
          <Link href="/account/sign-up/general-information" asChild>
            <TouchableOpacity style={[styles.button]}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </Link>
        ) : (
          <TouchableOpacity style={[styles.button, styles.buttonDisabled]} disabled={true}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.defaultwhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  form: {
    width: '90%',
  },
  formItem: {
    marginBottom: 15,
  },
  formHeader: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 15,
  },
  iconContainer: {
    marginLeft: 10,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#00000',
    paddingVertical: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#f7f7f7',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#b0b0b0',
  },
});
