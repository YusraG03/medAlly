import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import local images
import manIcon from '../../_assets/man.png'; // Path to the man icon image
import circularImage from '../../_assets/circle.png'; // Path to the circular progress image

const userCredentials = {
  name: 'User',
};

const userGeneralInfo = {
  height: 1.75,
  weight: 68,
};

const medicationInfo = {
  name: 'Panadol',
  dosage: '500mg',
  time: new Date(Date.now() + 30 * 60 * 1000),
};

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
        <View style={styles.circularContainer}>
          <Image source={circularImage} style={styles.circularImage} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.stepsText}>{stepCount}</Text>
            <Text style={styles.stepsLabel}>/10000 steps</Text>
          </View>
          <Image source={manIcon} style={styles.manIcon} resizeMode="contain" />
        </View>
      </View>
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Calories</Text>
          <Text style={styles.metricValue}>{(stepCount * 0.04).toFixed(2)} Kcal</Text>
        </View>
        <View style={styles.verticalBar} />
        <View style={styles.metricBox}>
          <Text style={styles.metricTitle}>Distance</Text>
          <Text style={styles.metricValue}>{(stepCount * 0.762 / 1000).toFixed(2)} km</Text>
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
    backgroundColor: '#F7F7F7',
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
  circularContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circularImage: {
    width: 260,
    height: 300,
    position: 'absolute',
  },
  manIcon: {
    width: 30, // Adjust the size as needed
    height: 95, // Adjust the size as needed
    position: 'absolute',
    top: 20, // Position the manIcon above the text
    zIndex: 1, // Ensure it's above the progress text
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 80, // Adjust to position the text below the manIcon
  },
  stepsText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  stepsLabel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
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
