import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DailyTaskHomePage} from '../DailyTask/DailyTaskHomePage';

export const HomePage = () => {
  return (
    <View style={styles.container}>
      <DailyTaskHomePage />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: 'orange',
    fontSize: 24,
    fontWeight: 'bold',
  },
  flag: {
    borderBottomColor: 'green',
    borderTopColor: 'orange',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderWidth: 2,
    alignSelf: 'stretch',
  },
});
