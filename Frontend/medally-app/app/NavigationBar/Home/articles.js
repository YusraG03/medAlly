import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';

const articlesData = [
  {
    "id": 1,
    "title": "Bad eating habits: When, what and how often you eat matters.",
    "description": "Let's talk about how your eating habits can affect your health.",
    "url": "https://health.ucdavis.edu/blog/good-food/bad-eating-habits-when-what-and-how-often-you-eat-matters/2023/06"
  },
  {
    "id": 2,
    "title": "4 tips to reduce added sugar in your diet and the health risks if you don’t",
    "description": "In this blog, we offer some information and tips from UC Davis Health registered dietitians to reduce added sugars in your daily eating.",
    "url": "https://health.ucdavis.edu/blog/good-food/4-tips-to-reduce-added-sugar-in-your-diet-and-the-health-risks-if-you-dont/2023/06"
  },
  {
    "id": 3,
    "title": "How Much Sleep Is Too Much Sleep? What to Know About Oversleeping",
    "description": "You may oversleep if you don’t get enough quality sleep at night. But if you’re regularly sleeping too long, it may indicate an underlying health condition.",
    "url": "https://www.healthline.com/health/oversleeping"
  },
  {
    "id": 4,
    "title": "How Many Steps Do People Take Per Day on Average?",
    "description": "As wearable fitness trackers become increasingly popular, more people are taking a closer look at their daily steps. And it seems to be paying off.",
    "url": "https://www.healthline.com/health/average-steps-per-day"
  },
  {
    "id": 5,
    "title": "Eat It or Leave It? A Comprehensive Ingredient Dictionary to Simplify Your Shopping Trip",
    "description": "Somehow, trips to the grocery store have become complicated. Even if you find every ingredient on your list, do you feel confident about what it does or doesn’t do for your body?",
    "url": "https://www.healthline.com/nutrition/eat-it-or-leave-it-a-comprehensive-ingredient-dictionary-to-simplify-your-shopping-trip"
  },
  {
    "id": 6,
    "title": "The 21 Best Snack Ideas If You Have Diabetes",
    "description": "If you have diabetes, choosing nutrient-rich snacks high can help promote fullness without causing your blood sugar to rise too high.",
    "url": "https://www.healthline.com/nutrition/best-snacks-for-diabetes"
  },
  {
    "id": 7,
    "title": "14 Easy Ways to Lower Blood Sugar Levels Naturally",
    "description": "Exercising regularly, managing stress, and eating more foods high in fiber and probiotics may help lower blood sugar levels. However, these lifestyle adjustments do not replace medical treatment for diabetes or other metabolic conditions.",
    "url": "https://www.healthline.com/nutrition/14-ways-to-lower-blood-sugar"
  }
];

const getTodaysArticles = () => {

  return articlesData.slice(0, 4); // Return the first 4 articles 
};

export default function ArticlesScreen() {
  const [dailyArticles, setDailyArticles] = useState([]);

  useEffect(() => {
    setDailyArticles(getTodaysArticles());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Health Articles</Text>
      <ScrollView>
        {dailyArticles.map(article => (
          <TouchableOpacity 
            key={article.id} 
            style={styles.articleBox} 
            onPress={() => Linking.openURL(article.url)}
          >
            <Text style={styles.articleTitle}>{article.title}</Text>
            <Text style={styles.articleDescription}>{article.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  articleBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  articleDescription: {
    fontSize: 16,
  },
});
