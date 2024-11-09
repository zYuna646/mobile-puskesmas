import useApi from "@/hooks/useApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
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
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [refreshing, setRefreshing] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, boolean>
  >({});
  const [marked, setMarked] = useState<Record<string, any>>({});
  const [hasMonthlyActivities, setHasMonthlyActivities] = useState(false);

  const { get, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );

  const toggleCheckbox = (activityId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  console.log(selectedAnswers);

  const fetchData = async () => {
    try {
      await get("/categories");
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString ? userString : "{}");
      if (!user || !user.id) {
        // Redirect to profile screen if user data is not found
        router.navigate('/profile'); // Change 'Profile' to the correct route name for your profile screen
        return;
      }
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
          console.log(result);

          // Get today's date for comparison
          const today = new Date().toISOString().split("T")[0];
          const currentMonth = new Date().getMonth() + 1;
          const currentYear = new Date().getFullYear();

          // Check for activities in the current month that are not today
          const hasActivitiesInCurrentMonth = result.data.some((item: any) => {
            const itemDate = new Date(item.date);
            const itemDateString = item.date;
            return (
              itemDate.getMonth() + 1 === currentMonth &&
              itemDate.getFullYear() === currentYear &&
              itemDateString !== today // Check that the date is not today
            );
          });

          setHasMonthlyActivities(hasActivitiesInCurrentMonth);

          const transformedData = result.data.reduce((acc: any, item: any) => {
            acc[item.date] = { marked: true, dotColor: "#2B6CE5" };
            return acc;
          }, {});

          const answer = findTodoByDate(result.data, selectedDate);
          if (answer && answer.categories) {
            console.log(answer.categories);

            answer.categories.map((item: any) => {
              selectedAnswers[item.category_id] = true;
            });
          } else {
            setSelectedAnswers({});
          }

          // Update marked with selectedDate included
          setMarked({
            ...transformedData,
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "#2B6CE5",
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findTodoByDate = (todos: any, targetDate: any) => {
    return todos.find((todo: any) => todo.date === targetDate);
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleSimpan = async () => {
    try {
      const userString = await AsyncStorage.getItem("user");
      const user = JSON.parse(userString ? userString : "{}");

      if (user && user.id) {
        const dt = JSON.stringify({
          date: selectedDate,
          categories: Object.keys(selectedAnswers)
            .map((key: any) => {
              if (selectedAnswers[key]) {
                return {
                  category_id: key,
                };
              }
              return null;
            })
            .filter(Boolean),
        });

        console.log(dt, "here");

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API}/todos/user/${user.id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: dt,
          }
        );

        if (response.ok) {
          const data = await response.json();
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Success",
            textBody: "Todo successfully saved",
          });
          console.log("Todo successfully saved:", data);
        } else {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "An error occurred while saving the todo",
          });
          fetchData();
          console.error(
            "Failed to save Todo:",
            response.status,
            await response.text()
          );
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred while saving the todo",
        });
        console.log("User not found or user ID is missing.");
      }
    } catch (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred while saving the todo",
      });
      console.error("An error occurred:", error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
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
        {hasMonthlyActivities && (
          <Text
            style={{
              marginTop: "2%",
              alignSelf: "center",
              fontFamily: "PoppinRegular",
              color: "red",
            }}
          >
            Kamu sudah menyimpan aktivitas pada bulan ini.
          </Text>
        )}
        {loading ? (
          <ActivityIndicator size="large" color="#0087FF" />
        ) : (
          data?.data?.map((item: any) => (
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
      {selectedDate == new Date().toISOString().split("T")[0] &&
      !hasMonthlyActivities ? (
        <TouchableOpacity
          onPress={handleSimpan}
          style={{
            marginTop: "5%",
            alignSelf: "center",
            backgroundColor: "#2B6CE5",
            width: "100%",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "PoppinRegular",
              color: "white",
              fontSize: 20,
              textAlign: "center",
              padding: 10,
            }}
          >
            Simpan
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
