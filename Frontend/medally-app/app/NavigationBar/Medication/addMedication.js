import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { Link, useRouter } from 'expo-router';
import APIEndpoint from '../../API';
import getuserID from '../../account/userStorage.js'

const getuser = new getuserID()
const api= new APIEndpoint()

export default function Addmedication() {
  const navigation = useNavigation();
  const router = useRouter();
  const api = new APIEndpoint(); // Instantiate the APIEndpoint class

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [endDate, setToDate] = useState(new Date());
  const [startDate, setFromDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [cause, setCause] = useState('');
  const [reminder, setReminder] = useState('10 minutes before');
  const [showReminderModal, setShowReminderModal] = useState(false);
  
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [isFromDateSelected, setIsFromDateSelected] = useState(false);
  const [isToDateSelected, setIsToDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  
  const reminders = [
    { label: 'None', value: 'none' },
    { label: 'At time specified', value: 'at_time' },
    { label: '1 hour before', value: '1_hour_before' },
    { label: '30 minutes before', value: '30_minutes_before' },
    { label: '10 minutes before', value: '10_minutes_before' },
  ];

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowFromDatePicker(false);
    setFromDate(currentDate);
    setIsFromDateSelected(true);
    if (endDate < currentDate) {
      setToDate(currentDate);
    }
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowToDatePicker(false);
    setToDate(currentDate);
    setIsToDateSelected(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
    setIsTimeSelected(true);
  };

  const handleAddMedicine = async () => {
    const newMedication = {
      name,
      dosage,
      startDate: startDate.toISOString().split('T')[0], // Format date to YYYY-MM-DD
      endDate: endDate.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0], // Format time to HH:MM:SS
      cause,
      reminder,
    };

    const userID = getuser.getUserId; // replace with actual user ID

    try {
      const response = await api.addMedication(newMedication, userID);
      
      Alert.alert('Success', 'Medication added successfully');
      // Optionally clear the input fields after successful submission
      setName('');
      setDosage('');
      setFromDate(new Date());
      setToDate(new Date());
      setTime(new Date());
      setCause('');
      setReminder('10 minutes before');
      setIsFromDateSelected(false);
      setIsToDateSelected(false);
      setIsTimeSelected(false);
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to add medication');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Add a medication</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, { color: name ? 'black' : '#7d7d7d' }]}
        value={name}
        onChangeText={setName}
        placeholder="Enter medication name..."
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Dosage</Text>
      <TextInput
        style={[styles.input, { color: dosage ? 'black' : '#7d7d7d' }]}
        value={dosage}
        onChangeText={setDosage}
        placeholder="Enter dosage..."
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity onPress={() => setShowFromDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>
          {isFromDateSelected ? startDate.toDateString() : 'Select from date'}
        </Text>
      </TouchableOpacity>
      {showFromDatePicker && (
        <DateTimePicker value={startDate} mode="date" display="default" onChange={onChangeFromDate} />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity onPress={() => setShowToDatePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{isToDateSelected ? endDate.toDateString() : 'Select to date'}</Text>
      </TouchableOpacity>
      {showToDatePicker && (
        <DateTimePicker value={endDate} mode="date" display="default" onChange={onChangeToDate} />
      )}

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{isTimeSelected ? time.toLocaleTimeString() : 'Select time'}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />
      )}

      <Text style={styles.label}>Cause</Text>
      <TextInput
        style={[styles.input, { color: cause ? 'black' : '#7d7d7d' }]}
        value={cause}
        onChangeText={setCause}
        placeholder="Enter cause..."
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Reminder</Text>
      <TouchableOpacity
        style={[styles.input, styles.reminderInput]}
        onPress={() => setShowReminderModal(true)}
      >
        <Text style={{ color: reminder ? 'black' : '#7d7d7d' }}>{reminder}</Text>
      </TouchableOpacity>

      <Modal visible={showReminderModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a reminder</Text>
            <FlatList
              data={reminders}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.reminderOption}
                  onPress={() => {
                    setReminder(item.label);
                    setShowReminderModal(false);
                  }}
                >
                  <Text style={styles.reminderText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable onPress={() => setShowReminderModal(false)}>
              <Text style={styles.closeModalText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Button title="Add Medication" onPress={handleAddMedicine}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: '#7d7d7d',
  },
  reminderInput: {
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  reminderOption: {
    paddingVertical: 10,
  },
  reminderText: {
    fontSize: 16,
  },
  closeModalText: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  }
});
