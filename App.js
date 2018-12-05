import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

import Regform from './regform.js'


import Intro from './components/Intro.js';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Regform />
        // <Intro />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60
  },
});
