import React, { useState, useEffect } from 'react';
import { StyleSheet, Image,  Text, View, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Link } from 'expo-router';
import colors from '../../_assets/colors';

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        <View style = {styles.names}>
        <View style={styles.formItem.half}>
          <Text style={styles.formHeader}>First Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFirstName(text.trim())}
            value={firstName}
            placeholder="First Name"
          />
        </View>

        <View style={styles.formItem.half}>
          <Text style={styles.formHeader}>Last Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setLastName(text.trim())}
            value={lastName}
            placeholder="Last Name"
          />
        </View>
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



        <Pressable 
            style={[styles.button, !isValid && styles.disabledButton]} 
            onPress={() => router.push('./general-information')}
            disabled={!isValid}
        >
            <Text style={isValid ? styles.buttonText.enabled : styles.buttonText.disabled}>Next</Text>
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
    enabled:{
      color: colors.defaultwhite
    },
    disabled:{
      color: colors.defaultblack
    }
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
