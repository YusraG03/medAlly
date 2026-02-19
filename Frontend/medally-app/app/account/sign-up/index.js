import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Button, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router'; // Updated import
import colors from '../../_assets/colors';
import APIEndpoint from '../../API.js';
import { storeUserId, getUserId, removeUserId } from '../userStorage';

// Import eye icons
const eyeOpenIcon = require('../../_assets/eye-open.png');
const eyeClosedIcon = require('../../_assets/eye-closed.png');
const API = new APIEndpoint();

export default function SignUp() {
  const router = useRouter(); // Initialize router

  // State variables for form fields, validation, and touch tracking
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
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Validate form whenever any input changes
  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, confirmPassword]);

  // Toggle password visibility
  const toggleSecureText = () => setIsSecure(!isSecure);
  const toggleConfirmSecureText = () => setIsConfirmSecure(!isConfirmSecure);

  // Password validation regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/;
    return regex.test(password);
  };

  // Form validation function
  const validateForm = () => {
    let valid = true;

    if (!firstName || !lastName || !email) {
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password should be at least 8 characters long, and should contain at least one capital letter and a numerical character.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    setIsValid(valid);
  };



  // Handle touch events to set touched state
  const handleTouch = (field) => {
    setTouchedFields(prevState => ({ ...prevState, [field]: true }));
  };

  // Handle text input changes
  const handleTextChange = (setter) => (text) => {
    setter(text.trim());
  };

  // Render function
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header section */}
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

      {/* Form section */}
      <View style={styles.form}>
        {/* Name fields */}
        <View style={styles.names}>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>First Name</Text>
            <TextInput
              style={[styles.input, {
                color: firstName ? '#000' : '#7d7d7d',
                borderColor: touchedFields.firstName && !firstName ? colors.errorred : '#dbdbdb'
              }]}
              onChangeText={handleTextChange(setFirstName)}
              onBlur={() => handleTouch('firstName')}
              value={firstName}
              placeholder="e.g Jean"
              placeholderTextColor="#7d7d7d"
            />
          </View>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Last Name</Text>
            <TextInput
              style={[styles.input, {
                color: lastName ? '#000' : '#7d7d7d',
                borderColor: touchedFields.lastName && !lastName ? colors.errorred : '#dbdbdb'
              }]}
              onChangeText={handleTextChange(setLastName)}
              onBlur={() => handleTouch('lastName')}
              value={lastName}
              placeholder="e.g Phillips"
              placeholderTextColor="#7d7d7d"
            />
          </View>
        </View>

        {/* Email field */}
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Email</Text>
          <TextInput
            style={[styles.input, {
              color: email ? '#000' : '#7d7d7d',
              borderColor: touchedFields.email && !email ? colors.errorred : '#dbdbdb'
            }]}
            onChangeText={handleTextChange(setEmail)}
            onBlur={() => handleTouch('email')}
            value={email}
            placeholder="name@website.com"
            keyboardType="email-address"
            placeholderTextColor="#7d7d7d"
          />
        </View>

        {/* Password field */}
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputSpecial, {
                color: password ? '#000' : '#7d7d7d',
                borderColor: touchedFields.password && !validatePassword(password) ? colors.errorred : '#dbdbdb'
              }]}
              onChangeText={handleTextChange(setPassword)}
              onBlur={() => handleTouch('password')}
              value={password}
              placeholder="..."
              secureTextEntry={isSecure}
              placeholderTextColor="#7d7d7d"
            />
            <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
              <Image source={isSecure ? eyeClosedIcon : eyeOpenIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          {touchedFields.password && passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        {/* Confirm Password field */}
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.inputSpecial, {
                color: confirmPassword ? '#000' : '#7d7d7d',
                borderColor: touchedFields.confirmPassword && password !== confirmPassword ? colors.errorred : '#dbdbdb'
              }]}
              onChangeText={handleTextChange(setConfirmPassword)}
              onBlur={() => handleTouch('confirmPassword')}
              value={confirmPassword}
              placeholder="..."
              secureTextEntry={isConfirmSecure}
              placeholderTextColor="#7d7d7d"
            />
            <TouchableOpacity onPress={toggleConfirmSecureText} style={styles.iconContainer}>
              <Image source={isConfirmSecure ? eyeClosedIcon : eyeOpenIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          {touchedFields.confirmPassword && confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>

        {/* Submit button */}
        <Pressable 
          style={[styles.button, !isValid && styles.disabledButton]}
          onPress={async () => {
            const userCreds = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              password: password
            };
            const response = await API.registerUser(userCreds);
            // Handle error or missing userID
            if (!response || response.error || !response.userID) {
              let errorMsg = response && response.error ? response.error : 'Registration failed. Please try again.';
              alert(errorMsg);
              return;
            }
            await storeUserId(response.userID);
            router.push('./general-information');
          }}
          disabled={!isValid}
        >
          <Text style={isValid ? styles.buttonText : styles.disabledButtonText}>Next</Text>
        </Pressable>
      </View>
    </ScrollView>
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
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  iconContainer: {
    paddingHorizontal: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  inputSpecial: {
    flex: 1,
    height: 40,
    fontSize: 16,
    letterSpacing: -0.2,
    fontFamily: "Inter-Regular",
    paddingLeft: 15,
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
    marginBottom: 10, // Added margin to space out form items
  },
  formItem: {
    full: {
      width: '100%',
    },
    half: {
      width: '49%',
    },
  },
  names: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted spacing between name fields
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
  disabledButton: {
    borderRadius: 6,
    borderWidth: 0,
    backgroundColor: "#cecece",
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
    color: colors.defaultwhite,
  },
  disabledButtonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultblack,
  },
  header: {
    alignItems: 'center',
  },
  headertext: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6, // Added margin for spacing
  },
  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
