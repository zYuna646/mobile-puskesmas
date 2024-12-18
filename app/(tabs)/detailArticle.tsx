import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import YoutubeIframe from "react-native-youtube-iframe";
// Dummy JSON data for article
const image = require("../../assets/home/header.png");

const articleData = {
  id: 1,
  title: "Kesehatan Gigi dan Mulut",
  content:
    "Menjaga kesehatan gigi dan mulut sangat penting untuk kesehatan tubuh secara keseluruhan. Disarankan untuk sikat gigi dua kali sehari dan rutin periksa ke dokter gigi.",
  coverImage: "https://via.placeholder.com/400x200.png?text=Gambar+Cover",
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
};

export default function detailArticle() {
  const { article } = useLocalSearchParams();
  
  const data:any = JSON.parse(article as any);
  // Extract the YouTube video ID from the video link
  const extractVideoId = (url: string) => {
    const regex = /(?:\?v=|\/embed\/|\/watch\?v=|\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  };
  console.log( process.env.EXPO_PUBLIC_API);
  
  console.log(`${ process.env.EXPO_PUBLIC_IMAGE_API}/${data.cover}`);

  const videoId = data.videoUrl? extractVideoId(data.videoUrl) : '';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{data.title}</Text>

      <Image
        source={{ uri: `${ process.env.EXPO_PUBLIC_IMAGE_API}/uploads/article/image/${data.cover}` }}
        style={styles.coverImage}
      />
      {videoId && (
        <View style={styles.videoContainer}>
          <YoutubeIframe
            height={250}
            width={Dimensions.get("window").width * 0.9}
            videoId={videoId}
          />
        </View>
      )}
      <Text style={styles.content}>{data.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "10%",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  coverImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: "#2B6CE5",
    marginBottom: 8,
    fontFamily: "PoppinRegular",

    textAlign: "center",
  },
  content: {
    fontSize: 16,
    color: "#333",
    textAlign: "justify",
    marginBottom: 16,
  },
  videoContainer: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
});
