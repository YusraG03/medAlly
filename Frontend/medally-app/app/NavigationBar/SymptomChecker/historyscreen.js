import React, { useState, useEffect } from 'react'; // Added useEffect import
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import colors from '../../_assets/colors.js';
import textStyles from '../../_assets/textStyles.js';
import APIEndpoint from '../../API';
import { storeUserId, getUserId, removeUserId } from '../userStorage';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const api = new APIEndpoint();
const getUserId = new getuserID(); // Make sure to use the correct method to get user ID


export function HistoryScreen() {
  const [expandedCards, setExpandedCards] = useState({});
  const [userID, setUserID] = useState(null); // State to hold the userID
  const [articles, setArticles] = useState([]); // State to hold articles

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  useEffect(() => {
    const initializeUserID = async () => {
      const id = await getUserId(); 
      setUserID(id);
    };

    initializeUserID();
  }, []);

  useEffect(() => {
    if (!userID) return; 

    const getUserDiagnosis = async () => {
      try {
        const getDiagnosis = await api.getUserDiagnosis(); 
        getDiagnosis(getDiagnosis || []);
      } catch (error) {
        console.error('Error getting diagnosis:', error);
        getUserDiagnosis([]); 
      }
    };

    getUserDiagnosis(); // Call the function to fetch user diagnosis
  }, [userID]);

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Disease History</Text>
      <ScrollView style={styles.cards}>
        {data.map((item) => (
          <View key={item.id} style={styles.Card}>
            <TouchableOpacity onPress={() => toggleExpand(item.id)} style={[styles.upperInfo, styles.upperInfoFlexBox]}>
              <View style={styles.diseaseTime}>
                <Text style={styles.diseaseName}>{item.diseaseName}</Text>
                <Text style={styles.timeStamp}>{item.timeStamp}</Text>
              </View>
              <Image
                style={styles.chevronDownIcon}
                resizeMode="cover"
                source={expandedCards[item.id] ? require('../../_assets/chevron-up.png') : require('../../_assets/chevron-down.png')}
              />
            </TouchableOpacity>
            
            {expandedCards[item.id] && (
              <View style={styles.expandedInformation}>
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Description</Text>
                  <Text style={[styles.descriptionText, styles.treatmentTitleTypo]}>
                    {item.description}
                  </Text>
                </View>
                
                <View style={styles.section}>
                  <Text style={textStyles.smallParagraphTitle}>Treatments</Text>
                  <ScrollView horizontal={true} style={styles.treatmentCarousel} showsHorizontalScrollIndicator={false}>
                    {item.treatments.map((treatment, index) => (
                      <View key={index} style={styles.treatmentCard}>
                        <Text style={[styles.treatmentTitle, styles.treatmentTitleTypo]}>{treatment.title}</Text>
                        <Text style={[styles.treatmentDesc, styles.treatmentsTypo]}>
                          {treatment.description}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  section: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  cards: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 16,
  },
  treatmentSection: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  upperInfoFlexBox: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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
  treatmentTitleTypo: {
    color: '#262626',
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: -0.6,
    fontSize: 16,
  },
  diseaseName: {
    color: '#212121',
    textAlign: 'left',
    lineHeight: 18,
    letterSpacing: -0.6,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
    alignSelf: 'stretch',
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
  expandedInformation: {
    width: '100%',
    marginBottom: 10,
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
    marginBottom: 10,
  },
});

export default HistoryScreen;
