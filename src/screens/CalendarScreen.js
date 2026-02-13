import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CalendarScreen({ navigation }) {
  const events = {
    // 🔴 Full (Red)
    "2026-02-05": { color: "#ff4444" },
    "2026-02-24": { color: "#ff4444" },

    // 🟢 Available (Green)
    "2026-02-08": { color: "#22c55e" },
    "2026-02-12": { color: "#22c55e" },
    "2026-02-27": { color: "#22c55e" },

    // 🟠 Medium (Orange) - Replaced the black/grey ones here
    "2026-02-17": { color: "#f59e0b" },
    "2026-02-18": { color: "#f59e0b" },
    "2026-02-25": { color: "#f59e0b" },
  };

  const getMarkedDates = () => {
    const marked = {};
    Object.keys(events).forEach((date) => {
      marked[date] = {
        customStyles: {
          container: {
            backgroundColor: events[date].color,
            borderRadius: 12, // More rounded like the image
            elevation: 2,
          },
          text: { color: "#fff", fontWeight: "700" },
        },
      };
    });
    return marked;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Card Header */}
      <View style={styles.topCard}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule</Text>
        <Text style={styles.subtitle}>View your upcoming hall bookings</Text>
      </View>

      <View style={styles.calendarWrapper}>
        <Calendar
          markingType={"custom"}
          markedDates={getMarkedDates()}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",

            // 🟢 Green for Day Headers (Mon, Tue, etc.)
            textSectionTitleColor: "#2ecc71",

            // 🟠 Orange for "Today" and Interactive elements
            todayTextColor: "#EF7B02",
            arrowColor: "#EF7B02",
            selectedDayBackgroundColor: "#EF7B02",

            // 🔴 Red for the Month Title (June 2026)
            monthTextColor: "#ff7675",

            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "700", // Made bolder to show color better
            textDayFontSize: 14,
            textMonthFontSize: 20,
          }}
          style={styles.calendar}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#2ecc71" }]} />
            <Text style={styles.legendText}>Available</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#f59e0b" }]} />
            <Text style={styles.legendText}>Medium</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: "#ff7675" }]} />
            <Text style={styles.legendText}>Full</Text>
          </View>
        </View>
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
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
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
    fontSize: 24,
    fontWeight: "800",
    color: "#000",
  },
  subtitle: {
    color: "#555",
    fontSize: 14,
  },
  calendarWrapper: {
    paddingHorizontal: 10,
  },
  calendar: {
    borderRadius: 20,
    paddingBottom: 10,
    // Add a slight shadow to make it pop like the image
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6, // Circular dot
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
});
