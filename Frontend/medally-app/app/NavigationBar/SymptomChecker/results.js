import React, { useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import colors from '../../_assets/colors';
import textStyles from '../../_assets/textStyles';
import { useLocalSearchParams } from 'expo-router';
import APIEndpoint from '../../API';

export function ResultScreen() {
  const params = useLocalSearchParams();

  // Parse the received data
  const data = {
    likelihood: params.likelihood || "0",
    disease: params.disease || "No disease information",
    description: params.description || "No description available",
    treatments: params.treatments ? JSON.parse(params.treatments) : [],
    additional_advice: params.additional_advice || ""
  };

  // Convert treatments to the desired format
  const formattedTreatments = data.treatments.map(treatment => ({
    title: treatment.treatment,
    description: treatment.treat_description
  }));

  // Function to add user diagnosis
  const addDiagnosis = async () => {
    try {
      const API = new APIEndpoint();
      const payload = {
        ...data,
        treatments: formattedTreatments
      };
      const response = await API.addUserDiagnosis(payload, 'KcLR8zOoexJp8N2Qrvz2');

      // Log the response to check if the object was successfully pushed
      console.log('Payload to API:', payload);
      console.log('Diagnosis added successfully:', response);
    } catch (error) {
      console.error('Failed to add diagnosis:', error);
    }
  };

  // Call the API function when the component mounts
  useEffect(() => {
    addDiagnosis();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Symptom Checker</Text>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>You may have</Text>
          <Text style={styles.diseaseName}>{data.disease}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Likelihood</Text>
          <Text style={styles.boldContent}>
            {data.likelihood} out of 10
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Description</Text>
          <Text style={styles.boldContent}>{data.description}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={textStyles.smallParagraphTitle}>Treatments</Text>
          {formattedTreatments.map((treatment, index) => (
            <View key={index} style={styles.treatmentCard}>
              <Text style={styles.treatmentTitle}>{treatment.title}</Text>
              <Text style={styles.treatmentDescription}>{treatment.description}</Text>
            </View>
          ))}
        </View>

        {data.additional_advice && (
          <View style={styles.section}>
            <Text style={textStyles.smallParagraphTitle}>Additional Advice</Text>
            <Text style={styles.boldContent}>{data.additional_advice}</Text>
          </View>
        )}
        
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
  content: {
    flexDirection: 'column',
  },
  section: {
    flexDirection: 'column',
    gap: 2,
    marginBottom: '5%',
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
  boldContent: {
    fontSize: 16,
    letterSpacing: -0.6,
    lineHeight: 18,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
    color: '#212121',
    textAlign: "left",
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
});

export default ResultScreen;
