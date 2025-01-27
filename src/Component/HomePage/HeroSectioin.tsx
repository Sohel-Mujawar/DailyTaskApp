import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const HeroSection = () => {
  const {width} = Dimensions.get('window');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      {/* First Card */}
      <View style={[styles.card, {width: width * 0.8}]}>
        <Text style={styles.title}>Today</Text>
        <Text style={styles.subtitle}>2/10 Tasks</Text>
        <Image
          source={require('../assets/hero-image.jpg')}
          style={styles.image}
        />
      </View>

      {/* Second Card */}
      <View style={[styles.card, {width: width * 0.8}]}>
        <Text style={styles.title}>Upcoming</Text>
        <Text style={styles.subtitle}>5 Events</Text>
        <Image
          source={require('../assets/hero-image.jpg')}
          style={styles.image}
        />
      </View>

      {/* Third Card */}
      <View style={[styles.card, {width: width * 0.8}]}>
        <Text style={styles.title}>Progress</Text>
        <Text style={styles.subtitle}>50% Complete</Text>
        <Image
          source={require('../assets/progress.jpg')}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    height: 150,
    marginHorizontal: 10,
    backgroundColor: '#1abc9c',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 5,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});

export default HeroSection;
