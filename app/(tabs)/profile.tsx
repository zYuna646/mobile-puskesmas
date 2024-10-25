import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import useApi from "@/hooks/useApi";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Profile() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [user, setUser] = useState<any>({
    id: null,
    name: "",
    birth_date: "",
    phone: "",
  });
  const { get, post, put, remove, data, loading, error } = useApi(
    process.env.EXPO_PUBLIC_API as string
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(data);
  

  const handleSave = async () => {
    try {
      await post("/respondens", user);
      if (data.success) {
        if (data.already_registered) {
          await put(`/respondens/${data.data.id}`, user);
          console.log("Data Updated:", data.data);
          setUser(data.data);
          await AsyncStorage.setItem('user', JSON.stringify(data.data));
        } else {
          console.log("Data Created:", data.data);
          setUser(data.data);
          await AsyncStorage.setItem('user', JSON.stringify(data.data));
        }
        
        // Menampilkan notifikasi sukses
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: "Data saved successfully",
        });
      }
    } catch (error) {
      // Menampilkan notifikasi error
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred while saving the data",
      });
      console.log(error);
    }
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate ? new Date(selectedDate) : new Date(user.birth_date);
    
    const formattedDate = currentDate.toISOString().split('T')[0]

    setShowDatePicker(false);
    setUser({ ...user, birth_date: formattedDate });
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
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Masukkan nama"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Tanggal Lahir</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {user.birth_date
              ? new Date(user.birth_date).toLocaleDateString()
              : "Pilih tanggal"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <RNDateTimePicker
          value={user.birth_date ? new Date(user.birth_date) : new Date()}

            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()} // Prevents selecting future dates
          />
        )}

        <Text style={styles.label}>Nomor Telepon</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={(text) => setUser({ ...user, phone: text })}
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
    paddingTop: Platform.OS === "android" ? 50 : 0,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  profileIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    color: "#333",
  },
  dateText: {
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#0087FF",
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
