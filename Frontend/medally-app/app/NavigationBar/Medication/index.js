import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import APIEndpoint from '../../API';
import getuserID from '../../account/userStorage.js'
import colors from '../../_assets/colors';


const getdata= new getuserID()
const api = new APIEndpoint()

//const userID = await getdata.getUserId()

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
        console.log(response)
        setMedications(response)


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
      <Weeklycalendar onDatePress={(date) => console.log(datgiyCe)} />
      
      {medications.length > 0 ? (
        <FlatList
          data={medications}
          keyExtractor={(item) => item[0].medicationName}
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
    backgroundColor: colors.defaultwhite,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    textAlign: "center",
    marginVertical: 20,
  },
  medicationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  medicationName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: "Inter-SemiBold",
    color: "#121419",
  },
  medicationDetails: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: "#4f4f4f",
    marginTop: 4,
  },
  menuContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dayOfWeek: {
    fontSize: 14,
    color: "#4f4f4f",
    fontFamily: "Inter-Regular",
  },
  dateContainer: {
    marginTop: 5,
    width: 30,
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
});
