import {Notifications} from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {registerForPushNotificationsAsync} from './notifications';

export default class Notifications2 extends React.Component {
  componentWillMount() {
    registerForPushNotificationsAsync();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Testing push Nosstifications</Text>
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
