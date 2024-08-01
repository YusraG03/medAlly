import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Placeholder for user credentials and general information
const userCredentials = {
  name: 'User', // This will be dynamically changed to the actual user's name
};

const userGeneralInfo = {
  height: 1.75, // in meters
  weight: 68, // in kg
};

const medicationInfo = {
  name: 'Panadol',
  dosage: '500mg',
  time: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
};

// Helper function to calculate BMI
const calculateBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(1);
};

export default function DashboardScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');

  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(String(result));
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
      }
    );

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(result.steps);
    });

    return () => subscription && subscription.remove();
  }, []);

  const userBMI = calculateBMI(userGeneralInfo.height, userGeneralInfo.weight);
  const timeDifferenceInMinutes = Math.round((medicationInfo.time - new Date()) / 60000);

  // Calculations
  const stepsGoal = 10000;
  const caloriesBurned = (stepCount * 0.04).toFixed(2);
  const distanceWalked = (stepCount * 0.762 / 1000).toFixed(2); // in kilometers
  const progress = ((stepCount / stepsGoal) * 100).toFixed(1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userCredentials.name}!</Text>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={30} color="#121419" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>How do you feel today?</Text>
      <View style={styles.stepsContainer}>
        <Text style={styles.stepsText}>{stepCount}</Text>
        <Text style={styles.stepsLabel}>/10000 steps</Text>
      </View>
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Calories</Text>
          <Text style={styles.metricValue}>{caloriesBurned} Kcal</Text>
        </View>
        <View style={styles.verticalBar} />
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Distance</Text>
          <Text style={styles.metricValue}>{distanceWalked} km</Text>
        </View>
        <View style={styles.verticalBar} />
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Progress</Text>
          <Text style={styles.metricValue}>{progress}%</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{medicationInfo.name}</Text>
          <Text style={styles.infoSubtitle}>in {timeDifferenceInMinutes} minutes</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>BMI</Text>
          <Text style={styles.infoSubtitle}>{userBMI} kg/m2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e4e6',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  notificationIcon: {
    padding: 10,
  },
  verticalBar: {
    width: 2, 
    height: 60, 
    backgroundColor: '#7D7D7D',
    marginHorizontal: 10, 
  },
  subText: {
    fontSize: 18,
    color: '#555',
    marginVertical: -30,
  },
  stepsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50,
  },
  stepsText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  stepsLabel: {
    fontSize: 18,
    color: '#555',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  metricBox: {
    alignItems: 'center',
  },
  metricTitle: {
    fontSize: 18,
    color: '#555',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoSubtitle: {
    fontSize: 16,
    color: '#555',
  },
});
