import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import colors from '../_assets/colors';
import textStyles from '../_assets/textStyles';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const data = [
  {
    id: 1,
    diseaseName: "Common Cold",
    timeStamp: "21 July 2024, 8:35pm",
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
  },
  {
    id: 2,
    diseaseName: "Flu",
    timeStamp: "15 July 2024, 7:20pm",
    description: "Flu symptoms can include fever, chills, muscle aches, cough, congestion, runny nose, headaches, and fatigue.",
    treatments: [
      {
        title: "Antiviral Drugs",
        description: "These medications can lessen symptoms and shorten the time you are sick by 1 or 2 days."
      },
      {
        title: "Rest",
        description: "Get plenty of sleep and rest to help your body fight the infection."
      },
      {
        title: "Hydration",
        description: "Drink plenty of fluids like water, broth, and electrolyte solutions to stay hydrated."
      }
    ]
  },
  {
    id: 3,
    diseaseName: "Stomach Flu",
    timeStamp: "10 July 2024, 6:45pm",
    description: "Stomach flu (gastroenteritis) involves inflammation of the stomach and intestines, causing diarrhea, vomiting, stomach cramps, and nausea.",
    treatments: [
      {
        title: "Oral Rehydration Solutions",
        description: "Replenish lost fluids and electrolytes to prevent dehydration."
      },
      {
        title: "Rest",
        description: "Get plenty of rest to help your body recover."
      },
      {
        title: "Avoid Solid Foods",
        description: "Stick to clear fluids until vomiting subsides, then gradually reintroduce bland foods."
      }
    ]
  },
  {
    id: 4,
    diseaseName: "Migraine",
    timeStamp: "18 July 2024, 9:00pm",
    description: "Migraines are severe headaches often accompanied by nausea, vomiting, and sensitivity to light and sound.",
    treatments: [
      {
        title: "Pain Relievers",
        description: "Over-the-counter medications like ibuprofen or aspirin can relieve migraine pain."
      },
      {
        title: "Rest in a Dark Room",
        description: "Find a quiet, dark room to reduce migraine symptoms."
      },
      {
        title: "Hydration",
        description: "Drink water to stay hydrated and help reduce migraine frequency."
      }
    ]
  },
  {
    id: 5,
    diseaseName: "Allergic Rhinitis",
    timeStamp: "20 July 2024, 5:30pm",
    description: "Allergic rhinitis is an allergic reaction causing sneezing, itching, nasal congestion, and runny nose.",
    treatments: [
      {
        title: "Antihistamines",
        description: "Medications that help relieve allergy symptoms by blocking histamine."
      },
      {
        title: "Nasal Sprays",
        description: "Steroid nasal sprays can reduce inflammation and congestion."
      },
      {
        title: "Avoid Allergens",
        description: "Identify and avoid triggers such as pollen, dust, or pet dander."
      }
    ]
  },
  {
    id: 6,
    diseaseName: "Sinusitis",
    timeStamp: "22 July 2024, 4:00pm",
    description: "Sinusitis is an inflammation or infection of the sinus cavities that leads to facial pain, nasal congestion, and mucus discharge.",
    treatments: [
      {
        title: "Nasal Decongestants",
        description: "Help reduce nasal congestion and improve airflow."
      },
      {
        title: "Steam Inhalation",
        description: "Inhaling steam can help loosen mucus and reduce sinus pressure."
      },
      {
        title: "Saline Nasal Irrigation",
        description: "Flush out mucus and allergens from the nasal passages."
      }
    ]
  },
  {
    id: 7,
    diseaseName: "Ear Infection",
    timeStamp: "25 July 2024, 3:15pm",
    description: "Ear infections can cause ear pain, fever, and fluid drainage. Common in children but can affect adults too.",
    treatments: [
      {
        title: "Antibiotics",
        description: "Prescribed if the ear infection is bacterial."
      },
      {
        title: "Pain Relievers",
        description: "Medications like acetaminophen can relieve ear pain."
      },
      {
        title: "Warm Compress",
        description: "Applying a warm compress to the affected ear can help alleviate pain."
      }
    ]
  },
  {
    id: 8,
    diseaseName: "Back Pain",
    timeStamp: "28 July 2024, 10:00am",
    description: "Back pain can arise from muscle strain, poor posture, or injury, causing discomfort in the lower or upper back.",
    treatments: [
      {
        title: "Rest",
        description: "Avoid activities that worsen the pain and get adequate rest."
      },
      {
        title: "Heat Therapy",
        description: "Applying heat to the affected area can relax muscles and reduce pain."
      },
      {
        title: "Stretching and Exercise",
        description: "Gentle stretching and strengthening exercises can improve flexibility and reduce pain."
      }
    ]
  },
  {
    id: 9,
    diseaseName: "Constipation",
    timeStamp: "29 July 2024, 11:30am",
    description: "Constipation is characterized by infrequent bowel movements, hard stools, and difficulty passing stools.",
    treatments: [
      {
        title: "Fiber-Rich Diet",
        description: "Increase intake of fiber through fruits, vegetables, and whole grains."
      },
      {
        title: "Hydration",
        description: "Drink plenty of water to help soften stools."
      },
      {
        title: "Laxatives",
        description: "Over-the-counter laxatives can help stimulate bowel movements."
      }
    ]
  },
  {
    id: 10,
    diseaseName: "Acid Reflux",
    timeStamp: "30 July 2024, 12:00pm",
    description: "Acid reflux occurs when stomach acid backs up into the esophagus, causing heartburn, regurgitation, and discomfort.",
    treatments: [
      {
        title: "Antacids",
        description: "Over-the-counter medications that neutralize stomach acid."
      },
      {
        title: "Avoid Trigger Foods",
        description: "Steer clear of spicy, fatty, or acidic foods that can worsen symptoms."
      },
      {
        title: "Elevate Head While Sleeping",
        description: "Raising the head of your bed can prevent acid from flowing back into the esophagus."
      }
    ]
  },
  {
    id: 11,
    diseaseName: "Psoriasis",
    timeStamp: "01 August 2024, 2:00pm",
    description: "Psoriasis is a chronic skin condition that causes red, scaly patches to form on the skin, often on the elbows, knees, and scalp.",
    treatments: [
      {
        title: "Topical Treatments",
        description: "Apply corticosteroids or other prescribed creams to reduce inflammation and scaling."
      },
      {
        title: "Moisturizers",
        description: "Regular use of moisturizers can help alleviate dryness and scaling."
      },
      {
        title: "Phototherapy",
        description: "Exposure to ultraviolet light can reduce symptoms in moderate to severe cases."
      }
    ]
  },
  {
    id: 12,
    diseaseName: "Gastritis",
    timeStamp: "03 August 2024, 1:00pm",
    description: "Gastritis is inflammation of the stomach lining, causing pain, nausea, and indigestion.",
    treatments: [
      {
        title: "Antacids",
        description: "Medications that neutralize stomach acid and provide relief from pain."
      },
      {
        title: "Avoid Irritants",
        description: "Reduce intake of spicy foods, alcohol, and NSAIDs that can irritate the stomach lining."
      },
      {
        title: "Dietary Changes",
        description: "Eat smaller, more frequent meals and avoid heavy or fatty foods."
      }
    ]
  }
];


export function HistoryScreen() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCards((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.screenTitle}>Disease History</Text>
      <ScrollView style = {styles.cards}>
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
              source={expandedCards[item.id] ? require('../_assets/chevron-up.png') : require('../_assets/chevron-down.png')}
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

export default HistoryScreen;
