import {
  Image,
  StyleSheet,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MainText } from "@/constants/Text";
const image = require("../../assets/home/header.png");
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Href, Link } from "expo-router"; // Import Link from expo-router
import { useState } from "react";

const MainMenu = {
  guide: {
    title: "Guide",
    desc: "Cara Menyikat Gigi",
    href: "/guide",
    icon: (
      <MaterialCommunityIcons name="toothbrush-paste" size={70} color="white" />
    ),
  },
  classification: {
    title: "Classification",
    desc: "Periksa Gigi",
    href: "/classification",
    icon: (
      <MaterialCommunityIcons name="tooth-outline" size={70} color="white" />
    ),
  },
  education: {
    title: "Education",
    desc: "Belajar",
    href: "/education",
    icon: <FontAwesome5 name="book" size={70} color="white" />,
  },
  activity: {
    title: "Activity",
    desc: "Aktivitas Gigiku",
    href: "/activity",
    icon: <FontAwesome5 name="calendar-alt" size={70} color="white" />,
  },
  quiz: {
    title: "Quiz",
    desc: "Motivational Interview",
    href: "/quiz",
    icon: (
      <MaterialCommunityIcons name="account-question" size={70} color="white" />
    ),
  },
  konsultasi: {
    title: "Konsultasi",
    desc: "Konsultasi",
    href: "/konsultasi",
    icon: <FontAwesome6 name="user-doctor" size={70} color="white" />,
  },
};

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [nama, setNama] = useState("");
  const [keluhan, setKeluhan] = useState("");

  const handleKirimKeluhan = () => {
    if (!nama || !keluhan) {
      Alert.alert("Error", "Harap isi nama dan keluhan");
      return;
    }
    const pesan = `Dengan hormat,\n\nNama saya ${nama},\nSaya ingin menyampaikan keluhan mengenai: ${keluhan}.\n\nAtas perhatian Bapak/Ibu, saya ucapkan terima kasih.`;

    const whatsappUrl = `https://wa.me/6282319514419?text=${encodeURIComponent(pesan)}`;

    setModalVisible(false); // Tutup modal
    setNama(""); // Reset form
    setKeluhan("");

    // Buka WhatsApp
    Linking.openURL(whatsappUrl).catch(() =>
      Alert.alert("Error", "Gagal membuka WhatsApp")
    );
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.top}>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.5)"]}
            style={styles.shadow}
          />
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text style={styles.topText}>{MainText.topHome}</Text>
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
        </ImageBackground>
      </View>

      <View style={styles.bottom}>
        <ScrollView
          style={{
            marginTop: "5%",
            width: "85%",
            alignSelf: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <View style={styles.card}>
              <Link href={MainMenu.guide.href as Href} asChild>
                <TouchableOpacity style={styles.cardContent}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>{MainMenu.guide.icon}</View>
                </TouchableOpacity>
              </Link>
              <Text style={styles.cardText}>{MainMenu.guide.desc}</Text>
            </View>
            <View style={styles.card}>
              <Link href={MainMenu.classification.href as Href} asChild>
                <TouchableOpacity style={styles.cardContent}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>
                    {MainMenu.classification.icon}
                  </View>
                </TouchableOpacity>
              </Link>
              <Text style={styles.cardText}>
                {MainMenu.classification.desc}
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <View style={styles.card}>
              <Link href={MainMenu.activity.href as Href} asChild>
                <TouchableOpacity style={styles.cardContent}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>{MainMenu.activity.icon}</View>
                </TouchableOpacity>
              </Link>
              <Text style={styles.cardText}>{MainMenu.activity.desc}</Text>
            </View>
            <View style={styles.card}>
              <Link href={MainMenu.education.href as Href} asChild>
                <TouchableOpacity style={styles.cardContent}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>{MainMenu.education.icon}</View>
                </TouchableOpacity>
              </Link>
              <Text style={styles.cardText}>{MainMenu.education.desc}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "5%",
            }}
          >
            <View style={styles.card}>
              <Link href={MainMenu.quiz.href as Href} asChild>
                <TouchableOpacity style={styles.cardContent}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>{MainMenu.quiz.icon}</View>
                </TouchableOpacity>
              </Link>
              <Text style={styles.cardText}>{MainMenu.quiz.desc}</Text>
            </View>
            <View style={styles.card}>
              <View >
                <TouchableOpacity style={styles.cardContent} onPress={() => setModalVisible(true)}>
                  <LinearGradient
                    colors={["rgba(0, 135, 255, 1)", "rgba(0, 135, 255, 0.59)"]}
                    style={[StyleSheet.absoluteFillObject, styles.gradient]}
                  />
                  <View style={styles.content}>{MainMenu.konsultasi.icon}</View>
                </TouchableOpacity>
              </View>
              <Text style={styles.cardText}>{MainMenu.konsultasi.desc}</Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* Floating Profile Button */}
      <View style={styles.fabContainer}>
        <Link href={"/profile" as Href} asChild>
          <TouchableOpacity style={styles.fab}>
            <FontAwesome5 name="user" size={24} color="#0087FF" />
          </TouchableOpacity>
        </Link>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Form Konsultasi</Text>
            <TextInput
              style={styles.input}
              placeholder="Nama"
              value={nama}
              onChangeText={setNama}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Keluhan"
              value={keluhan}
              onChangeText={setKeluhan}
              multiline={true}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleKirimKeluhan}
            >
              <Text style={styles.submitButtonText}>Kirim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
  },
  top: {
    height: 244,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  profileButton: {
    position: "absolute",
    top: 50, // Adjust as necessary for padding
    right: 20, // Align to the right side of the screen
    zIndex: 2, // Make sure it stays on top
  },
  topText: {
    color: "white",
    fontSize: 17,
    fontFamily: "PoppinRegular",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#0087FF",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  closeButtonText: {
    color: "#0087FF",
    textAlign: "center",
  },
  content: {
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gradient: {
    borderRadius: 20,
  },
  textInput: {
    width: "100%",
    borderRadius: 100,
    height: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    top: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  bottom: {
    flex: 2,
  },
  card: {
    alignSelf: "center",
  },
  cardText: {
    fontFamily: "PoppinRegular",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
  cardContent: {
    borderRadius: 20,
    width: 144,
    height: 98,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 3,
  },
  fab: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
