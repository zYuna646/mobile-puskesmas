import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import YoutubeIframe from "react-native-youtube-iframe";

interface VideoItem {
  id: number;
  title: string;
  cover: string;
  source: string; // YouTube URL
}

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Edukasi Menyikat Gigi",
    cover: require("../../assets/cover/EDUKASI_MENYIKAT_GIGII.png"),
    source: "https://youtu.be/nXOUPkVRJ8Q", 
  },
  {
    id: 2,
    title: "PERILAKU BURUK YANG DAPAT MERUSAK GIGI",
    cover: require("../../assets/cover/PERILAKU_BURUK.png"),
    source: "https://youtu.be/Uv1110oXQhQ", 
  },
  {
    id: 3,
    title: "PRAKTEK MENYIKAT GIGI",
    cover: require("../../assets/cover/PRAKTEK_MENYIKAT_GIGI.png"),
    source: "https://youtu.be/dSunos7iW8s", 
  },
  {
    id: 4,
    title: "BAD HABBIT",
    cover: require("../../assets/cover/PERILAKU_BURUK.png"),
    source: "https://youtu.be/mV5Uy457Erw", 
  },
];

export default function Guide() {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const fetchData = async () => {
    try {
      // Assume `get` is a function to fetch data from API
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
        <Image source={item.cover} style={styles.cardImage} />
      </TouchableOpacity>
      <Text style={styles.cardText}>{item.title}</Text>
    </View>
  );

  const extractVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed)\/|\S*?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.title}>Video</Text>
        </View>
        <View style={styles.bottom}>
          <ScrollView style={styles.scrollView}>
            {videoData.map((item: any) => renderItem({ item }))}
          </ScrollView>
        </View>

        {/* Modal for YouTube Video */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedVideo && (
                <>
                  <Text style={styles.videoTitle}>{selectedVideo.title}</Text>
                  <YoutubeIframe
                    height={250}
                    width={Dimensions.get("window").width * 0.9}
                    videoId={extractVideoId(selectedVideo.source)}
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
  title: {
    alignSelf: "center",
    fontFamily: "PoppinRegular",
    color: "#2B6CE5",
    fontSize: 22,
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
  scrollView: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
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
