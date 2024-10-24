import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  RefreshControl 
} from "react-native";
import { Video } from "expo-av"; 
import { FontAwesome } from "@expo/vector-icons";
import { useRouter, useFocusEffect } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

interface VideoItem {
  id: number;
  title: string;
  source: any;
}

const videoData: VideoItem[] = [
  {
    id: 1,
    title: "Cara Menyikat Gigi - Bagian 1",
    source: require("../../assets/video/edukasi_diet.mp4"),
  },
  {
    id: 2,
    title: "Cara Menyikat Gigi - Bagian 2",
    source: require("../../assets/video/edukasi_diet.mp4"),
  },
  {
    id: 3,
    title: "Cara Menyikat Gigi - Bagian 3",
    source: require("../../assets/video/edukasi_diet.mp4"),
  },
];

export default function Guide() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const videoRef = useRef<Video>(null);
  const currentVideo = videoData[currentVideoIndex];
  const router = useRouter();

  useEffect(() => {
    const playNewVideo = async () => {
      if (videoRef.current) {
        await videoRef.current.stopAsync();
        await videoRef.current.playFromPositionAsync(0);
      }
    };
    playNewVideo();
  }, [currentVideoIndex]);

  const nextVideo = () => {
    if (currentVideoIndex < videoData.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const previousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  const handleFullScreenUpdate = async () => {
    // Langsung ubah orientasi tanpa cek fullscreenUpdate
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    await ScreenOrientation.unlockAsync(); // Kembalikan orientasi saat keluar fullscreen
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setCurrentVideoIndex(0);
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const playVideo = async () => {
        if (videoRef.current) {
          await videoRef.current.playAsync();
        }
      };

      const stopVideo = async () => {
        if (videoRef.current) {
          await videoRef.current.stopAsync();
          setCurrentVideoIndex(0);
        }
      };

      playVideo();

      return () => {
        stopVideo();
      };
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.title}>{currentVideo.title}</Text>

      <View style={styles.videoContainerWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={previousVideo}
          disabled={currentVideoIndex === 0}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color={currentVideoIndex === 0 ? "#ddd" : "#0087FF"}
          />
        </TouchableOpacity>

        <Video
          ref={videoRef}
          source={currentVideo.source}
          style={styles.video}
          useNativeControls
          isLooping
          shouldPlay
          // onFullscreenUpdate={handleFullScreenUpdate} // Langsung ubah orientasi di sini
        />

        <TouchableOpacity
          style={styles.button}
          onPress={nextVideo}
          disabled={currentVideoIndex === videoData.length - 1}
        >
          <FontAwesome
            name="chevron-right"
            size={24}
            color={
              currentVideoIndex === videoData.length - 1 ? "#ddd" : "#0087FF"
            }
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "PoppinRegular",
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#2B6CE5",
  },
  videoContainerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: 300,
    height: 200,
    backgroundColor: "#000",
  },
  button: {
    padding: 10,
  },
});
