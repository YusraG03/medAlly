import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';

import manIcon from '../../_assets/man.png'; // Path to the man icon image

const userCredentials = {
  email: 'user@example.com', // Replace with actual user email or credentials
};

const calculateBMI = (height, weight) => {
  return (weight / (height * height)).toFixed(1);
};

export default function DashboardScreen() {
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [userGeneralInfo, setUserGeneralInfo] = useState({ height: 0, weight: 0 });
  const [bmi, setBmi] = useState('0');
  const [userName, setUserName] = useState('User');
  const [medicationInfo, setMedicationInfo] = useState({ name: 'MedName', dosage: '500mg', time: new Date() });
  const [modalVisible, setModalVisible] = useState(false);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Fitness Update',
      message: 'Congratulations! You have achieved your fitness goal for today.',
      date: 'Today',
    },
    {
      id: '2',
      title: 'Meal Alert',
      message: 'Your lunch was high in sugar, which can impact you given you have diabetes.',
      date: 'Today',
    },
    {
      id: '3',
      title: 'Reminder',
      message: 'Don’t forget to take your evening medication.',
      date: 'Yesterday',
    },
    {
      id: '4',
      title: 'Fitness Alert',
      message: 'You did not complete all your steps today!',
      date: '2 Days Ago',
    },
  ]);

  const [article, setArticle] = useState({ title: 'Loading...', content: 'Please wait...' });
  useEffect(() => {
    // Fetch user profile info from backend
    axios.post('http://localhost:3000/getUserProfile', userCredentials)
      .then(response => {
        const { height, weight, name } = response.data;
        setUserGeneralInfo({ height, weight });
        setUserName(name);
        setBmi(calculateBMI(height, weight));
      })
      .catch(error => {
        console.error('Error fetching user profile info:', error);
      });

    // Fetch medication info from backend
    axios.post('http://localhost:3000/getAllMedication', userCredentials)
      .then(response => {
        const medication = response.data[0]; // Adjust as needed
        setMedicationInfo({
          name: medication.name,
          dosage: medication.dosage,
          time: new Date(medication.time), // Convert to Date object if needed
        });
      })
      .catch(error => {
        console.error('Error fetching medication info:', error);
      });

       // Fetch article info from backend
    axios.post('http://localhost:3000/getLatestArticle', userCredentials)
    .then(response => {
      console.log('Article Response:', response.data);
      const { title, content } = response.data;
      setArticle({ title, content });
    })
    .catch(error => {
      console.error('Error fetching article info:', error);
    });

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

  const timeDifferenceInMinutes = Math.round((medicationInfo.time - new Date()) / 60000);

  const stepsGoal = 10000;
  const progress = ((stepCount / stepsGoal) * 100).toFixed(1);

  const getTintColor = (progress) => {
    if (progress < 33) {
      return '#ff0000'; // Red
    } else if (progress < 66) {
      return '#ffff00'; // Yellow
    } else {
      return '#00ff00'; // Green
    }
  };

  const handleNotificationPress = () => {
    setModalVisible(true);
  };

  const renderNotification = (notification) => (
    <View key={notification.id} style={styles.notificationContainer}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
      <Text style={styles.notificationDate}>{notification.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
        <TouchableOpacity style={styles.notificationIcon} onPress={handleNotificationPress}>
          <Ionicons name="notifications-outline" size={30} color="#121419" />
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>How do you feel today?</Text>
      <View style={styles.stepsContainer}>
        <AnimatedCircularProgress
          size={220}
          width={15}
          fill={parseFloat(progress)}
          tintColor={getTintColor(progress)}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#3d5875"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.progressTextContainer}>
              <Text style={styles.stepsText}>{stepCount}</Text>
              <Text style={styles.stepsLabel}>/10000 steps</Text>
              <Image source={manIcon} style={styles.manIcon} resizeMode="contain" />
            </View>
          )}
        </AnimatedCircularProgress>
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
          <Text style={styles.infoSubtitle}>{bmi} kg/m²</Text>
        </View>
      </View>

  {/* Article Section */}
  <View style={styles.articleContainer}>
        <Text style={styles.articleTitle}>{article.title}</Text>
        <Text style={styles.articleContent}>{article.content}</Text>
      </View>

      {/* Notification Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Notifications</Text>
            <ScrollView style={styles.modalScrollView}>
              {notifications.map(notification => renderNotification(notification))}
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  manIcon: {
    width: 30,
    height: 95,
    position: 'absolute',
    top: -58,
    zIndex: 1,
  },
  progressTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  articleContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
   articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  articleContent: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalScrollView: {
    maxHeight: 300, // Adjust height as needed
  },
  notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 16,
    color: '#555',
  },
  notificationDate: {
    fontSize: 14,
    color: '#888',
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: '#121419',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
