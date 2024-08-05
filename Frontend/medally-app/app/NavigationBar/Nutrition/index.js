import React, { useState } from "react";
import { StyleSheet, Button, View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from "react-native";
import { useRouter } from 'expo-router';
import ProgressBar from '../../components/ProgressBar.js'; // Import the ProgressBar component

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const date = 'Today';

const dailyIntake = {
  calories: '1391/1633 Kcal',
  carbs: '108g',
  protein: '97g',
  fat: '42g',
};

const MealPage = () => {
  const [expandedMeals, setExpandedMeals] = useState({});
  const router = useRouter();

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMeals((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  // Calculate progress for the progress bar
  const currentCalories = 1391;
  const maxCalories = 1633;

  console.log("MealPage component rendered");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenTitle}>Nutrition Overview</Text>
      <Button title="Go to Meal Breakdown" onPress={() => router.push('./Nutrition/results')} />
      <Button title="Go to Camera" onPress={() => router.push('./Nutrition/camera')} />
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Intake</Text>
        <Text style={styles.cardContentText}>{dailyIntake.calories}</Text>
        <ProgressBar progress={currentCalories} max={maxCalories} />
      </View>
      <View style={styles.card}>
        <View style={styles.center}>
          <Text style={styles.containerActionText}>Nutrition Breakdown</Text>
          <View style={styles.nutritionDistribution}>
            <View style={styles.nutritionStat}>
              <Text style={styles.paragraphTitle}>Carbs</Text>
              <Text style={styles.contentText}>{dailyIntake.carbs}</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.nutritionStat}>
              <Text style={styles.paragraphTitle}>Protein</Text>
              <Text style={styles.contentText}>{dailyIntake.protein}</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.nutritionStat}>
              <Text style={styles.paragraphTitle}>Fat</Text>
              <Text style={styles.contentText}>{dailyIntake.fat}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.daySwitcher}>
        <TouchableOpacity>
          <Image
            style={styles.chevronIcon}
            resizeMode="cover"
            source={require('../../_assets/chevron-left.png')}
          />
        </TouchableOpacity>
        <Text style={styles.paragraphTitle}>{date}</Text>
        <TouchableOpacity>
          <Image
            style={styles.chevronIcon}
            resizeMode="cover"
            source={require('../../_assets/chevron-right.png')}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 16,
    marginTop: '2%',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#cecece',
    backgroundColor: '#fff',
    shadowOpacity: 1,
    elevation: 20,
    shadowRadius: 15,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContentText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  center: {
    alignItems: 'center',
  },
  containerActionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  nutritionDistribution: {
    flexDirection: 'row',
    gap: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionStat: {
    alignItems: 'center',
  },
  paragraphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  seperator: {
    height: '80%',
    width: 0.5,
    backgroundColor: '#cecece',
  },
  daySwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
});

export default MealPage;
