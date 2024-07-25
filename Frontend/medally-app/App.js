import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={!isPasswordVisible}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
        <Text style={styles.toggleButtonText}>
          {isPasswordVisible ? 'Hide' : 'Show'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default PasswordInput;
