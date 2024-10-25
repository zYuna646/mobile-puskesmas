import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Href, Link } from "expo-router"; // Import Link from expo-router
import useApi from "@/hooks/useApi";

// List of quizzes with isActive property
const quizzes = [
  { id: "1", title: "Quiz 1: Basic JavaScript", isActive: true },
  { id: "2", title: "Quiz 2: React Native Fundamentals", isActive: false },
  { id: "3", title: "Quiz 3: CSS Basics", isActive: true },
  { id: "4", title: "Quiz 4: Advanced JavaScript", isActive: false },
  { id: "5", title: "Quiz 5: React Hooks", isActive: true },
];

export default function Quiz() {
  // State to handle refreshing
  const [refreshing, setRefreshing] = useState(false);
  const { get, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );

  // Filter the quizzes to only include those that are active

  // Simulate data refresh (you can replace this with an actual API call)
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false); // End refreshing after 2 seconds (simulated)
    }, 2000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get("/kuesioners");
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  console.log(data);
  

  // Render each quiz as a card
  const renderItem = ({ item }: any) => (
    <Link
      href={{ pathname: "/detailQuiz", params: { quiz: JSON.stringify(item) } }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={styles.container}>
      {/* Title at the top */}
      <Text style={styles.title}>Kuesioner</Text>

      {/* List of quizzes */}
      {loading ? (
        <ActivityIndicator size="large" color="#0087FF" />
      ) : (
        <FlatList
          data={ data.data.filter((quiz: any) => quiz.isActive == 1)} // Only pass active quizzes to the FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          // Pull to refresh
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["rgba(43, 108, 229, 1)"]} // Spinner color on Android
              tintColor="rgba(43, 108, 229, 1)" // Spinner color on iOS
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#F5F5F5",
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinRegular",
    color: "rgba(43, 108, 229, 1)", // Title color
    textAlign: "center",
    marginTop: 20, // Margin from the top
    marginBottom: 20, // Margin bottom to space the title from the list
  },
  card: {
    backgroundColor: "#FFF", // White background for the card
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    justifyContent: "center",
    // Add shadow for better card visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    color: "#333",
    fontFamily: "PoppinRegular",
  },
});
