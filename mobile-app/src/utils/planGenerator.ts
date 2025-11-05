import { WorkoutPlan, NutritionPlan } from '../types';

export const planGenerator = {
  workout: {
    "lose-weight-beginner": {
      name: "Fat Burn Starter",
      duration: "30 min",
      exercises: [
        { name: "Warm-up Walk", sets: "1", reps: "5 min" },
        { name: "Bodyweight Squats", sets: "3", reps: "10" },
        { name: "Modified Push-ups", sets: "3", reps: "8" },
        { name: "Plank Hold", sets: "3", reps: "20 sec" },
        { name: "Walking Lunges", sets: "3", reps: "10 each" }
      ]
    },
    "lose-weight-intermediate": {
      name: "Cardio Power",
      duration: "45 min",
      exercises: [
        { name: "Jump Rope", sets: "3", reps: "2 min" },
        { name: "Burpees", sets: "4", reps: "12" },
        { name: "Mountain Climbers", sets: "4", reps: "20" },
        { name: "High Knees", sets: "3", reps: "1 min" },
        { name: "Cool-down Stretch", sets: "1", reps: "5 min" }
      ]
    },
    "build-muscle-beginner": {
      name: "Strength Foundation",
      duration: "40 min",
      exercises: [
        { name: "Goblet Squats", sets: "4", reps: "12" },
        { name: "Dumbbell Press", sets: "4", reps: "10" },
        { name: "Bent-over Rows", sets: "4", reps: "10" },
        { name: "Shoulder Press", sets: "3", reps: "10" },
        { name: "Bicep Curls", sets: "3", reps: "12" }
      ]
    },
    "build-muscle-intermediate": {
      name: "Muscle Builder Pro",
      duration: "60 min",
      exercises: [
        { name: "Barbell Squats", sets: "5", reps: "8" },
        { name: "Bench Press", sets: "5", reps: "8" },
        { name: "Deadlifts", sets: "4", reps: "6" },
        { name: "Pull-ups", sets: "4", reps: "8" },
        { name: "Dips", sets: "3", reps: "10" }
      ]
    },
    "stay-active-beginner": {
      name: "Daily Wellness",
      duration: "25 min",
      exercises: [
        { name: "Brisk Walking", sets: "1", reps: "10 min" },
        { name: "Bodyweight Squats", sets: "2", reps: "12" },
        { name: "Wall Push-ups", sets: "2", reps: "10" },
        { name: "Yoga Stretches", sets: "1", reps: "5 min" }
      ]
    }
  } as Record<string, WorkoutPlan>,
  
  nutrition: {
    "lose-weight": {
      dailyCalories: 1800,
      macros: {
        protein: 120,
        carbs: 180,
        fats: 50
      },
      meals: [
        "Breakfast: Oatmeal with berries and almond butter",
        "Snack: Greek yogurt with honey",
        "Lunch: Grilled chicken salad with olive oil",
        "Snack: Apple with peanut butter",
        "Dinner: Baked fish with steamed broccoli and quinoa"
      ]
    },
    "lose-weight-indian": {
      dailyCalories: 1800,
      macros: {
        protein: 120,
        carbs: 180,
        fats: 50
      },
      meals: [
        "Breakfast: Moong Dal Cheela (protein-rich lentil pancake) with mint chutney",
        "Snack: Mixed sprouts bhel with lemon and chaat masala",
        "Lunch: Grilled tandoori paneer with mixed vegetable salad",
        "Snack: Roasted makhana (foxnuts) with masala chaas",
        "Dinner: Masoor dal with methi (fenugreek) roti and stir-fried vegetables"
      ]
    },
    "build-muscle": {
      dailyCalories: 2400,
      macros: {
        protein: 180,
        carbs: 250,
        fats: 70
      },
      meals: [
        "Breakfast: Scrambled eggs with whole wheat toast and avocado",
        "Snack: Protein shake with banana",
        "Lunch: Lean beef with brown rice and mixed vegetables",
        "Snack: Cottage cheese with almonds",
        "Dinner: Grilled salmon with sweet potato and asparagus"
      ]
    },
    "build-muscle-indian": {
      dailyCalories: 2400,
      macros: {
        protein: 180,
        carbs: 250,
        fats: 70
      },
      meals: [
        "Breakfast: Paneer bhurji (scrambled paneer) with multigrain paratha and chana",
        "Morning Snack: Protein lassi with mixed nuts and banana",
        "Lunch: Chicken tikka with jeera rice and dal makhani",
        "Evening Snack: Mixed dal and nuts ladoo with masala milk",
        "Dinner: Egg curry with brown rice and palak (spinach)",
        "Night Snack: Toned milk with protein powder and turmeric"
      ]
    },
    "stay-active": {
      dailyCalories: 2200,
      macros: {
        protein: 140,
        carbs: 200,
        fats: 60
      },
      meals: [
        "Breakfast: Protein-boosted smoothie bowl (with Greek yogurt base & protein powder) and granola",
        "Morning Snack: Mixed nuts and dried fruits with hard-boiled egg whites",
        "Lunch: Turkey sandwich (extra portions) with Greek yogurt-based chicken salad",
        "Afternoon Snack: Cottage cheese or Skyr with veggie sticks",
        "Dinner: Chicken stir-fry (increased portion) with quinoa and vegetables",
        "Night Snack: Casein protein pudding or cottage cheese (for overnight recovery)"
      ]
    },
    "stay-active-indian": {
      dailyCalories: 2200,
      macros: {
        protein: 140,
        carbs: 200,
        fats: 60
      },
      meals: [
        "Breakfast: Paneer Besan Chilla with mint chutney (high-protein chickpea pancake)",
        "Morning Snack: Spiced roasted chana (chickpeas) with almonds and mixed seeds",
        "Lunch: Mixed Dal Khichdi with extra moong dal and vegetables",
        "Afternoon Snack: Masala chaas (spiced buttermilk) with makhana (foxnuts)",
        "Dinner: Soya chunks curry with multigrain roti and palak (spinach)",
        "Night Snack: Turmeric milk with protein powder or overnight soaked almonds"
      ]
    }
  } as Record<string, NutritionPlan>
};

export const knowledgeBase = {
  nutrition_substitutes: {
    broccoli: "palak (spinach), methi (fenugreek), green beans, or gobhi (cauliflower)",
    chicken: "paneer, tofu, fish, soya chunks, or legumes",
    rice: "quinoa, daliya (broken wheat), ragi, or cauliflower rice",
    milk: "toned milk, chaas (buttermilk), lassi, or soy milk",
    protein: "whey protein, paneer, chana (chickpeas), moong dal, or masoor dal",
    yogurt: "dahi (curd), chaas (buttermilk), lassi, or paneer",
    indian_protein: "dal (lentils), rajma (kidney beans), chole (chickpeas), sprouts, or soya chunks",
    indian_breakfast: "besan chilla, moong dal cheela, paneer bhurji, or masala oats",
    indian_snacks: "roasted chana, makhana (foxnuts), mixed sprouts chat, or paneer tikka"
  },
  exercise_alternatives: {
    squats: "lunges, leg press, or step-ups",
    "push-ups": "chest press, wall push-ups, or incline push-ups",
    running: "cycling, swimming, or brisk walking",
    "pull-ups": "lat pulldown, assisted pull-ups, or resistance band rows"
  },
  safety_warnings: [
    "⚠️ IMPORTANT: If you feel sharp pain, stop immediately.",
    "⚠️ Chest pain requires immediate medical attention.",
    "⚠️ Our app provides fitness guidance, not medical advice.",
    "⚠️ Consult a doctor before starting any new exercise program."
  ]
};

export const generateRAGResponse = (userQuery: string) => {
  const query = userQuery.toLowerCase();
  
  // Check for safety concerns first
  if (query.includes('pain') || query.includes('hurt') || query.includes('injury')) {
    return {
      text: "⚠️ IMPORTANT: If you're experiencing pain, please stop exercising immediately and consult with a healthcare professional. Our app provides fitness guidance, not medical advice. Your safety is the top priority!",
      verified: true
    };
  }
  
  // Check for nutrition substitutes
  for (const [food, substitutes] of Object.entries(knowledgeBase.nutrition_substitutes)) {
    if (query.includes(food)) {
      return {
        text: `Based on our nutrition guide, great substitutes for ${food} include: ${substitutes}. These alternatives provide similar nutritional benefits!`,
        verified: true
      };
    }
  }
  
  // Check for exercise alternatives
  for (const [exercise, alternatives] of Object.entries(knowledgeBase.exercise_alternatives)) {
    if (query.includes(exercise)) {
      return {
        text: `Good alternatives for ${exercise} include: ${alternatives}. These exercises target similar muscle groups and can be adjusted to your fitness level.`,
        verified: true
      };
    }
  }
  
  // General fitness queries
  if (query.includes('water') || query.includes('hydrat')) {
    return {
      text: "Aim for 8-10 glasses of water daily, more if you're exercising intensely. Proper hydration improves performance and recovery!",
      verified: true
    };
  }
  
  if (query.includes('rest') || query.includes('recovery')) {
    return {
      text: "Rest days are crucial! Your muscles grow during recovery, not during workouts. Aim for at least 1-2 rest days per week, and get 7-9 hours of sleep nightly.",
      verified: true
    };
  }
  
  // Default helpful response
  return {
    text: "That's a great question! For specific medical or dietary concerns, please consult with a qualified healthcare professional. I can help with general fitness guidance, exercise alternatives, and nutrition substitutions. What would you like to know?",
    verified: true
  };
};
