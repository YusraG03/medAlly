import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing the icon library from Expo
import { useNavigation } from '@react-navigation/native'; // Importing the navigation hook
import { Link } from 'expo-router';
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const navigation = useNavigation(); // Using the navigation hook

  const validatePassword = (password) => {
    // Regular expression to validate:
    // - At least one uppercase letter
    // - At least one numeric character
    // - Minimum 8 characters in length
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const isFormValid = () => {
    return (
      firstName &&
      lastName &&
      email &&
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

  return (
    <View style={styles.container}>
      {/* Password Input Fields */}
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
      {/* Next Page Button */}
         <Link href="/general-information" style={[styles.link, !isFormValid() && styles.linkDisabled]}>
         <Text style={styles.buttonText}>Next Page</Text>
       </Link>
     </View>
   );
 };
      
  

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  iconContainer: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  formButton: {
    borderRadius: 6,
    backgroundColor: '#cecece',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  nextButtonDisabled: {
    backgroundColor: 'lightgrey',
  },
  nextButtonActive: {
    backgroundColor: 'black',
  },
  nextButtonHovered: {
    backgroundColor: 'grey',
  },
  logIn: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    color: '#7d7d7d',
    textAlign: 'left',
  },
});

export default SignUp;
