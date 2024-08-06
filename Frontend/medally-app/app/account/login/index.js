import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import colors from '../../_assets/colors';
import APIEndpoint from '../../API';
import { storeUserId, getUserId, removeUserId } from '../userStorage';

const userSave = new userStore();
const API = new APIEndpoint()
const eyeOpenIcon = require('../../_assets/eye-open.png');
const eyeClosedIcon = require('../../_assets/eye-closed.png');

export default function Login() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    validateForm();
  }, [email, password]);

 
  const toggleSecureText = () => setIsSecure(!isSecure);

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let valid = true;

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required.');
      valid = false;
    } else {
      setPasswordError('');
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
          <Text style={styles.screenTitle}>Welcome Back</Text>
          <Text style={styles.contentText}>Login to your account to continue.</Text>
        </View>
      </View>

      
      <View style={styles.form}>
        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setEmail(text.trim())}
            value={email}
            placeholder="name@website.com"
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>


        <View style={styles.formItem}>
          <Text style={styles.formHeader}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputSpecial}
              onChangeText={(text) => setPassword(text.trim())}
              value={password}
              placeholder="*********"
              secureTextEntry={isSecure}
            />
            <TouchableOpacity onPress={toggleSecureText} style={styles.iconContainer}>
              <Image source={isSecure ? eyeClosedIcon : eyeOpenIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

       
        <Pressable 
          style={[styles.button, !isValid && styles.disabledButton]} 
          onPress={async () => {
                const userCreds = 
                {
                  email: email,
                  password: password,
                }
                const response = await API.loginUser(userCreds);
                await storeUserId(response.message.id);
                const getID = getUserId();
                alert(getID)
                console.log(getID)
                console.log(response);
                if(response.message.message == "Wrong Credentials!")
                {
                  alert("Wrong Credentials! Please try again.");
                }
                else
                {
                  userSave.saveUserId(response.message.userID)
                  router.push('../../NavigationBar/Home');
                }
              }
            }
          disabled={!isValid}
        >
          <Text style={isValid ? styles.buttonText : styles.disabledButtonText}>Login</Text>
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
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    textAlign: "center",
    marginBottom: 10,
  },
  contentText: {
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
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#121419",
    textAlign: "left",
    marginBottom: 5,
  },
  form: {
    marginTop: '10%',
  },
  formItem: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.errorred,
    marginTop: 5,
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
    borderColor: "#282f41",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  disabledButton: {
    borderRadius: 6,
    backgroundColor: "#cecece",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultwhite,
  },
  disabledButtonText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultblack,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headertext: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  }
});
