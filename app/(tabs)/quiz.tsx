import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Modal, TouchableOpacity, FlatList, Image } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Quiz() {
  const steps = [
    {
      id: '1',
      title: 'Membangun Hubungan (Engaging)',
      pdfUri: 'https://drive.google.com/file/d/1l6mfNS9bjYM2igh9cSdSciXPbmUvUK6d/view?usp=sharing',
      imageUri: require('../../assets/cover/enganging.jpg')
    },
    {
      id: '2',
      title: 'Mengeksplorasi Alasan untuk Berubah (Focusing)',
      pdfUri: 'https://drive.google.com/file/d/1WiWcHWJ8Uuc9ovzhRNt7MQ7k3U1_ekx1/view?usp=sharing',
      imageUri: require('../../assets/cover/focusing.jpg')
    },
    {
      id: '3',
      title: 'Langkah Ketiga: Mendorong Perubahan (Evoking)',
      pdfUri: 'https://drive.google.com/file/d/16n0Sqmhb97ilAlzjxa7T0p0OTVU7HdwF/view?usp=drive_link',
      imageUri: require('../../assets/cover/evoking.jpg')
    },
    {
      id: '4',
      title: 'Langkah Keempat: Membuat Rencana Aksi (Planning)',
      pdfUri: 'https://drive.google.com/file/d/11s5uBDkuEPmr0k5ovuQxklCs-iI_ZTGp/view?usp=sharing',
      imageUri: require('../../assets/cover/planning.jpg')  
    },
  ];

  const [selectedStep, setSelectedStep] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (step) => {
    setSelectedStep(step);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedStep(null);
    setModalVisible(false);
  };

  const renderStep = ({ item }) => (
    <TouchableOpacity style={styles.stepContainer} onPress={() => openModal(item)}>
      <Image source={item.imageUri} style={styles.coverImage} />
      <Text style={styles.stepTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Motivational Interview</Text>

      <FlatList
        data={steps}
        renderItem={renderStep}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            {selectedStep && (
              <WebView
                source={{ uri: selectedStep.pdfUri }}
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
            )}
          </View>
        </View>
      </Modal>
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
  listContainer: {
    paddingBottom: 20,
  },
  stepContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  coverImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  stepTitle: {
    fontSize: 18,
    color: "#2B6CE5",
    fontFamily: "PoppinRegular",
  },
  title: {
    fontSize: 24,
    fontFamily: "PoppinRegular",
    color: "rgba(43, 108, 229, 1)",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#2B6CE5',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  pdf: {
    flex: 1,
  },
});
