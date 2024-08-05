import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import DashboardScreen  from './DashboardScreen';

export default function Layout() {
  return (
    <ScrollView style={styles.container}>
      <DashboardScreen></DashboardScreen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
