import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'NutritionPlan'>;

export default function NutritionPlanScreen({ navigation, route }: Props) {
  const { nutrition } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>NUTRITION PLAN</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Daily Calories */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Daily Calorie Target</Text>
          <View style={styles.calorieBox}>
            <Text style={styles.calorieNumber}>{nutrition.dailyCalories}</Text>
            <Text style={styles.calorieLabel}>calories/day</Text>
          </View>
        </View>

        {/* Macros */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Macronutrient Breakdown</Text>
          <View style={styles.macrosContainer}>
            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: '#ef4444' }]}>
                <Text style={styles.macroValue}>{nutrition.macros.protein}g</Text>
              </View>
              <Text style={styles.macroLabel}>Protein</Text>
              <Text style={styles.macroPercentage}>
                {Math.round((nutrition.macros.protein * 4 / nutrition.dailyCalories) * 100)}%
              </Text>
            </View>

            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: '#3b82f6' }]}>
                <Text style={styles.macroValue}>{nutrition.macros.carbs}g</Text>
              </View>
              <Text style={styles.macroLabel}>Carbs</Text>
              <Text style={styles.macroPercentage}>
                {Math.round((nutrition.macros.carbs * 4 / nutrition.dailyCalories) * 100)}%
              </Text>
            </View>

            <View style={styles.macroItem}>
              <View style={[styles.macroCircle, { backgroundColor: '#f59e0b' }]}>
                <Text style={styles.macroValue}>{nutrition.macros.fats}g</Text>
              </View>
              <Text style={styles.macroLabel}>Fats</Text>
              <Text style={styles.macroPercentage}>
                {Math.round((nutrition.macros.fats * 9 / nutrition.dailyCalories) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Meal Plan */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Suggested Meal Plan</Text>
          {nutrition.meals.map((meal: string, index: number) => (
            <View key={index} style={styles.mealItem}>
              <View style={styles.mealNumber}>
                <Text style={styles.mealNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.mealText}>{meal}</Text>
            </View>
          ))}
        </View>

        {/* Hydration */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💧 Daily Hydration</Text>
          <Text style={styles.hydrationText}>
            Drink at least <Text style={styles.boldText}>8-10 glasses</Text> of water daily
          </Text>
          <Text style={styles.hydrationSubtext}>
            (Approximately 2-3 liters)
          </Text>
        </View>

        {/* Tips */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📝 Nutrition Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>Eat within 30 minutes after workout</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>Include protein in every meal</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>Avoid processed foods and sugar</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>Eat 5-6 small meals throughout the day</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.tipText}>Get adequate sleep for recovery</Text>
          </View>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#14b8a6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  calorieBox: {
    alignItems: 'center',
    backgroundColor: '#14b8a6',
    borderRadius: 12,
    padding: 24,
  },
  calorieNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  calorieLabel: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  macroItem: {
    alignItems: 'center',
  },
  macroCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  macroLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  macroPercentage: {
    fontSize: 12,
    color: '#9ca3af',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
  },
  mealNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#14b8a6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  mealNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  mealText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  hydrationText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#14b8a6',
  },
  hydrationSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    color: '#14b8a6',
    marginRight: 10,
    lineHeight: 22,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});
