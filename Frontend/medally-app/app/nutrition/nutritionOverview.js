import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';


const MealPage = () => {
  	
  	return (
    		<View style={styles.container}>
      			<Text style={textStyles.screenTitle}>Nutrition Overview</Text>
      			<View style={[styles.diseaseHistoryCardParent, styles.nutritionPosition]}>
        				<View style={[styles.diseaseHistoryCard, styles.historyCardShadowBox]}>
          					<View style={[styles.frameParent, styles.cupOfTea1Position]}>
            						<View style={[styles.frameGroup, styles.nutritionFlexBox]}>
              							<View style={styles.dailyIntakeWrapper}>
                								<Text style={[styles.dailyIntake, styles.dailyIntakeTypo]}>Daily intake</Text>
              							</View>
              							<Text style={[styles.kcal, styles.kcalTypo]}>346/1634 Kcal</Text>
            						</View>
            						<View style={styles.rectangleParent}>
              							<View style={[styles.frameChild, styles.framePosition]} />
              							<View style={[styles.frameItem, styles.framePosition]} />
            						</View>
          					</View>
        				</View>
        				<View style={[styles.diseaseHistoryCard1, styles.frameContainerSpaceBlock]}>
          					<View style={[styles.nutrition, styles.nutritionFlexBox]}>
            						<View style={styles.carbsParent}>
              							<Text style={[styles.carbs, styles.carbsTypo]}>Carbs</Text>
              							<Text style={[styles.g, styles.gTypo]}>33g</Text>
            						</View>
            						<Image style={styles.nutritionChild} resizeMode="cover" source="Vector 68.png" />
            						<View style={styles.proteinParent}>
              							<Text style={[styles.protein, styles.carbsFlexBox]}>Protein</Text>
              							<Text style={[styles.g, styles.gTypo]}>22g</Text>
            						</View>
            						<Image style={styles.nutritionChild} resizeMode="cover" source="Vector 69.png" />
            						<View style={styles.proteinParent}>
              							<Text style={[styles.fat, styles.gFlexBox]}>Fat</Text>
              							<Text style={[styles.text, styles.gTypo]}>14g</Text>
            						</View>
          					</View>
          					<Text style={[styles.nutritionBreakdown, styles.chevronDownIcon2Position]}>Nutrition Breakdown</Text>
        				</View>
        				<View style={[styles.frameContainer, styles.frameContainerSpaceBlock]}>
          					<View style={[styles.chevronDownParent, styles.nutritionFlexBox]}>
            						<Image style={[styles.chevronDownIcon, styles.chevronIconLayout]} resizeMode="cover" source="chevron-down.png" />
            						<Text style={[styles.today, styles.carbsTypo]}>Today</Text>
            						<Image style={[styles.chevronDownIcon1, styles.chevronIconLayout]} resizeMode="cover" source="chevron-down.png" />
          					</View>
          					<View style={styles.mealHistoryCardParent}>
            						<View style={[styles.mealHistoryCard, styles.historyCardShadowBox]}>
              							<View style={[styles.diseaseTime, styles.cupOfTea1Position]}>
                								<Text style={[styles.breakfast, styles.fatTypo]}>Breakfast</Text>
                								<Text style={[styles.kcal1, styles.kcalTypo]}>576 Kcal</Text>
              							</View>
              							<Image style={[styles.chevronDownIcon2, styles.chevronDownIcon2Position]} resizeMode="cover" source="chevron-down.png" />
              							<Image style={[styles.cupOfTea1, styles.cupOfTea1Position]} resizeMode="cover" source="Cup of tea 1.png" />
            						</View>
            						<View style={styles.mealCardShadowBox}>
              							<View style={[styles.diseaseTime, styles.cupOfTea1Position]}>
                								<Text style={[styles.breakfast, styles.fatTypo]}>Lunch</Text>
                								<Text style={[styles.kcal1, styles.kcalTypo]}>893 Kcal</Text>
              							</View>
              							<Image style={[styles.chevronDownIcon2, styles.chevronDownIcon2Position]} resizeMode="cover" source="chevron-down.png" />
              							<Image style={[styles.cupOfTea1, styles.cupOfTea1Position]} resizeMode="cover" source="lunch.png" />
            						</View>
            						<View style={styles.mealCardShadowBox}>
              							<View style={[styles.diseaseTime, styles.cupOfTea1Position]}>
                								<Text style={[styles.breakfast, styles.fatTypo]}>Dinner</Text>
                								<Text style={[styles.kcal1, styles.kcalTypo]}>Not Added yet</Text>
              							</View>
              							<Image style={[styles.chevronDownIcon2, styles.chevronDownIcon2Position]} resizeMode="cover" source="plus-03.png" />
              							<Image style={[styles.cupOfTea1, styles.cupOfTea1Position]} resizeMode="cover" source="dinner.png" />
            						</View>
            						<View style={styles.mealCardShadowBox}>
              							<View style={[styles.diseaseTime, styles.cupOfTea1Position]}>
                								<Text style={[styles.breakfast, styles.fatTypo]}>Snacks</Text>
                								<Text style={[styles.kcal1, styles.kcalTypo]}>211 Kcal</Text>
              							</View>
              							<Image style={[styles.chevronDownIcon2, styles.chevronDownIcon2Position]} resizeMode="cover" source="chevron-down.png" />
              							<Image style={[styles.cupOfTea1, styles.cupOfTea1Position]} resizeMode="cover" source="snacks.png" />
            						</View>
          					</View>
        				</View>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	tabLayout: {
    		height: 73,
    		width: 351,
    		left: 19,
    		display: "none",
    		position: "absolute"
  	},
  	nutritionPosition: {
    		position: "absolute",
    		left: "50%"
  	},
  	historyCardShadowBox: {
    		borderWidth: 1,
    		borderColor: "#cecece",
    		borderStyle: "solid",
    		backgroundColor: "#fff",
    		borderRadius: 10,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	cupOfTea1Position: {
    		top: "50%",
    		position: "absolute"
  	},
  	nutritionFlexBox: {
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	dailyIntakeTypo: {
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		letterSpacing: 0,
    		fontSize: 18,
    		textAlign: "center",
    		color: "#121419"
  	},
  	kcalTypo: {
    		fontFamily: "Inter-Regular",
    		letterSpacing: -0.6
  	},
  	framePosition: {
    		borderRadius: 4,
    		left: 0,
    		top: 0,
    		height: 8,
    		position: "absolute"
  	},
  	frameContainerSpaceBlock: {
    		marginTop: 27,
    		alignSelf: "stretch"
  	},
  	carbsTypo: {
    		width: 45,
    		letterSpacing: -0.6,
    		fontSize: 16,
    		textAlign: "center",
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		color: "#121419"
  	},
  	gTypo: {
    		marginTop: 4,
    		color: "#262626",
    		fontFamily: "Inter-Regular",
    		letterSpacing: -0.6,
    		fontSize: 16,
    		textAlign: "center",
    		lineHeight: 18
  	},
  	carbsFlexBox: {
    		display: "flex",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	gFlexBox: {
    		width: 29,
    		display: "flex",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	chevronDownIcon2Position: {
    		top: 16,
    		position: "absolute"
  	},
  	chevronIconLayout: {
    		width: 25,
    		height: 24
  	},
  	fatTypo: {
    		letterSpacing: -0.6,
    		fontSize: 16,
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		color: "#121419"
  	},
  	extendedFab: {
    		top: 756,
    		left: 260,
    		shadowColor: "rgba(0, 0, 0, 0.15)",
    		shadowRadius: 8,
    		elevation: 8,
    		borderRadius: 16,
    		backgroundColor: "#ece6f0",
    		width: 107,
    		minWidth: 80,
    		display: "none",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		alignItems: "center",
    		justifyContent: "center",
    		height: 56,
    		position: "absolute",
    		overflow: "hidden"
  	},
  	snacksTab: {
    		top: 682
  	},
  	dinnerTab: {
    		top: 592
  	},
  	nutritionOverview: {
    		marginLeft: -176,
    		top: 73,
    		fontSize: 24,
    		letterSpacing: -0.7,
    		lineHeight: 24,
    		fontWeight: "800",
    		fontFamily: "Inter-ExtraBold",
    		textAlign: "left",
    		color: "#121419",
    		left: "50%",
    		position: "absolute"
  	},
  	dailyIntake: {
    		textAlign: "center"
  	},
  	dailyIntakeWrapper: {
    		justifyContent: "center"
  	},
  	kcal: {
    		color: "#4b4b4b",
    		fontSize: 16,
    		fontFamily: "Inter-Regular",
    		textAlign: "center",
    		lineHeight: 18
  	},
  	frameGroup: {
    		justifyContent: "space-between",
    		alignSelf: "stretch"
  	},
  	frameChild: {
    		backgroundColor: "#d9d9d9",
    		width: 300
  	},
  	frameItem: {
    		backgroundColor: "#121419",
    		width: 206
  	},
  	rectangleParent: {
    		marginTop: 14,
    		height: 8,
    		alignSelf: "stretch"
  	},
  	frameParent: {
    		marginTop: -20,
    		width: 304,
    		left: 19,
    		top: "50%",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	diseaseHistoryCard: {
    		height: 70,
    		alignSelf: "stretch"
  	},
  	carbs: {
    		display: "flex",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	g: {
    		width: 29,
    		display: "flex",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	carbsParent: {
    		alignItems: "center"
  	},
  	nutritionChild: {
    		maxWidth: "100%",
    		height: 27,
    		marginLeft: 20,
    		overflow: "hidden"
  	},
  	protein: {
    		width: 53,
    		letterSpacing: -0.6,
    		fontSize: 16,
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		color: "#121419",
    		textAlign: "center"
  	},
  	proteinParent: {
    		marginLeft: 20,
    		alignItems: "center"
  	},
  	fat: {
    		letterSpacing: -0.6,
    		fontSize: 16,
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		color: "#121419",
    		textAlign: "center"
  	},
  	text: {
    		alignSelf: "stretch"
  	},
  	nutrition: {
    		marginLeft: -104,
    		bottom: 22,
    		left: "50%",
    		position: "absolute"
  	},
  	nutritionBreakdown: {
    		marginLeft: -87,
    		textAlign: "center",
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		letterSpacing: 0,
    		fontSize: 18,
    		color: "#121419",
    		left: "50%"
  	},
  	diseaseHistoryCard1: {
    		height: 115,
    		borderWidth: 1,
    		borderColor: "#cecece",
    		borderStyle: "solid",
    		backgroundColor: "#fff",
    		borderRadius: 10,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	chevronDownIcon: {
    		height: 24
  	},
  	today: {
    		height: 15,
    		marginLeft: 109
  	},
  	chevronDownIcon1: {
    		marginLeft: 109,
    		height: 24
  	},
  	chevronDownParent: {
    		justifyContent: "center"
  	},
  	breakfast: {
    		alignSelf: "stretch",
    		textAlign: "left"
  	},
  	kcal1: {
    		fontSize: 14,
    		lineHeight: 15,
    		color: "#7d7d7d",
    		marginTop: 2,
    		alignSelf: "stretch",
    		textAlign: "left"
  	},
  	diseaseTime: {
    		marginTop: -17,
    		left: 71,
    		width: 164
  	},
  	chevronDownIcon2: {
    		left: 311,
    		width: 24,
    		height: 24
  	},
  	cupOfTea1: {
    		marginTop: -15,
    		marginLeft: -156,
    		width: 30,
    		height: 30,
    		left: "50%"
  	},
  	mealHistoryCard: {
    		alignSelf: "stretch",
    		height: 56,
    		borderColor: "#cecece",
    		borderStyle: "solid",
    		backgroundColor: "#fff",
    		borderRadius: 10,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)"
  	},
  	mealCardShadowBox: {
    		marginTop: 8,
    		borderWidth: 1,
    		borderColor: "#cecece",
    		borderStyle: "solid",
    		backgroundColor: "#fff",
    		borderRadius: 10,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		alignSelf: "stretch",
    		height: 56,
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	mealHistoryCardParent: {
    		marginTop: 24,
    		alignSelf: "stretch"
  	},
  	frameContainer: {
    		alignItems: "center"
  	},
  	diseaseHistoryCardParent: {
    		marginLeft: -174,
    		top: 121,
    		width: 348,
    		left: "50%",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	container: {
        flex: 1,
        backgroundColor: colors.defaultwhite,
        padding: 16,
        marginTop: '2%',
        gap: '3%',
      },
});

export default MealPage;
