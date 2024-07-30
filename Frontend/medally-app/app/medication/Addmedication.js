import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMedicationScreen() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
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
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFromDate(currentDate);
    setIsFromDateSelected(true);
    // Ensure the "To Date" is not before the "From Date"
    if (toDate < currentDate) {
      setToDate(currentDate);
    }
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setToDate(currentDate);
    setIsToDateSelected(true);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    setIsTimeSelected(true);
  };

  const handleAddMedicine = () => {
    // Handle the add medicine action
    console.log('Medicine added');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.screenTitle}>Add a medication</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, { color: name ? 'black' : '#7d7d7d' }]}
        value={name}
        onChangeText={setName}
        placeholder="Type a message.."
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Dosage</Text>
      <TextInput
        style={[styles.input, { color: dosage ? 'black' : '#7d7d7d' }]}
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
        placeholder="...mg"
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Duration</Text>
      <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
        <Text style={[styles.dateText, { color: isFromDateSelected || showFromDatePicker ? 'black' : '#7d7d7d' }]}>
          {fromDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showFromDatePicker && (
        <DateTimePicker 
          value={fromDate} 
          mode="date" 
          display="default" 
          onChange={onChangeFromDate} 
        />
      )}

      <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
        <Text style={[styles.dateText, { color: isToDateSelected || showToDatePicker ? 'black' : '#7d7d7d' }]}>
          {toDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showToDatePicker && (
        <DateTimePicker 
          value={toDate} 
          mode="date" 
          display="default" 
          minimumDate={fromDate} // Set the minimum date for the To Date picker
          onChange={onChangeToDate} 
        />
      )}

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={[styles.dateText, { color: isTimeSelected || showTimePicker ? 'black' : '#7d7d7d' }]}>
          {time.toLocaleTimeString()}
        </Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker 
          value={time} 
          mode="time" 
          display="default" 
          onChange={onChangeTime} 
        />
      )}

      <Text style={styles.label}>Cause</Text>
      <TextInput
        style={[styles.input, { color: cause ? 'black' : '#7d7d7d' }]}
        value={cause}
        onChangeText={setCause}
        placeholder="Type a message.."
        placeholderTextColor="#7d7d7d"
      />

      <Text style={styles.label}>Reminders</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => setShowReminderModal(true)}>
        <Text style={styles.dropdownText}>{reminders.find(r => r.value === reminder)?.label || 'Select reminder'}</Text>
      </TouchableOpacity>

      <Modal
        visible={showReminderModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowReminderModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={reminders}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalItem}
                  onPress={() => {
                    setReminder(item.value);
                    setShowReminderModal(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.addButton} onPress={handleAddMedicine}>
        <Text style={styles.addButtonText}>Add Medicine</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'left',
    letterSpacing: -0.7,
    lineHeight: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
    letterSpacing: -0.3,
    lineHeight: 16,
    marginVertical: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginVertical: 8,
    height: 40,
  },
  dateText: {
    fontSize: 16,
    padding: 8,
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
    height: 40,
    textAlignVertical: 'center',
  },
  dropdown: {
    borderColor: '#dbdbdb',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  dropdownText: {
    fontSize: 16,
    color: '#7d7d7d',
    textAlignVertical: 'center',
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
    borderRadius: 10,
    padding: 16,
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    color: 'black',
  },
  addButton: {
    backgroundColor: '#121419',
    paddingVertical: 12,
    borderRadius: 5,
    marginVertical: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

