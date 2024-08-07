import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Linking } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import APIEndpoint from '../../API';
import textStyles from '../../_assets/textStyles';
import colors from '../../_assets/colors';
import { storeUserId, getUserId, removeUserId } from '../../account/userStorage';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local storage
import manIcon from '../../_assets/man.png'; // Path to the man icon image
import bellIcon from '../../_assets/bell.png';
import { useFocusEffect } from 'expo-router';

const API = new APIEndpoint();

export default function DashboardScreen() {
  const [articles, setArticles] = useState([]);
  const [bmi, setBmi] = useState(null); // State for storing BMI
  const [userID, setUserID] = useState(null); // State for storing userID
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [userGeneralInfo, setUserGeneralInfo] = useState({ height: 0, weight: 0 });
  const [userName, setUserName] = useState('User');
  const [medicationInfo, setMedicationInfo] = useState({ name: 'MedName', dosage: '500mg', time: '0' });
  const [modalVisible, setModalVisible] = useState(false);
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

  const fetchUserNextMedication = async () => {
    const ID = await getUserId();
    if(ID === null) return;
    try {
      const response = await API.getUserNextMedication(ID);
      if(response.isDone !== undefined || response.isDone === true || response === undefined)  
        {
          setMedicationInfo({ name: 'No Medication', dosage: '0mg', time: "Good Job!" });
          return;
        }
      const [hours, minutes] = response.time.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Invalid time format');
      }
  
      const medicationTime = new Date();
      medicationTime.setHours(hours, minutes, 0, 0); // Set hours and minutes
      medicationTime.setSeconds(0);
      medicationTime.setMilliseconds(0);
  
      const currentTime = new Date();
      currentTime.setSeconds(0);
      currentTime.setMilliseconds(0);
  
      const timeDifference = Math.round((medicationTime - currentTime) / 60000); // Difference in minutes
  
      // Check if timeDifference is valid
      if (isNaN(timeDifference) || timeDifference < 0) {
        throw new Error('Invalid time difference');
      }
      setMedicationInfo({
        name: response.medicationName,
        dosage: response.dosage,
        time: "in " + timeDifference.toString() + " minutes",
      });
    } catch (error) {
      console.log('Error fetching next medication:', error);
      setMedicationInfo({ name: 'Error', dosage: 'Error', time: 'Error' });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("torma");
      fetchUserNextMedication();
    }, []) // Empty dependency array means this will run only on focus
  );

  useEffect(() => {
    const initializeUserID = async () => {
      const userID = await getUserId();
      const firstName = await API.getUserFirstName(userID);
      setUserName(firstName);
      setUserID(userID);
    };

    initializeUserID();
  }, []);

  useEffect(() => {
    if (!userID) return; // Ensure userID is set before making API calls

    const fetchArticles = async () => {
      try {
        const fetchedArticles = await API.getArticles();
        setArticles(fetchedArticles || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setArticles([]);
      }
    };

    const fetchUserBMI = async () => {
      try {
        const response = await API.getUserBMI(userID);
        setBmi(response); // Adjust according to your API response structure
      } catch (error) {
        console.log('Error fetching BMI:', error);
        setBmi('Error'); // Optionally set a default or error value
      }
    };

    const fetchUserNextMedication = async () => {
      try {
        const response = await API.getUserNextMedication(userID);
        if(response.isDone !== undefined || response.isDone === true || response === undefined)  
        {
          setMedicationInfo({ name: 'No Medication', dosage: '0mg', time: "Good Job!" });
          return;
        }
        const [hours, minutes] = response.time.split(':').map(Number);
        
        if (isNaN(hours) || isNaN(minutes)) {
          throw new Error('Invalid time format');
        }
    
        const medicationTime = new Date();
        medicationTime.setHours(hours, minutes, 0, 0); // Set hours and minutes
        medicationTime.setSeconds(0);
        medicationTime.setMilliseconds(0);
    
        const currentTime = new Date();
        currentTime.setSeconds(0);
        currentTime.setMilliseconds(0);
    
        const timeDifference = Math.round((medicationTime - currentTime) / 60000); // Difference in minutes
  
        console.log('Time Difference:', timeDifference);
    
        // Check if timeDifference is valid
        if (isNaN(timeDifference) || timeDifference < 0) {
          throw new Error('Invalid time difference');
        }
        setMedicationInfo({
          name: response.medicationName,
          dosage: response.dosage,
          time:"in " + timeDifference.toString() + " minutes",
        });
      } catch (error) {
        console.log('Error fetching next medication:', error);
        setMedicationInfo({ name: 'Error', dosage: 'Error', time: 'Error' });
      }
    };

    const fetchStepData = async () => {
      try {
        const stepData = await API.getStepData(userID);
        if (stepData && stepData.stepCount !== undefined) {
          setStepCount(stepData.stepCount);
        } else {
          console.log('Unexpected step data structure:', stepData);
        }
      } catch (error) {
        console.error('Error fetching step data:', error);
      }
    };

    // Fetch data from API
    fetchUserNextMedication();
    fetchArticles();
    fetchUserBMI();
    fetchStepData();

    // Initialize pedometer
    Pedometer.getPermissionsAsync();
    Pedometer.isAvailableAsync().then(
      result => setIsPedometerAvailable(String(result)),
      error => setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
    );

    const subscription = Pedometer.watchStepCount(result => {
      setStepCount(prevStepCount => prevStepCount + result.steps);
    });

    const interval = setInterval(() => {
      const stepsGoal = 10000;
      const progress = ((stepCount / stepsGoal) * 100).toFixed(1);
      const caloriesBurned = (stepCount * 0.04).toFixed(2);
      const distanceTraveled = (stepCount * 0.762 / 1000).toFixed(2);
      const stepData = {
        stepCount: stepCount,
        progress: progress,
        caloriesBurned: caloriesBurned,
        distanceTraveled: distanceTraveled,
      };

      // Store step count locally
      AsyncStorage.setItem('stepCount', JSON.stringify(stepCount));

      // Send step count to the server
      API.addStepData(stepData, userID)
        .then(response => console.log('Data sent to backend:', response))
        .catch(error => console.error('Error sending data:', error));
    }, 60000); // 60000ms = 1 minute

    return () => {
      subscription && subscription.remove();
      clearInterval(interval);
    };
  }, [userID, stepCount]);

  const stepsGoal = 10000;
  const progress = ((stepCount / stepsGoal) * 100).toFixed(1);
  const caloriesBurned = (stepCount * 0.04).toFixed(2);
  const distanceTraveled = (stepCount * 0.762 / 1000).toFixed(2); // Convert steps to kilometers

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Image source={manIcon} style={styles.profileImage} />
          <Text style={textStyles.greeting}>Hello, {userName}</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image source={bellIcon} style={styles.bellIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={textStyles.summaryText}>Today's Summary</Text>
          <View style={styles.progressContainer}>
            <AnimatedCircularProgress
              size={200}
              width={15}
              fill={progress}
              tintColor={colors.primary}
              backgroundColor={colors.background}
            >
              {fill => (
                <View style={styles.circularProgressTextContainer}>
                  <Text style={textStyles.circularProgressText}>{stepCount} / {stepsGoal} Steps</Text>
                </View>
              )}
            </AnimatedCircularProgress>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={textStyles.statValue}>{caloriesBurned}</Text>
              <Text style={textStyles.statLabel}>Calories Burned</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={textStyles.statValue}>{distanceTraveled}</Text>
              <Text style={textStyles.statLabel}>Km Traveled</Text>
            </View>
          </View>
        </View>

        <View style={styles.bmiContainer}>
          <Text style={textStyles.bmiText}>Your BMI: {bmi !== null ? bmi : 'Loading...'}</Text>
        </View>

        <View style={styles.medicationContainer}>
          <Text style={textStyles.medicationTitle}>Next Medication</Text>
          <Text style={textStyles.medicationName}>{medicationInfo.name}</Text>
          <Text style={textStyles.medicationDosage}>{medicationInfo.dosage}</Text>
          <Text style={textStyles.medicationTime}>{medicationInfo.time}</Text>
        </View>

        <View style={styles.articlesContainer}>
          <Text style={textStyles.articlesTitle}>Recommended Articles</Text>
          {articles.length > 0 ? (
            articles.map(article => (
              <TouchableOpacity
                key={article.id}
                style={styles.article}
                onPress={() => Linking.openURL(article.link)}
              >
                <Text style={textStyles.articleTitle}>{article.title}</Text>
                <Text style={textStyles.articleAuthor}>by {article.author}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={textStyles.noArticlesText}>No articles available.</Text>
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={textStyles.modalTitle}>Notifications</Text>
            <ScrollView style={styles.notificationsContainer}>
              {notifications.map(notification => (
                <View key={notification.id} style={styles.notification}>
                  <Text style={textStyles.notificationTitle}>{notification.title}</Text>
                  <Text style={textStyles.notificationMessage}>{notification.message}</Text>
                  <Text style={textStyles.notificationDate}>{notification.date}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={textStyles.closeButtonText}>Close</Text>
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
  articleList:{
    marginTop: 20
  },
  verticalBar: {
    width: 0.5,
    height: '50%',
    backgroundColor: colors.tertiarytext,
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
    height: 45,
  },
  titlePost:{
    gap: 2
  },
  progressTextContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    top: -10,
    height : 130
  },
  stepCount: {
    alignSelf: "stretch",
    fontSize: 48,
    letterSpacing: -1.4,
    lineHeight: 48,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: '#121419',
    textAlign: "center"
  },
  stepsLabel: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems : 'center',
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
    borderColor : colors.tertiarytext,
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
  articleLink: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
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
  bellIcon:{
    width: 32,
    height: 32
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});