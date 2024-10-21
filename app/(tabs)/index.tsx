import {
  Image,
  StyleSheet,
  Platform,
  View,
  ImageBackground,
  Text,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MainText } from "@/constants/Text";
const image = require("../../assets/home/header.png");

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.top}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.5)"]}
          style={styles.shadow}
        />
        <View style={{width:'90%', alignSelf:'center'}}>
          <Text style={styles.topText}>{MainText.topHome}</Text>
          <TextInput style={styles.textInput} />
        </View>
      </ImageBackground>
      <View style={styles.bottom}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
  },
  top: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "red",
    justifyContent: "flex-end",
  },

  topText: {
    color: "white",
    fontSize: 17,
    fontFamily: "PoppinRegular",
    textAlign: "center",
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 100,
    height: 50,
    backgroundColor:'white',
    padding:10,
  },
  bottom: {
    flex: 2,
    backgroundColor: "blue",
  },
});
