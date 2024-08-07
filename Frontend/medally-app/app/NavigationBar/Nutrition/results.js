import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import colors from '../../_assets/colors';
import textStyles from '../../_assets/textStyles';
import { useRoute } from '@react-navigation/native';

const ResultScreen = () => {
  const route = useRoute();
  const { calories, carbs, protein, fat, mealDesc, analysis, image } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={textStyles.screenTitle}>Meal Breakdown</Text>
      <Image 
        source={{ uri: image }} 
        style={styles.foodPicture}
      />

      <View style={styles.mealDescription}>
        <Text style={textStyles.smallParagraphTitle}>Meal Description</Text>
        <Text style={styles.mealName}>{mealDesc}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.center}>
          <Text style={textStyles.containerActionText}>Nutrition Breakdown</Text>
          <View style={styles.nutritionDistribution}>
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

      <View style={styles.container}>
        <Text style={textStyles.smallParagraphTitle}>Analysis</Text>
        <Text style={textStyles.contentText}>{analysis}</Text>
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
	  
	content: {
	  flexDirection: 'column',
	},
	daySwitcher: {
	  flexDirection: 'row',
	  alignItems: "center",
	  justifyContent: "space-between",
	  marginVertical: 10
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 15, // Horizontal spacing between header items
		width: '82%',
	  },
	  
	foodPicture: {
		width: 200,
		height: 200,
		borderRadius: 100, // Half of width/height to make it circular
		borderColor: colors.defaultblack,
		borderWidth: 3,
		alignSelf: 'center',
		overflow: 'hidden',
	  },
	  
	  section: {
		flexDirection: 'column',
		marginBottom: 20, // Vertical spacing between sections
	  },
	  
	diseaseName: {
	  fontSize: 24,
	  letterSpacing: -0.7,
	  lineHeight: 24,
	  fontWeight: "800",
	  fontFamily: "Inter-ExtraBold",
	  color: '#121419',
	  textAlign: "left",
	},
	mealDescription: {
	  alignItems: 'center',
	},
	boldContent: {
	  fontSize: 16,
	  letterSpacing: -0.6,
	  lineHeight: 18,
	  fontWeight: "500",
	  fontFamily: "Inter-Medium",
	  color: '#212121',
	  textAlign: "left",
	},
	mealName: {
	  fontSize: 24,
	  letterSpacing: -0.7,
	  lineHeight: 24,
	  fontWeight: "700",
	  fontFamily: "Inter-Bold",
	  color: '#121419',
	  textAlign: "center",
	  width: 267
	},
	treatmentCard: {
	  marginBottom: 12,
	  paddingVertical: 12,
	  paddingHorizontal: 14,
	  borderRadius: 5,
	  borderWidth: 1,
	  borderColor: '#cecece',
	  backgroundColor: '#fff',
	  shadowOpacity: 0.5,
	  elevation: 5,
	  shadowRadius: 2,
	  shadowOffset: {
		width: 1,
		height: 1,
	  },
	  shadowColor: 'rgba(0, 0, 0, 0.13)',
	},
	treatmentTitle: {
	  fontFamily: 'Inter-SemiBold',
	  fontWeight: '600',
	  fontSize: 16,
	  color: '#262626',
	  marginBottom: 6,
	},
	treatmentDescription: {
	  fontFamily: 'Inter-Regular',
	  fontSize: 14,
	  color: '#4b4b4b',
	  lineHeight: 18,
	},
	historyNote: {
	  textAlign: 'center',
	  width: '80%',
	  alignSelf: 'center',
	  marginTop: 20,
	},
	nextButton: {
	  backgroundColor: colors.primary,
	  padding: 15,
	  borderRadius: 5,
	  alignItems: 'center',
	  marginTop: 20,
	},
	nextButtonText: {
	  color: colors.defaultwhite,
	  fontFamily: 'Inter-SemiBold',
	  fontSize: 16,
	},
	seperator: {
	  height: '80%',
	  width: 0.5,
	  backgroundColor: colors.tertiarytext
	},
	cards: {
	  flexDirection: 'column',
	},
	center: {
		flex: 1,
		alignItems: 'center',
		marginVertical: 20, // Vertical spacing between centered items
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
		width : '90%',
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
	},
	cardHeaderMiddle: {
	  justifyContent: 'center'  
	},
	nutritionDistribution: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 15, // Horizontal spacing between nutrition stats
	  },
	  
	nutritionStat: {
	  alignItems: 'center'
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
		marginVertical: 10, // Vertical spacing between expanded information items
	  },
	  
	  nutritionDetails: {
		flexDirection: 'column',
		marginVertical: 5, // Vertical spacing between nutrition details
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

  export default ResultScreen;