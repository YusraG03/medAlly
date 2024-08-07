import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, Linking } from 'react-native';
import { Pedometer } from 'expo-sensors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import APIEndpoint from '../../API';
import textStyles from '../../_assets/textStyles';
import colors from '../../_assets/colors';
import { storeUserId, getUserId, removeUserId } from '../../account/userStorage';
import manIcon from '../../_assets/man.png'; // Path to the man icon image
import bellIcon from '../../_assets/bell.png';

const API = new APIEndpoint();

export default function DashboardScreen() {
  const [articles, setArticles] = useState([]);
  const [bmi, setBmi] = useState(null); // State for storing BMI
  const [userID, setUserID] = useState(null); // State for storing userID
  const [stepCount, setStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [userGeneralInfo, setUserGeneralInfo] = useState({ height: 0, weight: 0 });
  const [userName, setUserName] = useState('User');
  const [medicationInfo, setMedicationInfo] = useState({ name: 'MedName', dosage: '500mg', time: new Date() });
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


  useEffect(() => {
    const initializeUserID = async () => {
      const userID = await getUserId();
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
        if (response && response.name && response.dosage && response.time) {
          setMedicationInfo(response); // Adjust according to your API response structure
        } else {
          console.log('Unexpected response structure:', response);
          setMedicationInfo({ name: 'Error', dosage: 'Error', time: new Date() });
        }
      } catch (error) {
        console.log('Error fetching next medication:', error);
        setMedicationInfo({ name: 'Error', dosage: 'Error', time: new Date() }); // Optionally set a default or error value
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

    fetchUserNextMedication();
    fetchArticles();
    fetchUserBMI();
    fetchStepData();
    Pedometer.getPermissionsAsync();
    Pedometer.isAvailableAsync().then(
      result => setIsPedometerAvailable(String(result)),
      error => setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error)
    );

    const subscription = Pedometer.watchStepCount(result => setStepCount(result.steps));

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
      API.addStepData(stepData, userID)
        .then(response => console.log('Data sent to backend:', response))
        .catch(error => console.error('Error sending data:', error));
    }, 60000); // 60000ms = 1 minute

    return () => {
      subscription && subscription.remove();
      clearInterval(interval);
    };
  }, [userID, stepCount]);

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

  const handleNotificationPress = () => setModalVisible(true);

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
        <View style = {styles.titlePost}>
        <Text style={textStyles.screenTitle}>Welcome, {userName}!</Text>
        <Text style={textStyles.contentText}>How do you feel today?</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon} onPress={handleNotificationPress}>
          <Image source={bellIcon} style={styles.bellIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.stepsContainer}>
        <AnimatedCircularProgress
          size={220}
          width={18}
          fill={parseFloat(progress)}
          tintColor= "#FF0E82"
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor= {colors.defaultblack}
          rotation={-135}
          arcSweepAngle = {270}
          lineCap="square"
        >
          {() => (
            <View style={styles.progressTextContainer}>
              <Image source={manIcon} style={styles.manIcon} resizeMode="contain" />
              <Text style={styles.stepCount}>{stepCount}</Text>
              <Text style={textStyles.contentText}>/10000 steps</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.metricsContainer}>
        <View style={styles.metricBox}>
          <Text style={textStyles.paragraphTitle}>Calories</Text>
          <Text style={textStyles.contentText}>{(stepCount * 0.04).toFixed(2)} Kcal</Text>
        </View>
        <View style={styles.verticalBar} />
        <View style={styles.metricBox}>
          <Text style={textStyles.paragraphTitle}>Distance</Text>
          <Text style={textStyles.contentText}>{(stepCount * 0.762 / 1000).toFixed(2)} km</Text>
        </View>
        <View style={styles.verticalBar} />
        <View style={styles.metricBox}>
          <Text style={textStyles.paragraphTitle}>Progress</Text>
          <Text style={textStyles.contentText}>{progress}%</Text>
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

      {/* Articles Section */}
      <View style={styles.articleSection}>
        <Text style={textStyles.paragraphTitle}>Articles</Text>
        <ScrollView style={styles.articleList}>
          {articles.map(article => (
            <View key={article.id} style={styles.articleContainer}>
              <Text style={textStyles.paragraphTitle}>{article.title}</Text>
              <Text style={textStyles.contentText}>{article.description}</Text>
              {article.url ? (
                <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
                  <Text style={styles.articleLink}>Read More</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </ScrollView>
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