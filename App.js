import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Intro from './components/Intro.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Intro />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
