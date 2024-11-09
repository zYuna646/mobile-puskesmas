import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import useApi from "@/hooks/useApi";
import SkeletonPlaceholder from "react-native-skeleton-placeholder"; // Import the library

const image = require("../../assets/home/header.png");

export default function education() {
  const [search, setSearch] = useState("");
  const { get, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      await get("/articles");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  console.log(data);

  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.card}>
      <Link
        href={{
          pathname: "/detailArticle", // no need for `as any` here
          params: { article: JSON.stringify(item) }, // Use JSON.stringify synchronously
        }}
        asChild
      >
        <TouchableOpacity style={styles.cardImageContainer}>
          <Image
            source={{
              uri: `${process.env.EXPO_PUBLIC_IMAGE_API}/uploads/article/image/${item.cover}`,
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
      </Link>

      <Text style={styles.cardText}>{item.title}</Text>
    </View>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.textInput}>
            <TextInput
              style={{
                flex: 6,
                alignSelf: "center",
                fontFamily: "PoppinRegular",
                marginLeft: 15,
                color: "#2B6CE5",
              }}
              value={search}
              onChangeText={(text) => setSearch(text)}
              placeholder="Ayo mulai belajar disini"
              placeholderTextColor={"#2B6CE5"}
            />
            <TouchableOpacity style={{ flex: 1, alignSelf: "center" }}>
              <FontAwesome name="search" size={26} color="#0087FF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <ScrollView
            style={{
              flex: 1,
              alignSelf: "center",
              width: "100%",
            }}
          >
            {loading ? (
              <ActivityIndicator size="large" color="#0087FF" /> // Show skeletons while loading
            ) : (
              data.data?.map((item: any) => renderItem({ item }))
            )}
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
    width: "90%",
    alignSelf: "center",
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 10,
    marginTop: "5%",
  },

  card: {
    marginTop: "5%",
  },

  cardImageContainer: {
    width: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: 158,
    borderRadius: 20,
  },

  cardText: {
    marginTop: "2%",
    marginLeft: "2%",
    fontSize: 13,
    fontFamily: "PoppinRegular",
  },

  textInput: {
    width: "100%",
    borderRadius: 100,
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 15,
  },
});
