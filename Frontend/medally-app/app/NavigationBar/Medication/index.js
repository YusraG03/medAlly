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
    backgroundColor: colors.defaultwhite,
    justifyContent: 'center',
    alignContent: 'center',
  },
  screenTitle: {
    alignSelf: "stretch",
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "800",
    fontFamily: "Inter-ExtraBold",
    color: "#121419",
    textAlign: "center",
  },
  contentText: {
    alignSelf: "stretch",
    fontSize: 14,
    letterSpacing: -0.6,
    lineHeight: 16,
    fontFamily: "Inter-Regular",
    color: "#4f4f4f",
    textAlign: "center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
  },
  iconContainer: {
    paddingHorizontal: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  inputSpecial: {
    flex: 1,
    height: 40,
    fontSize: 16,
    letterSpacing: -0.2,
    fontFamily: "Inter-Regular",
    paddingLeft: 15,
  },
  formHeader: {
    alignSelf: "stretch",
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: 20,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#121419",
    textAlign: "left",
  },
  form: {
    flexDirection: 'column',
    marginTop: '10%',
    marginHorizontal: '5%',
    marginBottom: 10, // Added margin to space out form items
  },
  formItem: {
    full: {
      width: '100%',
    },
    half: {
      width: '49%',
    },
  },
  names: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted spacing between name fields
    width: '100%',
  },
  errorText: {
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 12,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.errorred,
  },
  input: {
    height: 40,
    borderColor: '#dbdbdb',
    fontSize: 16,
    letterSpacing: -0.2,
    lineHeight: 17,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 15,
    marginBottom: 10,
  },
  button: {
    borderRadius: 6,
    backgroundColor: "#121419",
    borderStyle: "solid",
    borderColor: "#282f41",
    borderWidth: 1,
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  disabledButton: {
    borderRadius: 6,
    borderWidth: 0,
    backgroundColor: "#cecece",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultwhite,
  },
  disabledButtonText: {
    fontSize: 18,
    letterSpacing: 0,
    lineHeight: 18,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: colors.defaultblack,
  },
  header: {
    alignItems: 'center',
  },
  headertext: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6, // Added margin for spacing
  },
  logo: {
    width: 72,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
