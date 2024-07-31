import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays, startOfWeek, isToday } from 'date-fns';
import { Link } from 'expo-router';

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
  const today = new Date();
  const month = format(today, 'MMMM');
  const date = format(today, 'd');

  const handleDatePress = (date) => {
    // Handle the date press event
    console.log('Selected Date:', date);
  };

  return (
    <View style={styles.screenContainer}>
      <Weeklycalendar onDatePress={handleDatePress} />
      <View style={styles.textContainer}>
        <Text style={styles.currentDate}>{`${month} ${date}`}</Text>
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
      </View>
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
    // Ensure that the layout is vertical
    justifyContent: 'flex-start',
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4, // Adds space below day name
  },
  dateContainer: {
    width: 40, // Change this value to adjust the circle size
    height: 40, // Change this value to adjust the circle size
    borderRadius: 20, // Ensure this is half of the width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Default background color
    borderWidth: 2, // Add border width if needed
    borderColor: 'black', // Add border color if needed
  },
  date: {
    fontSize: 16,
  },
  today: {
    backgroundColor: 'black', // Circle color for today
  },
  todayDate: {
    color: 'white', // Text color inside the circle
  },
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    position: 'relative',
  },
  textContainer: {
    position: 'absolute',
    top: 95, // Adjust this value to move the text down from the dates
    left: 16, // Align text to the left
    width: '100%',
  },
  currentDate: {
    fontSize: 16,
    color: "#7d7d7d",
    marginBottom: 4, // Space between date and title
    lineHeight: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    lineHeight: 24,
  },
  noMedications: {
    fontSize: 16,
    color: '#262626',
  },
  addButton: {
    position: 'absolute',
    bottom: 75,
    right: 16,
  },
});
