import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";

// Mengimpor gambar header
const image = require("../../assets/home/header.png");

export default function Classification() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Periksa Gigi</Text>
      </View>

      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome name="upload" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload Gambar Gigi</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="information-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Tutorial Penggunaan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    alignItems: "center",
    marginTop: "5%",
  },
  headerText: {
    fontSize: 22,
    color: "#2B6CE5",
    fontFamily: "PoppinRegular",
  },
  image: {
    width: "100%",
    height: 250,
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0087FF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    width: "60%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
});
