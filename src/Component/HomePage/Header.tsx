import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.headerTitle}>Hello Sohel,</Text>
        <Text style={styles.headerSubtitle}>Welcome Back</Text>
      </View>
      <TouchableOpacity style={styles.bellButton}>
        <Image
          source={require('../assets/bell.png')}
          style={styles.bellImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#555',
  },
  bellButton: {
    padding: 8,
  },
  bellImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
