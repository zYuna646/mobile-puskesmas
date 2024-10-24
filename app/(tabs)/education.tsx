import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
const image = require("../../assets/home/header.png");

export default function education() {
  const [search, setSearch] = useState("");

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardImageContainer}>
                <Image source={image} style={styles.cardImage} />
              </TouchableOpacity>
              <Text style={styles.cardText}>Makanan yang sehat untuk kesehatan Gigi dan Mulut</Text>
            </View>
          
         
            <View style={styles.card}>
              <TouchableOpacity style={styles.cardImageContainer}>
                <Image source={image} style={styles.cardImage} />
              </TouchableOpacity>
              <Text style={styles.cardText}>s</Text>
            </View>
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
    marginTop:'5%'
  },

  cardImageContainer: {
    width: "100%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6, // Bayangan muncul hanya di bawah
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 10, // Bayangan lebih fokus di bagian bawah pada Android
    backgroundColor: "white",
    overflow: "hidden",
  },

  cardImage: {
    width: "100%",
    height: 158,
    borderRadius: 20, // Ini diterapkan juga pada gambar agar memiliki border radius yang sama
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
