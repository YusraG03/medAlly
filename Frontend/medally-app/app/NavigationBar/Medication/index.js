import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import APIEndpoint from '../../API';
import { storeUserId, getUserId, removeUserId } from '../../account/userStorage';
import colors from '../../_assets/colors';

const api = new APIEndpoint();
// Weeklycalendar Component
const Weeklycalendar = ({ onDatePress }) => {
  const [currentWeek, setCurrentWeek] = useState([]);
  const today = new Date();

  useEffect(() => {
    const start = startOfWeek(today, { weekStartsOn: 0 }); // weekStartsOn: 0 for Sunday
    const week = Array.from({ length: 7 }).map((_, index) => addDays(start, index));
    setCurrentWeek(week);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dayContainer} onPress={() => onDatePress(item)}>
      <Text style={styles.dayOfWeek}>{format(item, 'EEE')}</Text>
      <View style={[styles.dateContainer, isToday(item) && styles.today]}>
        <Text style={[styles.date, isToday(item) && styles.todayDate]}>
          {format(item, 'd')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={currentWeek}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
      horizontal
      contentContainerStyle={styles.calendarContainer}
    />
  );
};

// MedicationScreen Component
export default function MedicationScreen() {
  const [medications, setMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();

  useEffect(() => {
    const loadMedications = async () => {
      try {
        const userID = await getUserId();
        const response = await api.getAllMedication(userID);
        console.log(response);
        setMedications(response);
      } catch (error) {
        console.error('Failed to load medications.', error);
      }
    };
    loadMedications();
  }, []);
  
  const loadMedications = async () => {
    try {
      const response = await api.getAllMedication('KcLR8zOoexJp8N2Qrvz2');
      console.log(response);
      setMedications(response);
    } catch (error) {
      console.error('Failed to load medications.', error);
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      loadMedications();
    }, []) // Empty dependency array means this will run only on focus
  )


  useEffect(() => {
    if (route.params?.newMedication) {
      const newMedicationsList = [...medications, route.params.newMedication];
      setMedications(newMedicationsList);
      AsyncStorage.setItem('medications', JSON.stringify(newMedicationsList));
    }
  }, [route.params?.newMedication]);

  const handleMenuPress = (medication) => {
    setSelectedMedication(medication);
    setShowMenuModal(true);
  };

  const handleAction = async (action) => {
    // Update medication status
    const updatedMedication = { ...selectedMedication, status: action };
    const updatedMedications = medications.map(med =>
      med.medicationName === selectedMedication.medicationName ? updatedMedication : med
    );
    setMedications(updatedMedications);
    await AsyncStorage.setItem('medications', JSON.stringify(updatedMedications));
    console.log(`Medication ${selectedMedication.medicationName} ${action}`);
    setShowMenuModal(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString); // Convert string to Date object
    return date.toLocaleDateString('en-GB'); // Format date to string
  };

  const renderItem = ({ item }) => (
    <View style={[styles.medicationItem, item.status && styles[item.status]]}>
      <View style={styles.detailsContainer}>
        <Text style={[styles.medicationName, item.status && styles.crossedOut]}>
          {item.medicationName}
        </Text>
        <View style={styles.timeAction}>
          <Text style={[styles.medicationTime, item.status && styles.crossedOut]}>
            {item.time}
          </Text>
          <TouchableOpacity onPress={() => handleMenuPress(item)}>
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Medications</Text>
      <Weeklycalendar onDatePress={(date) => console.log(date)} />
      
      {medications.length > 0 ? (
        <FlatList
          data={medications}
          keyExtractor={(item) => item.medicationName}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noMedicationsText}>No medications for now</Text>
      )}

      <Pressable onPress={() => router.push('./Medication/addMedication')} style={styles.addButton}>
        <Ionicons name="add-circle" size={60} color="black" />
      </Pressable>

      {/* Menu Modal */}
      <Modal visible={showMenuModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Action</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAction('Taken')}
            >
              <Text style={styles.modalText}>Taken</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAction('Skipped')}
            >
              <Text style={styles.modalText}>Skipped</Text>
            </TouchableOpacity>
            <Pressable onPress={() => setShowMenuModal(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: -38,
  },
  screenTitle: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    marginVertical: 20,
  },
  medicationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginRight: 0,
  },
  timeAction: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  medicationName: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: -1,
    fontFamily: "Inter-SemiBold",
    color: "#121419",
  },
  medicationTime: {
    fontSize: 32,
    fontFamily: "Inter-Regular",
    letterSpacing: -1.3,
    color: "#7d7d7d",
    marginVertical: 4,
  },
  medicationDosage: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#4f4f4f",
    marginVertical: 4,
  },
  medicationDetails: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#4f4f4f",
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end', // Aligns dots to the right
    flexShrink: 0, // Ensures container does not shrink and stays at the right
  },
  noMedicationsText: {
    textAlign: 'center',
    fontSize: 16,
    color: "#4f4f4f",
    marginTop: 20,
    fontFamily: "Inter-Regular",
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "Inter-SemiBold",
    color: "#121419",
    marginBottom: 20,
  },
  modalOption: {
    width: '100%',
    padding: 15,
    backgroundColor: colors.defaultwhite,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#121419",
  },
  closeModalText: {
    marginTop: 20,
    fontSize: 16,
    color: '#007bff',
    fontFamily: "Inter-Regular",
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayOfWeek: {
    fontSize: 14,
    color: "#4f4f4f",
    fontFamily: "Inter-Regular",
  },
  dateContainer: {
    marginTop: 5,
    width: 55,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    backgroundColor: colors.defaultblack,
  },
  date: {
    fontSize: 14,
    color: "#4f4f4f",
    fontFamily: "Inter-Regular",
  },
  todayDate: {
    color: colors.defaultwhite,
  },
  crossedOut: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  Taken: {
    backgroundColor: '#e0f7fa',
  },
  Skipped: {
    backgroundColor: '#ffebee',
  },
});
