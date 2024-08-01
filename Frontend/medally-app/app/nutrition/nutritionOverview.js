import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, LayoutAnimation, UIManager, Platform } from "react-native";
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';
import { mealIcons } from '../_assets/assets';
import ProgressBar from '../components/ProgressBar.js'; // Import the ProgressBar component

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const date = 'Today';

const mealData = [
	
	{
	  id: 1,
	  mealName: 'Breakfast',
	  mealIcon: 'breakfast',
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
	  mealIcon: 'lunch',
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
	  mealIcon: 'dinner',
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
	  mealIcon: 'snacks',
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

  // Calculate progress for the progress bar
  const currentCalories = 1391;
  const maxCalories = 1633;

  return (
    <ScrollView style={styles.container}>
      <Text style={textStyles.screenTitle}>Nutrition Overview</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Daily Intake</Text>
          <Text style={styles.cardContentText}>{dailyIntake.calories}</Text> 
        </View>
        <ProgressBar progress={currentCalories} max={maxCalories} /> {/* Add the progress bar here */}
      </View>


	  <View style={styles.card}>
        <View style={styles.center}>
          <Text style={textStyles.containerActionText}>Nutrition Breakdown</Text>
		  <View style = {styles.nutritionDistribution}>
				<View style = {styles.nutritionStat}>
					<Text style = {textStyles.paragraphTitle}>Carbs</Text>
					<Text style = {textStyles.contentText}>{dailyIntake.carbs}</Text>
				</View>
				<View style = {styles.seperator}></View>
				<View style = {styles.nutritionStat}>
					<Text style = {textStyles.paragraphTitle}>Protein</Text>
					<Text style = {textStyles.contentText}>{dailyIntake.protein}</Text>
				</View>
				<View style = {styles.seperator}></View>
				<View style = {styles.nutritionStat}>
					<Text style = {textStyles.paragraphTitle}>Fat</Text>
					<Text style = {textStyles.contentText}>{dailyIntake.fat}</Text>
				</View>
		  </View>
        </View>
      </View>

	<View style = {styles.daySwitcher}>
		<TouchableOpacity>
		<Image
                  style={styles.chevronIcon}
                  resizeMode="cover"
                  source={require('../_assets/chevron-left.png')}
                />
		</TouchableOpacity>

	<Text style = {textStyles.paragraphTitle}>{date}</Text>
	<TouchableOpacity>
		<Image
                  style={styles.chevronIcon}
                  resizeMode="cover"
                  source={require('../_assets/chevron-right.png')}
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
                  source={expandedMeals[meal.id] ? require('../_assets/chevron-up.png') : require('../_assets/chevron-down.png')}
                />
              </View>
            </TouchableOpacity>
            
            {expandedMeals[meal.id] && (
              <View style={styles.expandedInformation}>
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Description</Text>
                  <Text style={styles.cardContentText}>
                    {meal.mealDescription}
                  </Text>
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
                  <Text style={styles.cardContentText}>
                    {meal.analysis}
                  </Text>
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
    gap: 15,
    width: '82%',
  },
  seperator:{
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
	gap: 20
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
    gap: 10,
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
	gap : '15%',
	justifyContent : 'center',
	alignItems: 'center'
  },
  nutritionStat:{
	alignItems : 'center'
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
    gap: 4,
  },
  nutritionDetails: {
    flexDirection: 'column',
    gap: 2,
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
