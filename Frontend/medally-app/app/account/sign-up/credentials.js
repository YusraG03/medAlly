import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import colors from '../../_assets/colors';

// Import eye icons
const eyeOpenIcon = require('../../_assets/eye-open.png');
const eyeClosedIcon = require('../../_assets/eye-closed.png');

export default function SignUp() {
  // State variables for form fields and validation
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

  // Validate form whenever any input changes
  useEffect(() => {
    validateForm();
  }, [firstName, lastName, email, password, confirmPassword]);

  // Toggle password visibility
  const toggleSecureText = () => setIsSecure(!isSecure);
  const toggleConfirmSecureText = () => setIsConfirmSecure(!isConfirmSecure);

  // Password validation regex
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // Form validation function
  const validateForm = () => {
    let valid = true;
    
    if (!firstName || !lastName || !email) {
      valid = false;
    }
    
    if (!password || !validatePassword(password)) {
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
              style={styles.input}
              onChangeText={(text) => setFirstName(text.trim())}
              value={firstName}
              placeholder="e.g Jean"
            />
          </View>
          <View style={styles.formItem.half}>
            <Text style={styles.formHeader}>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setLastName(text.trim())}
              value={lastName}
              placeholder="e.g Phillips"
            />
          </View>
        </View>

        {/* Email field */}
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text.trim())}
            value={email}
            placeholder="name@website.com"
            keyboardType="email-address"
          />
        </View>

        {/* Password field */}
        <View style={styles.formItem}>
  <Text style={styles.formHeader}>Password</Text>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.inputSpecial}
      onChangeText={(text) => setPassword(text.trim())}
      value={password}
      placeholder="..."
      secureTextEntry={isSecure}
    />
    <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
      <Image source={isSecure ? eyeClosedIcon : eyeOpenIcon} style={styles.eyeIcon} />
    </TouchableOpacity>
  </View>
  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
</View>

        {/* Confirm Password field */}
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Confirm Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputSpecial}
              onChangeText={(text) => setConfirmPassword(text.trim())}
              value={confirmPassword}
              placeholder="..."
              secureTextEntry={isConfirmSecure}
            />
            <TouchableOpacity onPress={toggleConfirmSecureText} style={styles.iconContainer}>
              <Image source={isConfirmSecure ? eyeClosedIcon : eyeOpenIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
        </View>

        {/* Submit button */}
        <Pressable 
          style={[styles.button, !isValid && styles.disabledButton]} 
          onPress={() => router.push('./general-information')}
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
    textAlign: "center",
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
    color: "#7d7d7d",
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
    gap: '2%',
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
  disabledButton:{
    borderRadius: 6,
    borderWidth : 0,
    backgroundColor: "#cecece",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical:20
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultwhite
  },
  disabledButtonText:{
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultblack
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

  eyeIcon:{
    width: 24,
    height: 24,

  },

  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
