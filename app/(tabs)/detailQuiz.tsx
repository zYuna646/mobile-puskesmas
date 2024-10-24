import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'; // Import Checkbox from expo-checkbox
import { useLocalSearchParams } from 'expo-router';

// Dummy question data
const questions = [
  {
    id: 1,
    question: "Menyiapkan sikat gigi dan pasta gigi yang mengandung flour (zat yang dapat menambah kekuatan gigi)?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 2,
    question: "Meruwangkan pasta gigi kurang lebih sebesar butiran lozongan tandu (1/2 cm)?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 3,
    question: "Menggosok gigi di 16 area Permukaan bukal (bagian kanan RB yang menghadap pipi) dengan gerakan memutar dari depan ke belakang?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 4,
    question: "Menggosok gigi di 16 area Permukaan lingual (bagian kanan RB yang menghadap ke dalam) dengan gerakan memutar dari depan ke belakang?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
];

export default function detailQuiz() {
  const { quizId } = useLocalSearchParams();
  console.log('Quiz ID:', quizId);

  const [selectedAnswers, setSelectedAnswers] = useState({} as any);

  const toggleCheckbox = (questionId :any, option:any) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Kuesioner</Text>

      {/* Subtitle / Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Pilih salah satu jawaban yang sesuai dengan memberikan tanda checklist (✓)
          pada salah satu kolom yang tersedia
        </Text>
      </View>

      {/* Loop through questions */}
      <View style={styles.questionContainer}>
        {questions.map((question, index) => (
          <View key={question.id}>
            <Text style={styles.question}>{index+1}.  {question.question}</Text>
            {question.options.map((option) => (
              <View key={option} style={styles.checkboxContainer}>
                <Checkbox
                  value={selectedAnswers[question.id as any] === option}
                  onValueChange={() => toggleCheckbox(question.id, option)}
                  style={styles.checkbox}
                  color={'#2B6CE5'}
                />
                <Text style={styles.checkboxLabel}>{option}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:'5%',
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: "PoppinRegular",

    color: 'rgba(43, 108, 229, 1)',
    marginBottom: 20,
  },
  descriptionContainer: {
    backgroundColor: '#E0E8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    color: '#2B6CE5',
    textAlign: 'center',
    fontFamily: "PoppinRegular",

  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontFamily: "PoppinRegular",

    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  checkboxLabel: {
    fontFamily: "PoppinRegular",
    fontSize: 16,
    color: '#2B6CE5',
  },
});
