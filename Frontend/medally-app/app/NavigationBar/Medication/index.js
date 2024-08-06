import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import APIEndpoint from '../../API';
import getuserID from '../../account/userStorage.js'

const getdata= new getuserID()
const api = new APIEndpoint()
const userID = await getdata.getUserId()

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
      contentContainerStyle={styles.container}
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
        const response= await api.getAllMedication('1yqpFppDMfYgevo7isXH')
        setMedications= response

      } catch (error) {
        console.error('Failed to load medications.', error);
      }
    };
    loadMedications();
  }, []);

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

  const handleAction = (action) => {
    // Implement action handling (Take or Skip)
    console.log(`Medication ${selectedMedication.name} ${action}`);
    setShowMenuModal(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.medicationItem}>
      <Text style={styles.medicationName}>{item.name}</Text>
      <Text style={styles.medicationDetails}>{`${item.dosage}, ${new Date(item.fromDate).toDateString()} - ${new Date(item.toDate).toDateString()}`}</Text>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => handleMenuPress(item)}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
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
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noMedicationsText}>No medications for now</Text>
      )}

      <Button title="Add Medication" onPress={() => router.push('./Medication/addMedication')} />
      <Link href="/medication/Addmedication" style={styles.addButton}>
        <Ionicons name="add-circle" size={60} color="black" />
      </Link>

      {/* Menu Modal */}
      <Modal visible={showMenuModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Action</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAction('Take')}
            >
              <Text style={styles.modalText}>Take</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleAction('Skip')}
            >
              <Text style={styles.modalText}>Skip</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'flex-start',
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  dateContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'black',
  },
  date: {
    fontSize: 16,
  },
  today: {
    backgroundColor: 'black',
  },
  todayDate: {
    color: 'white',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  medicationItem: {
    marginVertical: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationDetails: {
    fontSize: 16,
    color: '#555',
  },
  menuContainer: {
    marginLeft: 'auto',
  },
  noMedicationsText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
  },
  closeModalText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  }
});
