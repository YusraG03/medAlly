import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profilePic} />
        <Text style={styles.profileName}>Jane Doe</Text>
        <Text style={styles.profileEmail}>janedoe@gmail.com</Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('editprofile')}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Account Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Medical Record</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Terms & Conditions</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.deleteAccountText}>Delete my account</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>Developed by GMC.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  editProfileButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editProfileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menu: {
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  deleteAccountText: {
    fontSize: 16,
    color: '#ff0000',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#777',
  },
});

export default ProfileScreen;
