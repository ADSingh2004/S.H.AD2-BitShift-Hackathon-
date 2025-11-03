import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Card, Button, Avatar, ProgressBar } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

type Page = 'onboarding' | 'home' | 'coach' | 'progress' | 'community' | 'profile' | 'plan';
type OnboardingStep = 1 | 2 | 3 | 4;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(1);
  
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState('');
  const [minutesPerSession, setMinutesPerSession] = useState('');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m FitGenie, your AI fitness coach. Ask me anything about fitness, nutrition, or wellness!',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const [streak, setStreak] = useState(7);
  const [caloriesBurned, setCaloriesBurned] = useState(450);
  const [workoutsCompleted, setWorkoutsCompleted] = useState(15);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: chatInput,
      sender: 'user',
      timestamp: new Date(),
    };
    
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: getMockAIResponse(chatInput),
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage, aiResponse]);
    setChatInput('');
  };

  const getMockAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('broccoli') || lowerInput.includes('substitute')) {
      return 'Try spinach, asparagus, or green beans — they\'re nutrient-dense alternatives!\\n\\n✓ Safe Info • Verified Source';
    } else if (lowerInput.includes('workout') || lowerInput.includes('exercise')) {
      return 'Based on your profile, I recommend 3-4 strength training sessions per week with cardio. Would you like a detailed plan?\\n\\n✓ Safe Info • Verified Source';
    } else if (lowerInput.includes('calorie') || lowerInput.includes('diet')) {
      return 'Your recommended daily intake is around 2000-2200 calories based on your goals. Focus on lean proteins, complex carbs, and healthy fats!\\n\\n✓ Safe Info • Verified Source';
    }
    return 'That\'s a great question! I\'m here to help you with personalized fitness advice. Could you provide more details?\\n\\n✓ Safe Info • Verified Source';
  };

  const navigateOnboarding = (direction: 'next' | 'back') => {
    if (direction === 'next') {
      if (onboardingStep < 4) {
        setOnboardingStep((onboardingStep + 1) as OnboardingStep);
      } else {
        setCurrentPage('home');
      }
    } else {
      if (onboardingStep > 1) {
        setOnboardingStep((onboardingStep - 1) as OnboardingStep);
      }
    }
  };

  const OnboardingScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#14B8A6" />
        
        <View style={styles.onboardingProgress}>
          <ProgressBar progress={onboardingStep / 4} color="#C0FF00" style={styles.progressBar} />
          <Text style={styles.progressText}>Step {onboardingStep} of 4</Text>
        </View>

        <View style={styles.illustrationContainer}>
          <View style={styles.lottiePlaceholder}>
            <Text style={styles.lottieText}>🏃‍♂️</Text>
            <Text style={styles.lottieSubtext}>Fitness Animation</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.onboardingContent}>
          {onboardingStep === 1 && (
            <View>
              <Text style={styles.onboardingTitle}>Welcome to FitnessFREAK!</Text>
              <Text style={styles.onboardingSubtitle}>Let's personalize your fitness journey</Text>
              
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor="#94A3B8"
              />
              
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Your age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholderTextColor="#94A3B8"
              />
              
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.optionRow}>
                {['Male', 'Female', 'Other'].map((g) => (
                  <Pressable
                    key={g}
                    style={[styles.optionButton, gender === g && styles.optionButtonActive]}
                    onPress={() => setGender(g)}
                  >
                    <Text style={[styles.optionText, gender === g && styles.optionTextActive]}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {onboardingStep === 2 && (
            <View>
              <Text style={styles.onboardingTitle}>What's Your Goal?</Text>
              <Text style={styles.onboardingSubtitle}>Choose your primary fitness objective</Text>
              
              <Pressable
                style={[styles.goalCard, fitnessGoal === 'lose' && styles.goalCardActive]}
                onPress={() => setFitnessGoal('lose')}
              >
                <Text style={styles.goalEmoji}>⚖️</Text>
                <Text style={styles.goalTitle}>Lose Weight</Text>
                <Text style={styles.goalSubtitle}>Burn fat and slim down</Text>
              </Pressable>
              
              <Pressable
                style={[styles.goalCard, fitnessGoal === 'build' && styles.goalCardActive]}
                onPress={() => setFitnessGoal('build')}
              >
                <Text style={styles.goalEmoji}>💪</Text>
                <Text style={styles.goalTitle}>Build Muscle</Text>
                <Text style={styles.goalSubtitle}>Gain strength and mass</Text>
              </Pressable>
              
              <Pressable
                style={[styles.goalCard, fitnessGoal === 'active' && styles.goalCardActive]}
                onPress={() => setFitnessGoal('active')}
              >
                <Text style={styles.goalEmoji}>🏃</Text>
                <Text style={styles.goalTitle}>Stay Active</Text>
                <Text style={styles.goalSubtitle}>Maintain healthy lifestyle</Text>
              </Pressable>
            </View>
          )}

          {onboardingStep === 3 && (
            <View>
              <Text style={styles.onboardingTitle}>Fitness Level</Text>
              <Text style={styles.onboardingSubtitle}>How would you rate your current fitness?</Text>
              
              <View style={styles.optionRow}>
                {[
                  { key: 'beginner', label: 'Beginner' },
                  { key: 'intermediate', label: 'Intermediate' },
                  { key: 'advanced', label: 'Advanced' },
                ].map((level) => (
                  <Pressable
                    key={level.key}
                    style={[styles.levelButton, fitnessLevel === level.key && styles.levelButtonActive]}
                    onPress={() => setFitnessLevel(level.key)}
                  >
                    <Text style={[styles.levelText, fitnessLevel === level.key && styles.levelTextActive]}>
                      {level.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          {onboardingStep === 4 && (
            <View>
              <Text style={styles.onboardingTitle}>Your Availability</Text>
              <Text style={styles.onboardingSubtitle}>How much time can you dedicate?</Text>
              
              <Text style={styles.inputLabel}>Days per week</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 3-5 days"
                value={daysPerWeek}
                onChangeText={setDaysPerWeek}
                placeholderTextColor="#94A3B8"
              />
              
              <Text style={styles.inputLabel}>Minutes per session</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 30-60 minutes"
                value={minutesPerSession}
                onChangeText={setMinutesPerSession}
                placeholderTextColor="#94A3B8"
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.onboardingButtons}>
          {onboardingStep > 1 && (
            <Button
              mode="outlined"
              onPress={() => navigateOnboarding('back')}
              style={styles.backButton}
              textColor="#14B8A6"
            >
              Back
            </Button>
          )}
          <Button
            mode="contained"
            onPress={() => navigateOnboarding('next')}
            style={[styles.nextButton, onboardingStep === 1 && styles.nextButtonFull]}
            buttonColor="#14B8A6"
          >
            {onboardingStep === 4 ? 'Finish' : 'Next'}
          </Button>
        </View>
      </View>
    );
  };

  const HomeScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={styles.homeHeader}>
          <View>
            <Text style={styles.greeting}>Good Morning, {userName || 'Shivam'}! 👋</Text>
            <Text style={styles.quote}>"Your only limit is you"</Text>
          </View>
          <Avatar.Text size={50} label={userName ? userName[0].toUpperCase() : 'S'} style={styles.avatar} />
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Today's Workout Plan</Text>
            <Text style={styles.cardSubtitle}>Full Body Strength Training</Text>
            <Text style={styles.cardDetail}>30 min • 12 exercises</Text>
            <Button mode="contained" buttonColor="#C0FF00" textColor="#000" style={styles.startButton} onPress={() => setCurrentPage('plan')}>
              Start Workout
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Nutrition Summary</Text>
            <View style={styles.nutritionRow}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>1,450</Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>3/5</Text>
                <Text style={styles.nutritionLabel}>Meals</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionValue}>6/8</Text>
                <Text style={styles.nutritionLabel}>Water</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{streak}</Text>
            <Text style={styles.statLabel}>Day Streak 🔥</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{caloriesBurned}</Text>
            <Text style={styles.statLabel}>Calories 🔥</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{workoutsCompleted}</Text>
            <Text style={styles.statLabel}>Workouts ✅</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  const CoachScreen = () => {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.coachHeader}>
          <Avatar.Icon size={50} icon="robot" style={styles.coachAvatar} />
          <View style={styles.coachInfo}>
            <Text style={styles.coachName}>FitGenie AI Coach</Text>
            <Text style={styles.coachStatus}>🟢 Online • Powered by RAG</Text>
          </View>
        </View>

        <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === 'user' ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={[styles.messageText, message.sender === 'user' && styles.userText]}>
                {message.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.chatInputContainer}>
          <TextInput
            style={styles.chatInput}
            placeholder="Ask me anything about fitness..."
            value={chatInput}
            onChangeText={setChatInput}
            placeholderTextColor="#94A3B8"
            multiline
          />
          <Pressable style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendIcon}>➤</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const ProgressScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Your Progress</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Weekly Activity</Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>📊 Activity Chart</Text>
              <Text style={styles.chartSubtext}>Chart visualization here</Text>
            </View>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>🏆</Text>
            <Text style={styles.badgeTitle}>Consistency King</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>💧</Text>
            <Text style={styles.badgeTitle}>Hydration Hero</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeEmoji}>⚡</Text>
            <Text style={styles.badgeTitle}>Streak Starter</Text>
          </View>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Community Leaderboard</Text>
            {['Shivam - 1,245 pts', 'Alex - 1,180 pts', 'Jordan - 1,120 pts', 'Taylor - 1,050 pts', 'You - 980 pts'].map((entry, i) => (
              <Text key={i} style={styles.leaderboardEntry}>
                {i + 1}. {entry}
              </Text>
            ))}
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  const CommunityScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Community Challenges</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.challengeTitle}>🏃 7-Day Step Goal</Text>
            <Text style={styles.challengeSubtitle}>10,000 steps daily for a week</Text>
            <ProgressBar progress={0.6} color="#14B8A6" style={styles.challengeProgress} />
            <Text style={styles.challengeStats}>456 participants • 3 days left</Text>
            <Button mode="contained" buttonColor="#14B8A6" style={styles.joinButton}>
              Join Challenge
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.challengeTitle}>🥗 No-Sugar Week</Text>
            <Text style={styles.challengeSubtitle}>Cut sugar for 7 days</Text>
            <ProgressBar progress={0.4} color="#3B82F6" style={styles.challengeProgress} />
            <Text style={styles.challengeStats}>234 participants • 5 days left</Text>
            <Button mode="contained" buttonColor="#3B82F6" style={styles.joinButton}>
              Join Challenge
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.challengeTitle}>💪 Strength Builder</Text>
            <Text style={styles.challengeSubtitle}>Complete 12 strength workouts this month</Text>
            <ProgressBar progress={0.75} color="#C0FF00" style={styles.challengeProgress} />
            <Text style={styles.challengeStats}>789 participants • 8 days left</Text>
            <Button mode="outlined" style={styles.joinButton} textColor="#C0FF00">
              Joined ✓
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  const ProfileScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <View style={styles.profileHeader}>
          <Avatar.Text size={80} label={userName ? userName[0].toUpperCase() : 'S'} style={styles.profileAvatar} />
          <Text style={styles.profileName}>{userName || 'Shivam'}</Text>
          <Text style={styles.profileStats}>{age} years • {gender}</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Fitness Profile</Text>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Goal:</Text>
              <Text style={styles.profileValue}>{fitnessGoal || 'Build Muscle'}</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Level:</Text>
              <Text style={styles.profileValue}>{fitnessLevel || 'Intermediate'}</Text>
            </View>
            <View style={styles.profileRow}>
              <Text style={styles.profileLabel}>Schedule:</Text>
              <Text style={styles.profileValue}>{daysPerWeek || '4'} days/week, {minutesPerSession || '45'} min/session</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Settings</Text>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Notifications</Text>
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Privacy & Data</Text>
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Help & Support</Text>
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={[styles.settingText, { color: '#EF4444' }]}>Logout</Text>
            </Pressable>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  const PlanScreen = () => {
    return (
      <ScrollView style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Personalized Plan</Text>
        
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Today's Workout</Text>
            {[
              { name: 'Warm-up', duration: '5 min' },
              { name: 'Push-ups', reps: '3 sets x 12 reps' },
              { name: 'Squats', reps: '3 sets x 15 reps' },
              { name: 'Plank', duration: '3 sets x 30 sec' },
              { name: 'Lunges', reps: '3 sets x 10 reps each leg' },
              { name: 'Cool-down stretch', duration: '5 min' },
            ].map((exercise, i) => (
              <View key={i} style={styles.exerciseRow}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDetail}>{exercise.reps || exercise.duration}</Text>
              </View>
            ))}
            <Button mode="contained" buttonColor="#14B8A6" style={styles.startButton}>
              Start Workout
            </Button>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>Nutrition Plan</Text>
            <View style={styles.mealRow}>
              <Text style={styles.mealName}>🍳 Breakfast</Text>
              <Text style={styles.mealCalories}>450 cal</Text>
            </View>
            <View style={styles.mealRow}>
              <Text style={styles.mealName}>🥗 Lunch</Text>
              <Text style={styles.mealCalories}>600 cal</Text>
            </View>
            <View style={styles.mealRow}>
              <Text style={styles.mealName}>🍎 Snack</Text>
              <Text style={styles.mealCalories}>200 cal</Text>
            </View>
            <View style={styles.mealRow}>
              <Text style={styles.mealName}>🍝 Dinner</Text>
              <Text style={styles.mealCalories}>700 cal</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    );
  };

  const BottomNav = () => {
    if (currentPage === 'onboarding') return null;

    return (
      <View style={styles.bottomNav}>
        <Pressable style={styles.navButton} onPress={() => setCurrentPage('home')}>
          <Text style={[styles.navIcon, currentPage === 'home' && styles.navIconActive]}>🏠</Text>
          <Text style={[styles.navLabel, currentPage === 'home' && styles.navLabelActive]}>Home</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => setCurrentPage('coach')}>
          <Text style={[styles.navIcon, currentPage === 'coach' && styles.navIconActive]}>🤖</Text>
          <Text style={[styles.navLabel, currentPage === 'coach' && styles.navLabelActive]}>AI Coach</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => setCurrentPage('progress')}>
          <Text style={[styles.navIcon, currentPage === 'progress' && styles.navIconActive]}>📊</Text>
          <Text style={[styles.navLabel, currentPage === 'progress' && styles.navLabelActive]}>Progress</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => setCurrentPage('community')}>
          <Text style={[styles.navIcon, currentPage === 'community' && styles.navIconActive]}>👥</Text>
          <Text style={[styles.navLabel, currentPage === 'community' && styles.navLabelActive]}>Community</Text>
        </Pressable>

        <Pressable style={styles.navButton} onPress={() => setCurrentPage('profile')}>
          <Text style={[styles.navIcon, currentPage === 'profile' && styles.navIconActive]}>👤</Text>
          <Text style={[styles.navLabel, currentPage === 'profile' && styles.navLabelActive]}>Profile</Text>
        </Pressable>
      </View>
    );
  };

  const FloatingButton = () => {
    if (currentPage === 'onboarding' || currentPage === 'coach') return null;

    return (
      <Pressable style={styles.fab} onPress={() => setCurrentPage('coach')}>
        <Text style={styles.fabText}>💬</Text>
        <Text style={styles.fabLabel}>Ask FitGenie</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {currentPage === 'onboarding' && <OnboardingScreen />}
      {currentPage === 'home' && <HomeScreen />}
      {currentPage === 'coach' && <CoachScreen />}
      {currentPage === 'progress' && <ProgressScreen />}
      {currentPage === 'community' && <CommunityScreen />}
      {currentPage === 'profile' && <ProfileScreen />}
      {currentPage === 'plan' && <PlanScreen />}
      
      <BottomNav />
      <FloatingButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingBottom: 80,
  },
  
  onboardingProgress: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1E293B',
  },
  progressText: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  illustrationContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  lottiePlaceholder: {
    alignItems: 'center',
  },
  lottieText: {
    fontSize: 80,
  },
  lottieSubtext: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },
  onboardingContent: {
    paddingHorizontal: 20,
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  optionButtonActive: {
    backgroundColor: '#14B8A6',
    borderColor: '#14B8A6',
  },
  optionText: {
    color: '#94A3B8',
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  goalCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#334155',
  },
  goalCardActive: {
    borderColor: '#14B8A6',
    backgroundColor: '#14B8A620',
  },
  goalEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  goalSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  levelButton: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  levelButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  levelText: {
    color: '#94A3B8',
    fontWeight: '600',
    fontSize: 12,
  },
  levelTextActive: {
    color: '#FFFFFF',
  },
  onboardingButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  backButton: {
    flex: 1,
    borderColor: '#14B8A6',
  },
  nextButton: {
    flex: 1,
  },
  nextButtonFull: {
    flex: 1,
  },

  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  quote: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
  },
  avatar: {
    backgroundColor: '#14B8A6',
  },
  card: {
    marginHorizontal: 20,
    marginBottom: 16,
    backgroundColor: '#1E293B',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 16,
  },
  startButton: {
    marginTop: 8,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14B8A6',
  },
  nutritionLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginTop: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C0FF00',
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },

  coachHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  coachAvatar: {
    backgroundColor: '#14B8A6',
  },
  coachInfo: {
    marginLeft: 12,
  },
  coachName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  coachStatus: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  chatContainer: {
    flex: 1,
  },
  chatContent: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#14B8A6',
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1E293B',
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
  },
  userText: {
    color: '#000000',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 15,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#14B8A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },

  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  chartText: {
    fontSize: 32,
    color: '#64748B',
  },
  chartSubtext: {
    fontSize: 11,
    color: '#475569',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  badge: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 12,
    color: '#CBD5E1',
    textAlign: 'center',
    fontWeight: '600',
  },
  leaderboardEntry: {
    fontSize: 15,
    color: '#CBD5E1',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },

  challengeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  challengeSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  challengeProgress: {
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  challengeStats: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 16,
  },
  joinButton: {
    marginTop: 8,
  },

  profileHeader: {
    alignItems: 'center',
    padding: 32,
  },
  profileAvatar: {
    backgroundColor: '#14B8A6',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileStats: {
    fontSize: 14,
    color: '#94A3B8',
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  profileLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  profileValue: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  settingItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  settingText: {
    fontSize: 16,
    color: '#FFFFFF',
  },

  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  exerciseName: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  exerciseDetail: {
    fontSize: 14,
    color: '#94A3B8',
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  mealName: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  mealCalories: {
    fontSize: 14,
    color: '#14B8A6',
    fontWeight: '600',
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingBottom: 8,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navIconActive: {
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  navLabelActive: {
    color: '#14B8A6',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    backgroundColor: '#C0FF00',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    fontSize: 20,
    marginRight: 8,
  },
  fabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});
