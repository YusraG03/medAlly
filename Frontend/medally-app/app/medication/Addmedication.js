import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddMedicationScreen() {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [cause, setCause] = useState('');
  const [reminder, setReminder] = useState('10 minutes before');

  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [showToDatePicker, setShowToDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeFromDate = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDatePicker(Platform.OS === 'ios');
    setFromDate(currentDate);
  };

  const onChangeToDate = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    setShowToDatePicker(Platform.OS === 'ios');
    setToDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
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
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Type a message.."
      />

      <Text style={styles.label}>Dosage</Text>
      <TextInput
        style={styles.input}
        value={dosage}
        onChangeText={setDosage}
        keyboardType="numeric"
        placeholder="...mg"
      />

      <Text style={styles.label}>Duration</Text>
      <TouchableOpacity onPress={() => setShowFromDatePicker(true)}>
        <Text style={styles.dateText}>{fromDate.toDateString()}</Text>
      </TouchableOpacity>
      {showFromDatePicker && (
        <DateTimePicker value={fromDate} mode="date" display="default" onChange={onChangeFromDate} />
      )}

      <TouchableOpacity onPress={() => setShowToDatePicker(true)}>
        <Text style={styles.dateText}>{toDate.toDateString()}</Text>
      </TouchableOpacity>
      {showToDatePicker && (
        <DateTimePicker value={toDate} mode="date" display="default" onChange={onChangeToDate} />
      )}

      <Text style={styles.label}>Time</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>{time.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker value={time} mode="time" display="default" onChange={onChangeTime} />
      )}

      <Text style={styles.label}>Cause</Text>
      <TextInput
        style={styles.input}
        value={cause}
        onChangeText={setCause}
        placeholder="Type a message.."
      />

      <Text style={styles.label}>Reminders</Text>
      <Picker selectedValue={reminder} onValueChange={(itemValue) => setReminder(itemValue)}>
        <Picker.Item label="None" value="none" />
        <Picker.Item label="At time specified" value="at_time" />
        <Picker.Item label="1 hour before" value="1_hour_before" />
        <Picker.Item label="30 minutes before" value="30_minutes_before" />
        <Picker.Item label="10 minutes before" value="10_minutes_before" />
      </Picker>

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
