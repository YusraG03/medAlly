import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../_assets/colors';
import textStyles from '../../_assets/textStyles';
import { useLocalSearchParams } from 'expo-router';



export function ResultScreen() {
	const params = useLocalSearchParams();
  
// Use the received data instead of the hardcoded data
const data = {
  disease: params.disease || "No disease information",
  timeStamp: new Date().toLocaleString(), // You may want to pass this from the ChatScreen
  likelihood: params.likelihood || "0",
  description: params.description || "No description available",
  treatments: params.treatments ? JSON.parse(params.treatments) : []
};

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Symptom Checker</Text>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>You have the</Text>
          <Text style={styles.diseaseName}>{data.disease}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Likelihood</Text>
          <Text style={styles.boldContent}>
            {data.likelihood} out of 10 people with these symptoms were experiencing the same disease.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Description</Text>
          <Text style={styles.boldContent}>{data.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Treatments</Text>
          <ScrollView horizontal={true} style={styles.treatmentCarousel} showsHorizontalScrollIndicator={false}>
            {data.treatments.map((treatment, index) => (
              <View key={index} style={styles.treatmentCard}>
                <Text style={styles.treatmentTitle}>{treatment.title}</Text>
                <Text style={styles.treatmentDescription}>{treatment.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        
        <Text style={styles.historyNote}>
          The results of this session will be available in the history section.
        </Text>
      </ScrollView>
      
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: colors.defaultwhite,
	  padding: 16,
	  marginTop: '2%',
	  gap: '3%',
	},
	title: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  color: colors.primary,
	  marginBottom: 16,
	},
	section: {
	  flexDirection: 'column',
	  gap: 2,
	  marginBottom: '5%'
	},
	cards:{
	  flexDirection : 'column',
	  gap: 10
	},
	placeholder: {
	  fontSize: 16,
	  color: colors.secondary,
	  marginBottom: 16,
	},
	treatmentSection: {
	  flexDirection: 'column',
	  gap: 10,
	},
	upperInfoFlexBox: {
	  alignItems: 'center',
	  flexDirection: 'row',
	},
	treatmentsTypo: {
	  color: '#4b4b4b',
	  fontFamily: 'Inter-Regular',
	  fontSize: 14,
	  textAlign: 'left',
	  letterSpacing: -0.6,
	  alignSelf: 'stretch',
	},
	treatmentCarousel: {
	  flexDirection: 'row',
	},
	content:{
		flexDirection:'column'
	},
	painRelieversTypo: {
	  color: '#262626',
	  textAlign: 'left',
	  lineHeight: 18,
	  letterSpacing: -0.6,
	  fontSize: 16,
	},
	historyNote:{
		textAlign : 'center',
		width: '80%'
	},
	diseaseName: {
		fontSize: 24,
		letterSpacing: -0.7,
		lineHeight: 24,
		fontWeight: "800",
		fontFamily: "Inter-ExtraBold",
		color: '#121419',
		textAlign: "left"
	},
	timeStamp: {
	  color: '#7d7d7d',
	  marginTop: 3,
	  fontFamily: 'Inter-Regular',
	  fontSize: 14,
	  lineHeight: 15,
	  textAlign: 'left',
	  letterSpacing: -0.6,
	  alignSelf: 'stretch',
	},
	diseaseTime: {
	  width: 164,
	},
	chevronDownIcon: {
	  width: 24,
	  height: 24,
	},
	upperInfo: {
	  width: '100%',
	  justifyContent: 'space-between',
	},
	description: {
	  lineHeight: 16,
	  color: '#4b4b4b',
	},
	descriptionText: {
	  fontWeight: '500',
	  fontFamily: 'Inter-Medium',
	},
	treatments: {
	  marginTop: 11,
	  lineHeight: 16,
	  color: '#4b4b4b',
	},
	treatmentTitle: {
		fontFamily: 'Inter-SemiBold',
		fontWeight: '600',
		color: '#262626',
		alignSelf: 'stretch',
	  },
	  treatmentDesc: {
		height: 64,
		marginTop: 6,
		color: '#4b4b4b',
		lineHeight: 15,
	  },
	painRelievers: {
	  fontFamily: 'Inter-SemiBold',
	  fontWeight: '600',
	  color: '#262626',
	  alignSelf: 'stretch',
	},
	reduceFeverHeadaches: {
	  height: 64,
	  marginTop: 6,
	  color: '#4b4b4b',
	  lineHeight: 15,
	},
	treatmentCard: {
	  marginLeft: 12,
	  paddingVertical: 12,
	  paddingHorizontal: 14,
	  height: 112,
	  width: 192,
	  borderRadius: 5,
	  borderWidth: 1,
	  borderColor: '#cecece',
	  borderStyle: 'solid',
	  backgroundColor: '#fff',
	  shadowOpacity: 0.5,
	  elevation: 20,
	  shadowRadius: 2,
	  shadowOffset: {
		width: 1,
		height: 1,
	  },
	  shadowColor: 'rgba(0, 0, 0, 0.13)',
	},
	boldContent:{
	fontSize: 16,
	letterSpacing: -0.6,
	lineHeight: 18,
	fontWeight: "500",
	fontFamily: "Inter-Medium",
	color: '#212121',
	textAlign: "left",
	},
	expandedInformation: {
	  width: '100%',
	  gap: 10,
	},
	Card: {
	  borderRadius: 10,
	  overflow: 'hidden',
	  padding: 20,
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
	  flexDirection: 'column',
	  gap: 10,
	  marginBottom : 10
	},
  });
  
export default ResultScreen;