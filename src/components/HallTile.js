import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function HallTile({ title, subtitle, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <LinearGradient
        colors={['#334155', '#1e293b']}
        style={styles.tile}
      >
        <View>
          <Ionicons name={icon} size={28} color="#fff" />

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '48%',
    margin: '1%',
  },
  tile: {
    height: 140,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  subtitle: {
    color: '#cbd5f5',
    fontSize: 12,
    marginTop: 4,
  },
});
