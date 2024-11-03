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
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import useApi from "@/hooks/useApi";
import { Video } from "expo-av";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

interface VideoItem {
  id: number;
  title: string;
  source: any;
}

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Cara Menyikat Gigi",
    source: require("../../assets/video/edukasi_diet.mp4"),
  },
  {
    id: 2,
    title: "Edukasi Bad Habbit",
    source: require("../../assets/video/edukasi_bad_habbit.mp4"),
  },
  {
    id: 3,
    title: "Cara Menyikat Gigi - Bagian 3",
    source: require("../../assets/video/edukasi_diet.mp4"),
  },
];

const image = require("../../assets/home/header.png");

export default function Guide() {
  const [search, setSearch] = useState("");
  const { get, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

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

  const openVideoModal = (item: VideoItem) => {
    setSelectedVideo(item);
    setModalVisible(true);
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.card}>
      <TouchableOpacity
        style={styles.cardImageContainer}
        onPress={() => openVideoModal(item)}
      >
        <Image source={image} style={styles.cardImage} />
      </TouchableOpacity>

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
          <Text
            style={{
              alignSelf: "center",
              fontFamily: "PoppinRegular",
              color: "#2B6CE5",
              fontSize: 22,
            }}
          >
            Video
          </Text>
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
              <ActivityIndicator size="large" color="#0087FF" />
            ) : (
              videoData?.map((item: any) => renderItem({ item }))
            )}
          </ScrollView>
        </View>

        {/* Modal for Video */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Display the video title */}
              {selectedVideo && (
                <>
                  <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
                  <Video
                    source={selectedVideo.source}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="contain"
                    shouldPlay
                    style={styles.videoPlayer}
                    useNativeControls
                  />
                </>
              )}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
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

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  videoPlayer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0087FF",
    borderRadius: 5,
  },

  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
