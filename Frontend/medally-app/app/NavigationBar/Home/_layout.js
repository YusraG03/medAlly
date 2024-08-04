import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArticlesScreen from './ArticlesScreen'; // Adjust the path if needed
import DashboardScreen  from './DashboardScreen';

export default function Layout() {
  return (
    <View style={styles.container}>
      <DashboardScreen></DashboardScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
