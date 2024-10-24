import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Href, Link } from 'expo-router'; // Import Link from expo-router

// List of quizzes with isActive property
const quizzes = [
  { id: '1', title: 'Quiz 1: Basic JavaScript', isActive: true },
  { id: '2', title: 'Quiz 2: React Native Fundamentals', isActive: false },
  { id: '3', title: 'Quiz 3: CSS Basics', isActive: true },
  { id: '4', title: 'Quiz 4: Advanced JavaScript', isActive: false },
  { id: '5', title: 'Quiz 5: React Hooks', isActive: true },
];

export default function quiz() {
  // Filter the quizzes to only include those that are active
  const activeQuizzes = quizzes.filter((quiz) => quiz.isActive);

  // Render each quiz as a card
  const renderItem = ({ item }: any) => (
    <Link href={{ pathname: '/detailQuiz' as any, params: { quizId: item.id } }} asChild>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View style={styles.container}>
      {/* Title at the top */}
      <Text style={styles.title}>Kuesioner</Text>

      {/* List of quizzes */}
      <FlatList
        data={activeQuizzes} // Only pass active quizzes to the FlatList
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'5%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    width:'90%',
    alignSelf:'center'
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinRegular",

    color: 'rgba(43, 108, 229, 1)', // Title color
    textAlign: 'center',
    marginTop: 20, // Margin from the top
    marginBottom: 20, // Margin bottom to space the title from the list
  },
  card: {
    backgroundColor: '#FFF', // White background for the card
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    justifyContent: 'center',
    // Add shadow for better card visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    fontFamily: "PoppinRegular",
  },
});
