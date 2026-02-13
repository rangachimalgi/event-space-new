import { View, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard.js';
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsScreen() {
  const events = [
    {
      id: '1',
      hall: 'Big Hall 1',
      name: 'John Wedding',
      date: '20 Feb 2026',
    },
    {
      id: '2',
      hall: 'Mini Hall 2',
      name: 'Alex Birthday',
      date: '21 Feb 2026',
    },
    {
      id: '3',
      hall: 'Big Hall 2',
      name: 'Corporate Event',
      date: '22 Feb 2026',
    },
  ];

  const handleEdit = (event) => {
    console.log('Edit:', event);
  };

  const handleDelete = (event) => {
    console.log('Delete:', event);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f5f9',
  },
});
