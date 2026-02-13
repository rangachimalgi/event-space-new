import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventDetailsScreen({ route, navigation }) {
  const { event } = route.params;
  // Add these inside your EventDetailsScreen component
  const [name, setName] = useState(event.name || "");
  const [phone, setPhone] = useState(event.phone || "");
  const [purohitName, setPurohitName] = useState(event.purohitName || "");
  const [purohitphone, setPurohitPhone] = useState(event.purohitPhone || "");
  const [caterername, setCatererName] = useState(event.catererName || "");
  const [catererphone, setCatererPhone] = useState(event.catererPhone || "");
  const [advance, setAdvance] = useState(event.advancePaid?.toString() || "");
  const [balance, setBalance] = useState(event.balance?.toString() || "");
  const [notes, setNotes] = useState(event.notes || "");
  const [date, setDate] = useState(
    event.date ? new Date(event.date) : new Date(),
  );
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    console.log("Updated:", { name, phone, notes, date });
    navigation.goBack();
  };

  const handleDelete = () => {
    console.log("Deleted:", event);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Card - Now touches the edges */}
      <View style={styles.topCard}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>{event.hall}</Text>
        <Text style={styles.subtitle}>Edit Event Details</Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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
            placeholder="0"
            placeholderTextColor="#a78787"
            keyboardType="numeric"
            value={advance}
            onChangeText={setAdvance}
          />

          <Text style={styles.label}>Balance</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#a78787"
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
          />

          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Optional..."
            placeholderTextColor="#a78787"
            multiline
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>
      {/* Actions Row */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
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
    padding: 24, // Increased padding for better look
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EF7B02",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    marginTop: 4,
    color: "#555",
    fontSize: 15,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  form: {
    marginTop: 10,
  },
  label: {
    marginTop: 16,
    fontWeight: "600",
    color: "#475569",
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 14,
    marginTop: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30, // Spaced out from the notes
  },
  saveBtn: {
    flex: 2, // Save button gets more space
    backgroundColor: "#0f172a",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginRight: 8,
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: "#fee2e2",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginLeft: 8,
  },
  deleteText: {
    color: "#dc2626",
    fontWeight: "700",
  },
});
