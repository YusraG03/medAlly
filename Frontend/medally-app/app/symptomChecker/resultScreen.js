import * as React from "react";
import {StyleSheet, View, Image, Text} from "react-native";

const ChatbotPage = () => {
  	
  	return (
    		<View style={styles.chatbotPage}>
      			<View style={styles.extendedFab} />
      			<View style={[styles.homeIndicator, styles.homePosition]}>
        				<View style={[styles.homeIndicator1, styles.homePosition]} />
      			</View>
      			<View style={styles.navbar}>
        				<View style={[styles.div, styles.parentFlexBox]}>
          					<Image style={[styles.fiRrHomeIcon, styles.iconLayout]} resizeMode="cover" source="fi-rr-home.png" />
          					<Image style={[styles.fiRrHomeIcon, styles.iconLayout]} resizeMode="cover" source="fi-rr-utensils.png" />
          					<Image style={[styles.fiRrHomeIcon, styles.iconLayout]} resizeMode="cover" source="fi-sr-vector.png" />
          					<Image style={[styles.fiRrHomeIcon, styles.iconLayout]} resizeMode="cover" source="fi-rr-link.png" />
          					<Image style={[styles.fiRrHomeIcon, styles.iconLayout]} resizeMode="cover" source="fi-rr-user.png" />
        				</View>
        				<Image style={[styles.navbarChild, styles.divPosition]} resizeMode="cover" source="Vector 2.png" />
      			</View>
      			<View style={[styles.symptomCheckerParent, styles.parentPosition]}>
        				<Text style={[styles.symptomChecker, styles.commonColdTypo]}>Symptom Checker</Text>
        				<Image style={styles.iconLayout} resizeMode="cover" source="clock-forward.png" />
      			</View>
      			<View style={[styles.youHaveTheParent, styles.parentPosition]}>
        				<Text style={[styles.youHaveThe, styles.youHaveTheTypo]}>You have the</Text>
        				<Text style={[styles.commonCold, styles.commonColdTypo]}>Common Cold</Text>
      			</View>
      			<Text style={[styles.likelihood, styles.youHaveTheTypo]}>Likelihood</Text>
      			<Text style={[styles.outOf10, styles.outOf10Typo]}>9 out of 10 people with these symptoms were experiencing the same disease.</Text>
      			<View style={[styles.groupParent, styles.parentFlexBox]}>
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={styles.groupIconLayout} resizeMode="cover" source={require('../_assets/person.png')} />
        				<Image style={[styles.groupIcon9, styles.groupIconLayout]} resizeMode="cover" source={require('../_assets/person.png')} />
      			</View>
      			<Text style={styles.theResultsOf}>The results of this session will be available in the history section.</Text>
      			<View style={styles.descriptionParent}>
        				<Text style={[styles.youHaveThe, styles.youHaveTheTypo]}>Description</Text>
        				<Text style={[styles.accordingToYour, styles.outOf10Typo]}>According to your recent lack of vitamin C in your nutrition a common cold is a highly accurate guess. Symptoms such as body aches, blocked nose, sneezing and a general discomfort in the nasal area can also happen.</Text>
        				<Text style={[styles.treatments, styles.youHaveTheTypo]}>Treatments</Text>
        				<View style={styles.treatmentCardParent}>
          					<View style={styles.treatmentCard}>
            						<Text style={[styles.painRelievers, styles.logInTypo]}>Pain Relievers</Text>
            						<Text style={[styles.reduceFeverHeadaches, styles.youHaveTheTypo]}>Reduce fever, headaches, and body aches. Common options are ibuprofen and acetaminophen.</Text>
          					</View>
          					<View style={styles.treatmentCardShadowBox}>
            						<Text style={[styles.painRelievers, styles.logInTypo]}>Hydration</Text>
            						<Text style={[styles.reduceFeverHeadaches, styles.youHaveTheTypo]}>Drink plenty of fluids such as water, herbal tea, and broth to stay hydrated and help thin mucus</Text>
          					</View>
          					<View style={styles.treatmentCardShadowBox}>
            						<Text style={[styles.painRelievers, styles.logInTypo]}>Vitamin C</Text>
            						<Text style={[styles.reduceFeverHeadaches, styles.youHaveTheTypo]}>May slightly reduce the duration and severity of colds. Found in citrus fruits and supplements.</Text>
          					</View>
          					<View style={styles.treatmentCardShadowBox}>
            						<Text style={[styles.painRelievers, styles.logInTypo]}>Avoid Close Contact</Text>
            						<Text style={[styles.reduceFeverHeadaches, styles.youHaveTheTypo]}>Stay away from individuals who are sick to prevent catching the virus yourself or infecting others.</Text>
          					</View>
        				</View>
      			</View>
      			<View style={styles.formButton}>
        				<Text style={[styles.logIn, styles.logInTypo]}>Next Page</Text>
      			</View>
    		</View>);
};

const styles = StyleSheet.create({
  	homePosition: {
    		left: "50%",
    		position: "absolute"
  	},
  	parentFlexBox: {
    		justifyContent: "space-between",
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	iconLayout: {
    		height: 24,
    		width: 24
  	},
  	divPosition: {
    		top: "0%",
    		left: "0%",
    		right: "0%",
    		position: "absolute",
    		width: "100%"
  	},
  	parentPosition: {
    		left: 24,
    		position: "absolute"
  	},
  	commonColdTypo: {
    		textAlign: "left",
    		color: "#121419",
    		lineHeight: 24,
    		letterSpacing: -0.7,
    		fontSize: 24
  	},
  	youHaveTheTypo: {
    		color: "#4b4b4b",
    		fontFamily: "Inter-Regular",
    		letterSpacing: -0.6,
    		fontSize: 14,
    		textAlign: "left"
  	},
  	outOf10Typo: {
    		width: 293,
    		color: "#212121",
    		fontFamily: "Inter-Medium",
    		fontWeight: "500",
    		lineHeight: 18,
    		fontSize: 16,
    		letterSpacing: -0.6,
    		textAlign: "left"
  	},
  	groupIconLayout: {
    		height: 38,
    		width: 21
  	},
  	logInTypo: {
    		fontFamily: "Inter-SemiBold",
    		fontWeight: "600",
    		lineHeight: 18,
    		textAlign: "left"
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
    		justifyContent: "center",
    		position: "absolute",
    		overflow: "hidden"
  	},
  	homeIndicator1: {
    		marginLeft: 69,
    		bottom: 8,
    		borderRadius: 100,
    		backgroundColor: "#000",
    		width: 139,
    		height: 5,
    		transform: [
      			{
        				rotate: "180deg"
      			}
    		]
  	},
  	homeIndicator: {
    		marginLeft: -195,
    		bottom: 0,
    		width: 390,
    		height: 21
  	},
  	fiRrHomeIcon: {
    		overflow: "hidden"
  	},
  	div: {
    		height: "100%",
    		bottom: "0%",
    		paddingHorizontal: 40,
    		paddingVertical: 15,
    		top: "0%",
    		left: "0%",
    		right: "0%",
    		position: "absolute",
    		width: "100%"
  	},
  	navbarChild: {
    		height: "1.85%",
    		bottom: "98.15%",
    		maxWidth: "100%",
    		maxHeight: "100%",
    		overflow: "hidden"
  	},
  	navbar: {
    		top: 769,
    		height: 54,
    		left: "0%",
    		right: "0%",
    		position: "absolute",
    		width: "100%"
  	},
  	symptomChecker: {
    		fontWeight: "800",
    		fontFamily: "Inter-ExtraBold"
  	},
  	symptomCheckerParent: {
    		top: 73,
    		width: 343,
    		justifyContent: "space-between",
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	youHaveThe: {
    		lineHeight: 16,
    		color: "#4b4b4b",
    		alignSelf: "stretch"
  	},
  	commonCold: {
    		fontWeight: "700",
    		fontFamily: "Inter-Bold"
  	},
  	youHaveTheParent: {
    		top: 148,
    		justifyContent: "center",
    		left: 24
  	},
  	likelihood: {
    		top: 206,
    		lineHeight: 16,
    		color: "#4b4b4b",
    		left: 24,
    		position: "absolute"
  	},
  	outOf10: {
    		top: 227,
    		left: 24,
    		position: "absolute"
  	},
  	groupIcon9: {
    		opacity: 0.5
  	},
  	groupParent: {
    		width: "87.44%",
    		top: 281,
    		right: "5.9%",
    		left: "6.67%",
    		position: "absolute"
  	},
  	theResultsOf: {
    		marginLeft: -121,
    		top: 654,
    		color: "#7d7d7d",
    		textAlign: "center",
    		width: 242,
    		fontFamily: "Inter-Regular",
    		letterSpacing: -0.6,
    		fontSize: 14,
    		lineHeight: 16,
    		left: "50%",
    		position: "absolute"
  	},
  	accordingToYour: {
    		marginTop: 11
  	},
  	treatments: {
    		marginTop: 11,
    		lineHeight: 16,
    		color: "#4b4b4b",
    		alignSelf: "stretch"
  	},
  	painRelievers: {
    		color: "#262626",
    		fontSize: 16,
    		fontWeight: "600",
    		letterSpacing: -0.6,
    		alignSelf: "stretch"
  	},
  	reduceFeverHeadaches: {
    		lineHeight: 15,
    		height: 64,
    		marginTop: 6,
    		alignSelf: "stretch"
  	},
  	treatmentCard: {
    		paddingVertical: 12,
    		paddingHorizontal: 14,
    		height: 112,
    		width: 192,
    		borderColor: "#cecece",
    		backgroundColor: "#fff",
    		borderRadius: 5,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		borderWidth: 1,
    		borderStyle: "solid",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	treatmentCardShadowBox: {
    		marginLeft: 12,
    		paddingVertical: 12,
    		paddingHorizontal: 14,
    		height: 112,
    		width: 192,
    		borderWidth: 1,
    		borderColor: "#cecece",
    		borderStyle: "solid",
    		backgroundColor: "#fff",
    		borderRadius: 5,
    		elevation: 20,
    		shadowRadius: 20,
    		shadowColor: "rgba(0, 0, 0, 0.13)",
    		shadowOpacity: 1,
    		shadowOffset: {
      			width: 0,
      			height: 4
    		}
  	},
  	treatmentCardParent: {
    		marginTop: 11,
    		alignSelf: "stretch",
    		flexDirection: "row",
    		alignItems: "center"
  	},
  	descriptionParent: {
    		top: 354,
    		left: 22,
    		width: 806,
    		position: "absolute"
  	},
  	logIn: {
    		fontSize: 18,
    		letterSpacing: 0,
    		color: "#f7f7f7"
  	},
  	formButton: {
    		marginLeft: -63,
    		top: 701,
    		borderRadius: 6,
    		backgroundColor: "#121419",
    		borderColor: "#282f41",
    		paddingHorizontal: 20,
    		paddingVertical: 10,
    		borderWidth: 1,
    		borderStyle: "solid",
    		flexDirection: "row",
    		left: "50%",
    		alignItems: "center",
    		justifyContent: "center",
    		position: "absolute"
  	},
  	chatbotPage: {
    		backgroundColor: "#f7f7f7",
    		flex: 1,
    		height: 844,
    		overflow: "hidden",
    		width: "100%"
  	}
});

export default ChatbotPage;
