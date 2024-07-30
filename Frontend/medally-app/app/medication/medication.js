import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek } from 'date-fns';
import { Link } from 'expo-router';

// Weeklycalendar Component
const Weeklycalendar = ({ onDatePress }) => {
  const [currentWeek, setCurrentWeek] = useState([]);

  useEffect(() => {
    const today = new Date();
    const start = startOfWeek(today, { weekStartsOn: 0 }); // weekStartsOn: 0 for Sunday
    const week = Array.from({ length: 7 }).map((_, index) => addDays(start, index));
    setCurrentWeek(week);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dayContainer} onPress={() => onDatePress(item)}>
      <Text style={styles.dayOfWeek}>{format(item, 'EEE')}</Text>
      <Text style={styles.date}>{format(item, 'd')}</Text>
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

  const handleDatePress = (date) => {
    // Handle the date press event
    console.log('Selected Date:', date);
  };

  return (
    <View style={styles.screenContainer}>
      <Weeklycalendar onDatePress={handleDatePress} />
      <Text style={styles.title}>Reminder For Today</Text>
      {medications.length === 0 ? (
        <Text style={styles.noMedications}>You do not have any medications logged in yet!</Text>
      ) : (
        <FlatList
          data={medications}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      )}
      <Link href="/medication/Addmedication" style={styles.addButton}>
        <Ionicons name="add-circle" size={60} color="black" />
      </Link>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  noMedications: {
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});