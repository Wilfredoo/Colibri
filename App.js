import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Intro from './components/Intro.js';
import RegForm from './components/RegForm.js';
import firebase from 'firebase';
let secrets = './secrets.json';


const AppNavigator = createStackNavigator(
    {
        IntroScreen: Intro,
        RegFormScreen: RegForm,
    },
    {
        initialRouteName: 'IntroScreen'
    }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {

  componentWillMount() {
    console.log("im working for sure");
    var config = {
    apiKey: secrets.API_KEY,
    authDomain: secrets.AUTH_DOMAIN,
    databaseURL: "https://colibri-97b46.firebaseio.com",
    projectId: secrets.PROJECT_ID,
    storageBucket: secrets.STORAGE_BUCKET,
    messagingSenderId: secrets.MESSAGING_SENDER_ID,
  };
  firebase.initializeApp(config);

  //set = post, on = get, update and remove = delete
  firebase.database().ref('/users/004').set(
    {
      id: ref().key,
      name: 'tester',
      age: 5,
      x: 3
    }
  ).then(() => {
    console.log("inserted something");
  })
  // console.log(firebase);
  }



    render() {
        return <AppContainer style={styles.container} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
