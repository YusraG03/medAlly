import * as React from "react";
import {StyleSheet, View, Text, Image} from "react-native";

const ChatbotPage = () => {
  	
  	return (
    		<View style={styles.chatbotPage}>
      			<View style={[styles.extendedFab, styles.parentFlexBox]} />
      			<View style={[styles.mealBreakdownParent, styles.nutritionFlexBox]}>
        				<Text style={[styles.mealBreakdown, styles.mealBreakdownLayout]}>Meal Breakdown</Text>
        				<View style={styles.clockForward} />
      			</View>
      			<View style={[styles.formButton, styles.formPosition]}>
        				<Text style={[styles.logIn, styles.logTypo]}>Confirm</Text>
      			</View>
      			<View style={[styles.formButton1, styles.formPosition]}>
        				<Text style={[styles.logIn1, styles.logTypo]}>Edit</Text>
      			</View>
      			<View style={styles.ellipseParent}>
        				<Image style={styles.frameChild} resizeMode="cover" source="Ellipse 49.png" />
        				<View style={[styles.frameParent, styles.parentFlexBox]}>
          					<View style={[styles.mealDescriptionParent, styles.parentFlexBox]}>
            						<Text style={styles.mealDescription}>Meal Description</Text>
            						<Text style={[styles.scrambledEggsSausages, styles.givenYourRecordSpaceBlock]}>Scrambled Eggs, Sausages and Bacon</Text>
          					</View>
          					<View style={[styles.diseaseHistoryCard, styles.formButtonBorder]}>
            						<View style={[styles.nutrition, styles.nutritionPosition]}>
              							<View style={styles.carbsParent}>
                								<Text style={[styles.carbs, styles.carbsTypo]}>Carbs</Text>
                								<Text style={[styles.g, styles.gFlexBox]}>33g</Text>
              							</View>
              							<Image style={styles.nutritionChild} resizeMode="cover" source="Vector 68.png" />
              							<View style={styles.proteinParent}>
                								<Text style={[styles.protein, styles.carbsTypo]}>Protein</Text>
                								<Text style={[styles.g, styles.gFlexBox]}>22g</Text>
              							</View>
              							<Image style={styles.nutritionChild} resizeMode="cover" source="Vector 69.png" />
              							<View style={styles.proteinParent}>
                								<Text style={[styles.fat, styles.gFlexBox]}>Fat</Text>
                								<Text style={[styles.g2, styles.gClr]}>14g</Text>
              							</View>
            						</View>
            						<Text style={[styles.nutritionBreakdown, styles.logTypo]}>Nutrition Breakdown</Text>
          					</View>
          					<View style={[styles.analysisParent, styles.parentFlexBox]}>
            						<Text style={styles.mealDescription}>Analysis</Text>
            						<Text style={[styles.givenYourRecord, styles.g2Typo]}>Given your record of high cholesterol, you should avoid combining such oily food in the morning.</Text>
          					</View>
        				</View>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	parentFlexBox: {
    		justifyContent: "center",
    		alignItems: "center"
  	},
  	nutritionFlexBox: {
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	mealBreakdownLayout: {
    		lineHeight: 24,
    		letterSpacing: -0.7,
    		fontSize: 24
  	},
  	formPosition: {
    		paddingVertical: 10,
    		paddingHorizontal: 20,
    		width: 110,
    		borderRadius: 6,
    		top: 697,
    		left: "50%",
    		flexDirection: "row",
    		alignItems: "center",
    		justifyContent: "center",
    		position: "absolute"
  	},
  	logTypo: {
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600"
  	},
  	givenYourRecordSpaceBlock: {
    		marginTop: 4,
    		color: "#121419"
  	},
  	formButtonBorder: {
    		borderWidth: 1,
    		borderStyle: "solid"
  	},
  	nutritionPosition: {
    		left: "50%",
    		position: "absolute"
  	},
  	carbsTypo: {
    		display: "flex",
    		fontSize: 16,
    		textAlign: "center",
    		letterSpacing: -0.6,
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		color: "#121419",
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	gFlexBox: {
    		width: 29,
    		display: "flex",
    		fontSize: 16,
    		textAlign: "center",
    		letterSpacing: -0.6,
    		lineHeight: 18,
    		alignItems: "center",
    		justifyContent: "center"
  	},
  	gClr: {
    		color: "#262626",
    		marginTop: 4,
    		fontFamily: "Inter-Regular"
  	},
  	g2Typo: {
    		fontSize: 16,
    		textAlign: "center",
    		letterSpacing: -0.6,
    		alignSelf: "stretch",
    		lineHeight: 18
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
    		height: 56,
    		display: "none",
    		minWidth: 80,
    		alignItems: "center",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		},
    		position: "absolute",
    		overflow: "hidden"
  	},
  	mealBreakdown: {
    		fontWeight: "800",
    		fontFamily: "Inter-ExtraBold",
    		textAlign: "left",
    		color: "#121419"
  	},
  	clockForward: {
    		width: 24,
    		height: 24
  	},
  	mealBreakdownParent: {
    		top: 73,
    		left: 24,
    		width: 343,
    		justifyContent: "space-between",
    		position: "absolute"
  	},
  	logIn: {
    		color: "#f7f7f7",
    		lineHeight: 18,
    		letterSpacing: 0,
    		fontSize: 18,
    		fontWeight: "600",
    		textAlign: "left"
  	},
  	formButton: {
    		marginLeft: 9,
    		backgroundColor: "#121419",
    		borderColor: "#282f41",
    		borderWidth: 1,
    		borderStyle: "solid"
  	},
  	logIn1: {
    		color: "#7d7d7d",
    		lineHeight: 18,
    		letterSpacing: 0,
    		fontSize: 18,
    		fontWeight: "600",
    		textAlign: "left"
  	},
  	formButton1: {
    		marginLeft: -120,
    		backgroundColor: "#cecece"
  	},
  	frameChild: {
    		width: 200,
    		height: 200
  	},
  	mealDescription: {
    		fontSize: 14,
    		lineHeight: 16,
    		color: "#4b4b4b",
    		textAlign: "center",
    		fontFamily: "Inter-Regular",
    		letterSpacing: -0.6,
    		alignSelf: "stretch"
  	},
  	scrambledEggsSausages: {
    		fontWeight: "700",
    		fontFamily: "Inter-Bold",
    		width: 267,
    		textAlign: "center",
    		lineHeight: 24,
    		letterSpacing: -0.7,
    		fontSize: 24
  	},
  	mealDescriptionParent: {
    		alignItems: "center"
  	},
  	carbs: {
    		width: 45
  	},
  	g: {
    		color: "#262626",
    		marginTop: 4,
    		fontFamily: "Inter-Regular"
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
    		width: 53
  	},
  	proteinParent: {
    		marginLeft: 20,
    		alignItems: "center"
  	},
  	fat: {
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		color: "#121419"
  	},
  	g2: {
    		fontSize: 16,
    		textAlign: "center",
    		letterSpacing: -0.6,
    		alignSelf: "stretch",
    		lineHeight: 18
  	},
  	nutrition: {
    		marginLeft: -104,
    		bottom: 22,
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	nutritionBreakdown: {
    		marginLeft: -87,
    		top: 16,
    		textAlign: "center",
    		lineHeight: 18,
    		letterSpacing: 0,
    		fontSize: 18,
    		fontWeight: "600",
    		left: "50%",
    		position: "absolute",
    		color: "#121419"
  	},
  	diseaseHistoryCard: {
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		shadowRadius: 20,
    		elevation: 20,
    		borderRadius: 10,
    		backgroundColor: "#fff",
    		borderColor: "#cecece",
    		height: 115,
    		marginTop: 30,
    		alignSelf: "stretch",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	givenYourRecord: {
    		fontWeight: "500",
    		fontFamily: "Inter-Medium",
    		marginTop: 4,
    		color: "#121419"
  	},
  	analysisParent: {
    		width: 293,
    		marginTop: 30,
    		alignItems: "center"
  	},
  	frameParent: {
    		marginTop: 27,
    		alignSelf: "stretch",
    		alignItems: "center"
  	},
  	ellipseParent: {
    		marginTop: -290,
    		top: "50%",
    		left: 21,
    		width: 348,
    		alignItems: "center",
    		position: "absolute"
  	},
  	chatbotPage: {
    		backgroundColor: "#f7f7f7",
    		flex: 1,
    		width: "100%",
    		height: 844,
    		overflow: "hidden"
  	}
});

export default ChatbotPage;
