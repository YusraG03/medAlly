import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';


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
  const navigation = useNavigation();
  const route = useRoute();
  const router = useRouter();
  useEffect(() => {
    const loadMedications = async () => {
      try {
        const storedMedications = await AsyncStorage.getItem('medications');
        if (storedMedications) {
          setMedications(JSON.parse(storedMedications));
        }
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

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Medications</Text>
      <Weeklycalendar onDatePress={(date) => console.log(date)} />
      
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.medicationItem}>
            <Text style={styles.medicationName}>{item.name}</Text>
            <Text style={styles.medicationDetails}>{`${item.dosage}, ${item.fromDate.toDateString()} - ${item.toDate.toDateString()}`}</Text>
          </View>
        )}
      />
<Button title="add medication" onPress={() => router.push('./Medication/addMedication')} />
      <Link href="/medication/Addmedication" style={styles.addButton}>
        <Ionicons name="add-circle" size={60} color="black" />
      </Link>
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
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  medicationDetails: {
    fontSize: 16,
    color: '#555',
  },
});
