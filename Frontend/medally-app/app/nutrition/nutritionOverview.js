import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from "react-native";
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const mealData = [
  {
    id: 1,
    mealName: 'Breakfast',
    calories: '576 Kcal',
    mealDescription: 'Scrambled Eggs, Sausages and Bacon',
    nutrition: {
      carbs: '33g',
      protein: '22g',
      fat: '15g',
    },
    analysis: 'Given your record of high cholesterol, you should avoid combining such oily food in the morning.',
  },
  {
    id: 2,
    mealName: 'Lunch',
    calories: '215 Kcal',
    mealDescription: 'Chopped Chicken Salad',
    nutrition: {
      carbs: '15g',
      protein: '35g',
      fat: '2g',
    },
    analysis: 'A healthy meal like this will be beneficial as lettuce leaves release antioxidants, resulting in better health.',
  },
  {
    id: 3,
    mealName: 'Dinner',
    calories: '450 Kcal',
    mealDescription: 'Grilled Salmon with Quinoa and Steamed Vegetables',
    nutrition: {
      carbs: '40g',
      protein: '30g',
      fat: '20g',
    },
    analysis: 'A balanced meal with a good source of omega-3 fatty acids, which are beneficial for heart health.',
  },
  {
    id: 4,
    mealName: 'Snacks',
    calories: '150 Kcal',
    mealDescription: 'Greek Yogurt with Honey and Almonds',
    nutrition: {
      carbs: '20g',
      protein: '10g',
      fat: '5g',
    },
    analysis: 'A light snack that provides a good balance of protein and healthy fats, great for maintaining energy levels.',
  }
];

const dailyIntake = {
  calories: '1391/1633 Kcal',
  carbs: '108g',
  protein: '97g',
  fat: '42g',
};

const MealPage = () => {
  const [expandedMeals, setExpandedMeals] = useState({});

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedMeals((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Nutrition Overview</Text>

      <View style={styles.card}>
		<View style = {styles.cardHeader}>
		<Text style={styles.cardTitle}>Daily Intake</Text>
		<Text style={styles.textTypo}>{dailyIntake.calories}</Text> 
		</View>
      </View>

      <ScrollView style={styles.cards}>
        {mealData.map((meal) => (
          <View key={meal.id} style={styles.card}>
            <TouchableOpacity onPress={() => toggleExpand(meal.id)} style={[styles.upperInfo, styles.upperInfoFlexBox]}>
              <View style={styles.mealTime}>
                <Text style={styles.mealName}>{meal.mealName}</Text>
                <Text style={styles.calories}>{meal.calories}</Text>
              </View>
              <Image
                style={styles.chevronIcon}
                resizeMode="cover"
                source={expandedMeals[meal.id] ? require('../_assets/chevron-up.png') : require('../_assets/chevron-down.png')}
              />
            </TouchableOpacity>
            
            {expandedMeals[meal.id] && (
              <View style={styles.expandedInformation}>
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Description</Text>
                  <Text style={[styles.descriptionText, styles.textTypo]}>
                    {meal.mealDescription}
                  </Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Nutrition</Text>
                  <View style={styles.nutritionDetails}>
                    <Text style={styles.textTypo}>Carbs: {meal.nutrition.carbs}</Text>
                    <Text style={styles.textTypo}>Protein: {meal.nutrition.protein}</Text>
                    <Text style={styles.textTypo}>Fat: {meal.nutrition.fat}</Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Analysis</Text>
                  <Text style={[styles.analysisText, styles.textTypo]}>
                    {meal.analysis}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    padding: 16,
    marginTop: '2%',
    gap: '2%',
  },
  cards: {
    flexDirection: 'column',
    gap: 10,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
	paddingVertical: 15,
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
    gap: 10,
    marginBottom: 10,
  },
  upperInfoFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  mealTime: {
    width: 164,
  },
  cardHeader:{
	flex : 1,
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "space-between"
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
    gap: 10,
  },
  section: {
    flexDirection: 'column',
    gap: 10,
  },
  descriptionText: {
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  nutritionDetails: {
    flexDirection: 'column',
    gap: 10,
  },
  analysisText: {
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  textTypo: {
    color: '#4b4b4b',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    textAlign: 'left',
    letterSpacing: -0.6,
    alignSelf: 'stretch',
  },
  cardTitle: {
    color: '#212121',
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 10,
  },
  dailyIntakeDetails: {
    flexDirection: 'column',
    gap: 10,
  },
});

export default MealPage;
