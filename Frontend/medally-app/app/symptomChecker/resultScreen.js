import React from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';

const data = {
  diseaseName: "Common Cold",
  timeStamp: "21 July 2024, 8:35pm",
  likelihood: "9 out of 10",
  description: "According to your recent lack of vitamin C in your nutrition, a common cold is a highly accurate guess. Symptoms such as body aches, blocked nose, sneezing, and a general discomfort in the nasal area can also happen.",
  treatments: [
    {
      title: "Pain Relievers",
      description: "Reduce fever, headaches, and body aches. Common options are ibuprofen and acetaminophen."
    },
    {
      title: "Hydration",
      description: "Drink plenty of fluids such as water, herbal tea, and broth to stay hydrated and help thin mucus."
    },
    {
      title: "Vitamin C",
      description: "May slightly reduce the duration and severity of colds. Found in citrus fruits and supplements."
    },
    {
      title: "Avoid Close Contact",
      description: "Stay away from individuals who are sick to prevent catching the virus yourself or infecting others."
    }
  ]
};

export function ResultScreen() {
  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Symptom Checker</Text>
      <ScrollView style={styles.content}>
        <View style={styles.resultSection}>
          <Text style={styles.youHaveThe}>You have the</Text>
          <Text style={styles.diseaseName}>{data.diseaseName}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Likelihood</Text>
          <Text style={styles.likelihoodText}>
            {data.likelihood} people with these symptoms were experiencing the same disease.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Description</Text>
          <Text style={styles.descriptionText}>{data.description}</Text>
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
	},
	content: {
	  flex: 1,
	},
	resultSection: {
	  marginBottom: 20,
	},
	youHaveThe: {
	  ...textStyles.smallParagraphTitle,
	  color: colors.secondary,
	},
	diseaseName: {
	  ...textStyles.screenTitle,
	  color: colors.primary,
	},
	section: {
	  marginBottom: 20,
	},
	likelihoodText: {
	  ...textStyles.bodyText,
	  color: colors.primary,
	},
	descriptionText: {
	  ...textStyles.bodyText,
	  color: colors.secondary,
	},
	treatmentCarousel: {
	  flexDirection: 'row',
	},
	treatmentCard: {
	  marginRight: 12,
	  paddingVertical: 12,
	  paddingHorizontal: 14,
	  height: 112,
	  width: 192,
	  borderRadius: 5,
	  borderWidth: 1,
	  borderColor: '#cecece',
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
	treatmentTitle: {
	  ...textStyles.smallParagraphTitle,
	  color: colors.primary,
	  marginBottom: 6,
	},
	treatmentDescription: {
	  ...textStyles.bodyText,
	  color: colors.secondary,
	},
	historyNote: {
	  ...textStyles.bodyText,
	  color: colors.tertiary,
	  textAlign: 'center',
	  marginVertical: 20,
	},
	nextButton: {
	  backgroundColor: colors.primary,
	  padding: 15,
	  borderRadius: 6,
	  alignItems: 'center',
	  marginBottom: 20,
	},
	nextButtonText: {
	  ...textStyles.buttonText,
	  color: colors.defaultwhite,
	},
  });

export default ResultScreen;