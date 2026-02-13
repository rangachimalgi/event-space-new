import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import EventCard from "../components/EventCard.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function EventsScreen() {
  const navigation = useNavigation();

  const events = [
    { id: "1", hall: "Big Hall 1", name: "John Wedding", date: "20 Feb 2026" },
    { id: "2", hall: "Mini Hall 2", name: "Alex Birthday", date: "21 Feb 2026" },
    { id: "3", hall: "Big Hall 2", name: "Corporate Event", date: "22 Feb 2026" },
  ];

  const handleEdit = (event) => console.log("Edit:", event);
  const handleDelete = (event) => console.log("Delete:", event);

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.topCard}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Event</Text>
        <Text style={styles.subtitle}>Edit details to book</Text>
      </View>

      {/* Scrollable List */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
            onPress={() => navigation.navigate("EventDetails", { event: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },
  topCard: {
    backgroundColor: "#f1e5dc",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
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
  listContent: {
    padding: 16,
    paddingBottom: 30,
  },
});
