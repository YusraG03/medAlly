import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export function HistoryScreen() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Disease History</Text>
      <View style={styles.Card}>
        <TouchableOpacity onPress={toggleExpand} style={[styles.upperInfo, styles.upperInfoFlexBox]}>
          <View style={styles.diseaseTime}>
            <Text style={styles.diseaseName}>Common Cold</Text>
            <Text style={styles.timeStamp}>21 July 2024, 8:35pm</Text>
          </View>
          <Image
            style={styles.chevronDownIcon}
            resizeMode="cover"
            source={expanded ? require('../_assets/chevron-up.png') : require('../_assets/chevron-down.png')}
          />
        </TouchableOpacity>
        
        {expanded && (
          <View style={styles.expandedInformation}>
            <View style={styles.section}>
              <Text style={textStyles.smallParagraphTitle}>Description</Text>
              <Text style={[styles.descriptionText, styles.painRelieversTypo]}>
                According to your recent lack of vitamin C in your nutrition a common cold is a highly accurate guess. Symptoms such as body aches, blocked nose, sneezing and a general discomfort in the nasal area can also happen.
              </Text>
            </View>
            
            <View style={styles.section}>
              <Text style={textStyles.smallParagraphTitle}>Treatments</Text>
              <ScrollView horizontal={true} style={styles.treatmentCarousel} showsHorizontalScrollIndicator={false}>
                <View style={styles.treatmentCard}>
                  <Text style={[styles.painRelievers, styles.painRelieversTypo]}>Pain Relievers</Text>
                  <Text style={[styles.reduceFeverHeadaches, styles.treatmentsTypo]}>
                    Reduce fever, headaches, and body aches. Common options are ibuprofen and acetaminophen.
                  </Text>
                </View>
                <View style={styles.treatmentCard}>
                  <Text style={[styles.painRelievers, styles.painRelieversTypo]}>Hydration</Text>
                  <Text style={[styles.reduceFeverHeadaches, styles.treatmentsTypo]}>
                    Drink plenty of fluids such as water, herbal tea, and broth to stay hydrated and help thin mucus.
                  </Text>
                </View>
                <View style={styles.treatmentCard}>
                  <Text style={[styles.painRelievers, styles.painRelieversTypo]}>Vitamin C</Text>
                  <Text style={[styles.reduceFeverHeadaches, styles.treatmentsTypo]}>
                    May slightly reduce the duration and severity of colds. Found in citrus fruits and supplements.
                  </Text>
                </View>
                <View style={styles.treatmentCard}>
                  <Text style={[styles.painRelievers, styles.painRelieversTypo]}>Avoid Close Contact</Text>
                  <Text style={[styles.reduceFeverHeadaches, styles.treatmentsTypo]}>
                    Stay away from individuals who are sick to prevent catching the virus yourself or infecting others.
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.defaultwhite,
    padding: 16,
    marginTop: '2%',
    gap: '2%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 16,
  },
  section: {
    flexDirection: 'column',
    gap: 10,
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
  painRelieversTypo: {
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
    gap: 11,
  },
});

export default HistoryScreen;
