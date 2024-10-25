import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Checkbox from "expo-checkbox"; // Import Checkbox from expo-checkbox
import { router, useLocalSearchParams } from "expo-router";
import useApi from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

// Dummy question data
const questions = [
  {
    id: 1,
    question:
      "Menyiapkan sikat gigi dan pasta gigi yang mengandung flour (zat yang dapat menambah kekuatan gigi)?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 2,
    question:
      "Meruwangkan pasta gigi kurang lebih sebesar butiran lozongan tandu (1/2 cm)?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 3,
    question:
      "Menggosok gigi di 16 area Permukaan bukal (bagian kanan RB yang menghadap pipi) dengan gerakan memutar dari depan ke belakang?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
  {
    id: 4,
    question:
      "Menggosok gigi di 16 area Permukaan lingual (bagian kanan RB yang menghadap ke dalam) dengan gerakan memutar dari depan ke belakang?",
    options: ["Dilakukan", "Tidak Dilakukan"],
  },
];

export default function detailQuiz() {
  const { quiz } = useLocalSearchParams();
  const quizData: any = JSON.parse(quiz as any);
  const [user,setUser] = useState({} as any)
  const [selectedAnswers, setSelectedAnswers] = useState({} as any);

  const { get, data, loading, error, post } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );
  const  options = ["Dilakukan"]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
        }
        await get(`/kuesioners/${quizData.id}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const toggleCheckbox = (questionId: any, option: any) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };
  

  const handleKirim = async () => {
    const formatAnswer = [] as any;
    data?.data.questions?.forEach(item => {
      formatAnswer.push({
        question_id: item.id,
        answer: selectedAnswers[item.id] ? selectedAnswers[item.id] : false
      })
    });
    const dt =  {
      answer: formatAnswer,
      kuesioner_id: data?.data?.id,
      responden_id: user.id
    } 
    console.log("DT", dt);
    
    await post(`/respondens/${user.id}/respond-kuesioner`,dt);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title:'Berhasil',
      textBody: data.message
    })
    setSelectedAnswers({});
    router.push('/(tabs)/quiz')

    // if (data.success && loading === false) {
    
    // }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Kuesioner</Text>

      {/* Subtitle / Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Pilih salah satu jawaban yang sesuai dengan memberikan tanda checklist
          (✓) pada salah satu kolom yang tersedia
        </Text>
      </View>

      {/* Loop through questions */}
      <View style={styles.questionContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0087FF" />
        ) : (
          data?.data.questions?.map((question: any, index: any) => (
            <View key={question.id} >
              <Text style={styles.question}>
                {index + 1}. {question.question}
              </Text>
              {options.map((option) => (
                <View key={option} style={styles.checkboxContainer}>
                  <Checkbox
                    value={selectedAnswers[question.id]}
                    onValueChange={() => toggleCheckbox(question.id, selectedAnswers[question.id] ? false : true)}
                    style={styles.checkbox}
                    color={"#2B6CE5"}
                  />
                  <Text style={styles.checkboxLabel}>{option}</Text>
                </View>
              ))}
            </View>
          ))
        )}
        <TouchableOpacity onPress={handleKirim} style={{width:'100%', alignSelf:'center', backgroundColor:'#2B6CE5', borderRadius:20, height:50, marginTop:'5%'}}>
          <Text style={{alignSelf:'center', textAlign:'center', fontFamily:'PoppinRegular', fontSize:20, justifyContent:'center', padding:10, color:"white"}}>Kirim</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#FFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "PoppinRegular",

    color: "rgba(43, 108, 229, 1)",
    marginBottom: 20,
  },
  descriptionContainer: {
    backgroundColor: "#E0E8FF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    color: "#2B6CE5",
    textAlign: "center",
    fontFamily: "PoppinRegular",
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontFamily: "PoppinRegular",

    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    color: "#2B6CE5",
  },
});
