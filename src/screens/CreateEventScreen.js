import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateEventScreen({ route, navigation }) {
  const { hall } = route.params;

  const [name, setName] = useState("");
  const [purohitName, setPurohitName] = useState("");
  const [caterername, setCatererName] = useState("");
  const [phone, setPhone] = useState("");
  const [purohitphone, setPurohitPhone] = useState("");
  const [catererphone, setCatererPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [balance, setBalance] = useState("");
  const [advance, setAdvance] = useState("");

  const handleSave = () => {
    console.log({ hall, name, phone, notes, date });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Card */}
      <View style={styles.topCard}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Event</Text>
        <Text style={styles.subtitle}>Add details to book {hall.name}</Text>
      </View>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Event Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowPicker(true)}
          >
            <Text>{date.toDateString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={(e, selected) => {
                setShowPicker(false);
                if (selected) setDate(selected);
              }}
            />
          )}

          <Text style={styles.label}>Devotee Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#a78787"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            placeholderTextColor="#a78787"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Purohit Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#a78787"
            value={purohitName}
            onChangeText={setPurohitName}
          />

          <Text style={styles.label}>Purohit Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            placeholderTextColor="#a78787"
            keyboardType="phone-pad"
            value={purohitphone}
            onChangeText={setPurohitPhone}
          />

          <Text style={styles.label}>Caterer Name</Text>
          <TextInput
            style={styles.input}
            placeholder="John Doe"
            placeholderTextColor="#a78787"
            value={caterername}
            onChangeText={setCatererName}
          />

          <Text style={styles.label}>Caterer Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 9876543210"
            placeholderTextColor="#a78787"
            keyboardType="phone-pad"
            value={catererphone}
            onChangeText={setCatererPhone}
          />

          <Text style={styles.label}>Advance Paid</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#a78787"
            keyboardType="phone-pad"
            value={advance}
            onChangeText={setAdvance}
          />

          <Text style={styles.label}>Balance</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor="#a78787"
            keyboardType="phone-pad"
            value={balance}
            onChangeText={setBalance}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Optional..."
            multiline
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.createBtn} onPress={handleSave}>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  topCard: {
    backgroundColor: "#f1e5dc",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EF7B02",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 6,
    color: "#555",
  },
  form: {
    padding: 16,
  },
  label: {
    marginTop: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 10,
    padding: 12,
    marginTop: 6,
    backgroundColor: "#fff",
  },
  actions: {
    marginTop: "auto",
    padding: 16,
  },
  createBtn: {
    backgroundColor: "#EF7B02",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  createText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancel: {
    textAlign: "center",
    marginTop: 12,
    color: "#64748b",
  },
});
