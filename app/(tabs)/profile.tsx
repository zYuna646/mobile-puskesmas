import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
  } from 'react-native';
  import React, { useState } from 'react';
  import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
  import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

  export default function Profile() {
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const handleSave = () => {
      // Logic for saving profile data
      console.log('Profile saved:', {
        name,
        birthDate: birthDate.toLocaleDateString(),
        phoneNumber,
      });
    };
  
    const onChangeDate = (event: any, selectedDate: any) => {
      const currentDate = selectedDate || birthDate;
      setShowDatePicker(false);
      setBirthDate(currentDate);
    };
  
    return (
      <View style={styles.container}>
        {/* Icon Profile in the Center */}
        <View style={styles.profileIconContainer}>
          <FontAwesome5 name="user-circle" size={100} color="#0087FF" />
        </View>
  
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Masukkan nama"
            placeholderTextColor="#999"
          />
  
          <Text style={styles.label}>Tanggal Lahir</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {birthDate ? birthDate.toLocaleDateString() : 'Pilih tanggal'}
            </Text>
          </TouchableOpacity>
  
          {showDatePicker && (
            <RNDateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()} // Prevents selecting future dates
            />
          )}
  
          <Text style={styles.label}>Nomor Telepon</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Masukkan nomor telepon"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
          />
  
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Simpan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? 50 : 0,
      backgroundColor: '#F5F5F5',
      paddingHorizontal: 20,
    },
    profileIconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    formContainer: {
      marginTop: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    input: {
      backgroundColor: '#FFF',
      borderRadius: 8,
      padding: 12,
      marginBottom: 15,
      fontSize: 16,
      borderWidth: 1,
      borderColor: '#DDD',
      color: '#333',
    },
    dateText: {
      color: '#333',
    },
    saveButton: {
      backgroundColor: '#0087FF',
      paddingVertical: 15,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  