import React, { useState } from "react";
import { StyleSheet, Button, View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from "react-native";
import colors from '../../_assets/colors';
import textStyles from '../../_assets/textStyles';
import { mealIcons } from '../../_assets/assets';
import ProgressBar from '../../components/ProgressBar.js';
import { router } from 'expo-router';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const date = 'Today';

const MealPage = () => {
  const [expandedMeals, setExpandedMeals] = useState({});

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMeals((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const dailyIntake = {
    calories: 1391,
    carbs: '150g',
    protein: '60g',
    fat: '50g'
  };

  const mealData = [
    {
      id: 1,
      mealIcon: 'breakfast',
      mealName: 'Breakfast',
      calories: '350 kcal',
      mealDescription: 'Scrambled eggs with toast and avocado.',
      nutrition: {
        carbs: '30g',
        protein: '20g',
        fat: '15g',
      },
      analysis: 'A balanced meal to start your day with good carbs and protein.',
    },
    {
      id: 2,
      mealIcon: 'lunch',
      mealName: 'Lunch',
      calories: '500 kcal',
      mealDescription: 'Grilled chicken salad with quinoa.',
      nutrition: {
        carbs: '40g',
        protein: '35g',
        fat: '20g',
      },
      analysis: 'A protein-rich lunch to keep you energized through the afternoon.',
    },
    {
      id: 3,
      mealIcon: 'dinner',
      mealName: 'Dinner',
      calories: '450 kcal',
      mealDescription: 'Salmon with steamed vegetables and brown rice.',
      nutrition: {
        carbs: '50g',
        protein: '30g',
        fat: '25g',
      },
      analysis: 'A healthy dinner with omega-3 fatty acids and complex carbs.',
    },
  ];

  // Calculate progress for the progress bar
  const currentCalories = 1391;
  const maxCalories = 1633;

  return (
    <ScrollView style={styles.container}>
      <Text style={textStyles.screenTitle}>Nutrition Overview</Text>
      <Button title="Results Test" onPress={() => router.push('./Nutrition/results')} />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Daily Intake</Text>
          <Text style={styles.cardContentText}>{dailyIntake.calories}</Text> 
        </View>
        <ProgressBar progress={currentCalories} max={maxCalories} />
      </View>

      <View style={styles.card}>
        <View style={styles.center}>
          <Text style={textStyles.containerActionText}>Nutrition Breakdown</Text>
          <View style={styles.nutritionDistribution}>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Carbs</Text>
              <Text style={textStyles.contentText}>{dailyIntake.carbs}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Protein</Text>
              <Text style={textStyles.contentText}>{dailyIntake.protein}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Fat</Text>
              <Text style={textStyles.contentText}>{dailyIntake.fat}</Text>
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
        <Text style={textStyles.paragraphTitle}>{date}</Text>
        <TouchableOpacity>
          <Image
            style={styles.chevronIcon}
            resizeMode="cover"
            source={require('../../_assets/chevron-right.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cards}>
        {mealData.map((meal) => (
          <View key={meal.id} style={styles.card}>
            <TouchableOpacity onPress={() => toggleExpand(meal.id)} style={[styles.upperInfo, styles.upperInfoFlexBox]}>
              <View style={styles.header}>
                <Image
                  style={styles.mealIcon}
                  resizeMode="cover"
                  source={mealIcons[meal.mealIcon]}
                />
                <View style={styles.mealTime}>
                  <Text style={styles.mealName}>{meal.mealName}</Text>
                  <Text style={styles.calories}>{meal.calories}</Text>
                </View>
                <Image
                  style={styles.chevronIcon}
                  resizeMode="cover"
                  source={expandedMeals[meal.id] ? require('../../_assets/chevron-up.png') : require('../../_assets/chevron-down.png')}
                />
              </View>
            </TouchableOpacity>
            
            {expandedMeals[meal.id] && (
              <View style={styles.expandedInformation}>
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Description</Text>
                  <Text style={styles.cardContentText}>{meal.mealDescription}</Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Nutrition</Text>
                  <View style={styles.nutritionDetails}>
                    <Text style={styles.cardContentText}>Carbs: {meal.nutrition.carbs}</Text>
                    <Text style={styles.cardContentText}>Protein: {meal.nutrition.protein}</Text>
                    <Text style={styles.cardContentText}>Fat: {meal.nutrition.fat}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Analysis</Text>
                  <Text style={styles.cardContentText}>{meal.analysis}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'column',
    backgroundColor: colors.defaultwhite,
    padding: 16,
    marginTop: '2%',
  },
  daySwitcher: {
	flexDirection : 'row',
	alignItems: "center",
    justifyContent: "space-between",
	marginVertical: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 15, // Replaced gap with margin
    width: '82%',
  },
  separator:{
	height : '80%',
	width: 0.5,
	backgroundColor: colors.tertiarytext
  },
  cards: {
    flexDirection: 'column',
  },
  center:{
	flex: 1,
	alignItems : 'center',
    marginBottom: 20, // Replaced gap with marginBottom
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#cecece',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    shadowOpacity: 1,
    elevation: 20,
    shadowRadius: 15,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    marginBottom: 10,
  },
  upperInfoFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mealTime: {
    width: '95%',
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
	middle:{
		justifyContent: 'center'	
	}
  },
  mealName: {
    color: '#212121',
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: -0.6,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    alignSelf: 'stretch',
  },
  nutritionDistribution:{
	flexDirection : 'row',
	justifyContent : 'center',
	alignItems: 'center'
  },
  nutritionStat:{
	alignItems : 'center',
    marginHorizontal: 10, // Replaced gap with marginHorizontal
  },
  calories: {
    color: '#7d7d7d',
    marginTop: 3,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 15,
    textAlign: 'left',
    letterSpacing: -0.6,
    alignSelf: 'stretch',
  },
  chevronIcon: {
    width: 24,
    height: 24,
  },
  expandedInformation: {
    width: '100%',
    marginTop: 10, // Replaced gap with marginTop
  },
  section: {
    flexDirection: 'column',
    marginBottom: 4, // Replaced gap with marginBottom
  },
  nutritionDetails: {
    flexDirection: 'column',
    marginTop: 2, // Replaced gap with marginTop
  },
  cardContentText: {
    color: '#262626',
    fontWeight: '500',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    textAlign: 'left',
    letterSpacing: -0.6,
    alignSelf: 'stretch',
  },
  mealIcon: {
    width: 30,
    height: 30,
  },
  cardTitle: {
    color: '#212121',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MealPage;
