import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HallTile from '../components/HallTile';

export default function HomeScreen() {
  const halls = [
    { id: 'BIG_1', name: 'Big Hall 1', status: 'Available', icon: 'business' },
    { id: 'BIG_2', name: 'Big Hall 2', status: 'Booked', icon: 'business' },
    { id: 'MINI_1', name: 'Mini Hall 1', status: 'Available', icon: 'home' },
    { id: 'MINI_2', name: 'Mini Hall 2', status: 'Available', icon: 'home' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Identity Section */}
      <View style={styles.identity}>
        <Text style={styles.title}>Sri Raghavendra Swamy</Text>

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* Tiles */}
      <View style={styles.grid}>
        {halls.map((hall) => (
          <HallTile
            key={hall.id}
            title={hall.name}
            subtitle={hall.status}
            icon={hall.icon}
            onPress={() => console.log(hall)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  identity: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 200,
    borderRadius: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
