import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EventCard({ event, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{event.hall}</Text>
        <Text style={styles.subtitle}>{event.name}</Text>
        <Text style={styles.date}>{event.date}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
          <Ionicons name="create-outline" size={20} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
          <Ionicons name="trash-outline" size={20} color="#dc2626" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // shadow
    elevation: 2,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  subtitle: {
    color: '#475569',
    marginTop: 2,
  },
  date: {
    color: '#64748b',
    marginTop: 4,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 12,
  },
});
