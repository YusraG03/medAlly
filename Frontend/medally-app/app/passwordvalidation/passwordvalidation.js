import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing the icon library from Expo

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);

  const validatePassword = (password) => {
    // At least one uppercase letter, one numeric character, and minimum 8 characters
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const toggleSecureText = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={isSecure}
          placeholder="Enter your password"
          onChangeText={(text) => setPassword(text)}
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
    </View>
  );
};

export default PasswordInput;