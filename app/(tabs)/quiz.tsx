import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Quiz() {
  const pdfUri = 'https://drive.google.com/file/d/1vtXOXhpZMlIodiBrJigjbIvwDhKp6FCE/view?usp=sharing'; // Dummy PDF link for testing

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivational Interview</Text>

      <WebView
        source={{ uri: pdfUri }}
        style={styles.pdf}
        startInLoadingState={true}
        javaScriptEnabled={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="blue" />
            <Text>Loading PDF...</Text>
          </View>
        )}
        onError={(error) => {
          console.error("WebView Error: ", error);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#F5F5F5",
    padding: 10,
    width: "90%",
    alignSelf: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinRegular",
    color: "rgba(43, 108, 229, 1)",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
