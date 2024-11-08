import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Modal,
  Button,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const image = require("../../assets/home/header.png");

export default function Classification() {
  const [refreshing, setRefreshing] = useState(false);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false); // Separate modal for tutorial
  const [resultImage, setResultImage] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      uploadImage(pickerResult.uri);
    }
  };

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      name: "tooth_image.jpg",
      type: "image/jpeg",
    });

    try {
      const response = await fetch(`https://be6e-36-85-220-51.ngrok-free.app/upload`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.blob();
      const imageUrl = URL.createObjectURL(result);
      setResultImage(imageUrl);
      setResultModalVisible(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not upload image.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Periksa Gigi</Text>
      </View>

      <Image source={image} style={styles.image} resizeMode="cover" />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <FontAwesome name="upload" size={20} color="#fff" />
          <Text style={styles.buttonText}>Upload Gambar Gigi</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setTutorialModalVisible(true)} // Open tutorial modal
        >
          <Ionicons name="information-circle-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Tutorial Penggunaan</Text>
        </TouchableOpacity>
      </View>

      {/* Tutorial Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={tutorialModalVisible}
        onRequestClose={() => setTutorialModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cara Menggunakan</Text>
            <Text style={styles.modalText}>1. Tekan tombol "Upload Gambar Gigi" untuk memilih foto gigi.</Text>
            <Text style={styles.modalText}>2. Setelah memilih foto, tunggu sebentar untuk melihat hasilnya.</Text>
            <Text style={styles.modalText}>3. Hasil akan muncul dan bisa dilihat di layar!</Text>
            <Button title="Tutup" onPress={() => setTutorialModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Result Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={resultModalVisible}
        onRequestClose={() => setResultModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Hasil Pemeriksaan Gigi</Text>
            {resultImage && <Image source={{ uri: resultImage }} style={styles.resultImage} />}
            <Button title="Tutup" onPress={() => setResultModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
  },
  resultImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
});
