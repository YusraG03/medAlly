import React from 'react';
import { StyleSheet, View } from 'react-native';

const ProgressBar = ({ progress, max }) => {
  const percentage = (progress / max) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.backgroundBar}>
        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop : 5,
    alignSelf: 'stretch',
    flex: 1,
    height: 6,
  },
  backgroundBar: {
    borderRadius: 4,
    backgroundColor: '#d9d9d9',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 4,
    backgroundColor: '#121419',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

export default ProgressBar;
