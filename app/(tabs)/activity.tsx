import useApi from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Calendar, LocaleConfig, DateData } from "react-native-calendars";

LocaleConfig.locales["id"] = {
  monthNames: [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ],
  dayNames: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
  dayNamesShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
  today: "Hari Ini",
};

const activity = [
  { id: 1, title: "Sikat Gigi Pagi" },
  { id: 2, title: "Sikat Gigi Malam" },
  { id: 3, title: "Makan Makanan Yang Manis" },
  { id: 4, title: "Minum Minuman Yang Manis" },
  { id: 5, title: "Membuka Kemasan Menggunakan Gigi" },
];

LocaleConfig.defaultLocale = "id";

const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString().split("T")[0];
};

export default function Activity() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, boolean>
  >({});
  const [marked, setMarked] = useState({});

  const { get, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );

  const markedDates = {
    "2024-10-25": { marked: true },
    "2024-10-26": { marked: true },
    [selectedDate]: { selected: true, marked: true, selectedColor: "#2B6CE5" },
  };

  const toggleCheckbox = (activityId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get("/categories");
        const user:any = await AsyncStorage.getItem("user");
        if (user) {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API}/todos/user/${user.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          if (result) {
            const transformedData = result.data.reduce((acc, item) => {
              acc[item.id] = item;
              return acc;
            }, {});
          
            setMarked({
              ...transformedData,
              [selectedDate]: { selected: true, marked: true, selectedColor: "#2B6CE5" },
            });
          }
          
          console.log(result);
        }
    
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedDate]);

  console.log(data);

  const handleDayPress = (day: DateData) => {
    setMarked({
      ...marked,
      [day.dateString]: { selected: true, marked: true, selectedColor: "#2B6CE5" },
    })
    setSelectedDate(day.dateString);

  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSelectedDate("");
      setSelectedAnswers({});
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>Aktivitasku</Text>

      <View style={styles.callenderCard}>
        <Calendar
          initialDate={new Date().toISOString().split("T")[0]}
          maxDate={getTomorrowDate()}
          onDayPress={handleDayPress}
          markedDates={marked}
        />
      </View>

      <View style={styles.checkBoxCard}>
        {loading ? (
          <ActivityIndicator size="large" color="#0087FF" />
        ) : (
          data.data.map((item: any) => (
            <View key={item.id} style={styles.checkBoxContainer}>
              <Checkbox
                color={"#2B6CE5"}
                value={!!selectedAnswers[item.id]}
                onValueChange={() => toggleCheckbox(item.id)}
              />
              <Text style={styles.checkboxLabel}>{item.name}</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: "10%",
  },
  title: {
    fontSize: 22,
    fontFamily: "PoppinRegular",
    color: "#2B6CE5",
    alignSelf: "center",
    flex: 1,
  },
  callenderCard: {
    flex: 5,
    marginTop: "5%",
  },
  checkBoxCard: {
    flex: 5,
    width: "90%",
    alignSelf: "center",
  },
  checkBoxContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: "5%",
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: "PoppinRegular",
    marginLeft: "5%",
    color: "#2B6CE5",
  },
});
