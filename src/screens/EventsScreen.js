import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, RefreshControl } from "react-native";
import EventCard from "../components/EventCard.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "../config/api";

export default function EventsScreen() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      console.log("Fetching events from:", `${API_BASE_URL}/events`);
      
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${API_BASE_URL}/events`, {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Events fetched successfully:", data.length);
      
      // Format events for display
      const formattedEvents = data.map((event) => ({
        ...event, // Keep all original data first
        id: event._id,
        hallDisplay: event.hall?.name || "Unknown Hall", // String for display
        // Keep original hall object for editing
        dateDisplay: new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        // Keep original date for editing
      }));
      
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      if (error.name === 'AbortError') {
        Alert.alert(
          "Connection Timeout", 
          "Could not connect to server. Make sure:\n1. Server is running (npm run server)\n2. Correct IP address in src/config/api.js\n3. Both devices on same network"
        );
      } else {
        Alert.alert(
          "Error", 
          `Failed to load events: ${error.message}\n\nCheck if server is running on port 8000`
        );
      }
      setEvents([]); // Set empty array on error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );

  const handleEdit = (event) => {
    // TODO: Navigate to edit screen
    console.log("Edit:", event);
  };

  const handleDelete = (event) => {
    Alert.alert(
      "Delete Event",
      `Are you sure you want to delete "${event.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              console.log("Deleting event:", `${API_BASE_URL}/events/${event.id}`);
              
              // Add timeout to fetch
              const controller = new AbortController();
              const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
              
              const response = await fetch(`${API_BASE_URL}/events/${event.id}`, {
                method: "DELETE",
                signal: controller.signal,
              });

              clearTimeout(timeoutId);

              if (!response.ok) {
                throw new Error(`Failed to delete event: ${response.status}`);
              }

              // Refresh events list
              fetchEvents();
              Alert.alert("Success", "Event deleted successfully");
            } catch (error) {
              console.error("Error deleting event:", error);
              if (error.name === 'AbortError') {
                Alert.alert("Connection Timeout", "Could not connect to server. Please try again.");
              } else {
                Alert.alert("Error", `Failed to delete event: ${error.message}`);
              }
            }
          },
        },
      ]
    );
  };

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
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EF7B02" />
          <Text style={styles.loadingText}>Loading events...</Text>
        </View>
      ) : events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={64} color="#cbd5e1" />
          <Text style={styles.emptyText}>No events found</Text>
          <Text style={styles.emptySubtext}>Create your first event from the home screen</Text>
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchEvents} />
          }
          renderItem={({ item }) => (
            <EventCard
              event={item}
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item)}
              onPress={() => navigation.navigate("EventDetails", { event: item })}
            />
          )}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#64748b",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#64748b",
    marginTop: 8,
    textAlign: "center",
  },
});
