import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import colors from '../../_assets/colors';
import textStyles from '../../_assets/textStyles';
import { useRoute } from '@react-navigation/native';
import APIEndpoint from "../../API";
import { getUserId } from '../../account/userStorage';

const ResultScreen = () => {
  const [userID, setUserID] = useState(null);
  const route = useRoute();
  const { mealName, calories, carbs, protein, fat, mealDesc, analysis, image } = route.params || {};

  const API = new APIEndpoint();

  useEffect(() => {
    (async () => {
      const id = await getUserId();
      setUserID(id);
    })();
  }, []);

  useEffect(() => {
    const saveMeal = async () => {
      if (mealName && userID) {
        try {
          // Structure foodIntake as an object with nutritional data
          const foodIntake = {
			mealDesc: mealDesc,
            calories: calories,
            carbs: carbs,
            protein: protein,
            fat: fat,
			analysis: analysis
          };
          
          // Call the API method with mealName, foodIntake, and userID
          const response = await API.addUserDailyFoodIntake(mealName, foodIntake, userID);
          console.log("Meal saved successfully", response);
        } catch (error) {
          console.error("Error saving meal", error);
        }
      }
    };

    saveMeal();
  }, [mealName, userID]);

  if (!route.params) {
    return <Text>No results available</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={textStyles.screenTitle}>Meal Breakdown</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.foodPicture} />
      )}

      <View style={styles.mealDescription}>
        <Text style={textStyles.smallParagraphTitle}>Meal Description</Text>
        <Text style={styles.mealName}>{mealDesc}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.center}>
          <Text style={textStyles.containerActionText}>Nutrition Breakdown</Text>
          <View style={styles.nutritionDistribution}>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Calories</Text>
              <Text style={textStyles.contentText}>{calories}kcal</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Carbs</Text>
              <Text style={textStyles.contentText}>{carbs}g</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Protein</Text>
              <Text style={textStyles.contentText}>{protein}g</Text>
            </View>
            <View style={styles.seperator}></View>
            <View style={styles.nutritionStat}>
              <Text style={textStyles.paragraphTitle}>Fat</Text>
              <Text style={textStyles.contentText}>{fat}g</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.analysis}>
        <Text style={textStyles.smallParagraphTitle}>Analysis</Text>
        <Text style={styles.contentText}>{analysis}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    padding: 8,
    marginTop: '2%',
  },
  mealDescription: {
    alignItems: 'center',
    marginTop: 20,
  },
  foodPicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: colors.defaultblack,
    marginTop: 20,
    borderWidth: 3,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  mealName: {
    fontSize: 24,
    letterSpacing: -0.7,
    lineHeight: 24,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: '#121419',
    textAlign: "center",
    width: 267,
    marginTop: 8,
  },
  analysis: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: '#cecece',
    backgroundColor: '#fff',
    shadowOpacity: 1,
    elevation: 20,
    marginHorizontal: 20,
    shadowRadius: 15,
    marginTop: 5,
    height: 110,
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.13)',
    width: '90%',
    alignSelf: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
  },
  nutritionDistribution: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  nutritionStat: {
    alignItems: 'center',
    marginHorizontal: 12,
    marginTop: 5,
  },
  contentText: {
    fontSize: 16,
    letterSpacing: -0.6,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: "#262626",
  },
  paragraphTitle: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: "#121419",
    lineHeight: 18,
    textAlign: "center",
  },
  seperator: {
    height: '80%',
    width: 0.5,
    backgroundColor: colors.tertiarytext,
  },
});

export default ResultScreen;
