import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Loading from './components/Loading.js';
import Intro from './components/Intro.js';
import Login from './components/Login.js'
import RegForm from './components/RegForm.js';
import Entrance from './components/Entrance.js';
import firebase from 'firebase';
let secrets = './secrets.json';

// EXAMPLE of Firebase queries
//set = post, on = get, update and remove = delete
// firebase.database().ref('/users/').set(
//     {
//     name: this.state.firstName
//     }
// ).then(() => {
//     console.log("inserted something");
// })
// firebase.database().ref('/users/001').on('value', data => {
//     var whatever = data.toJSON()
//     console.log(whatever.name);
//
// })

var config = {
    apiKey: "AIzaSyDHxYvWmfVhIlXXBi6WaESi3qeynhsL834",
    authDomain: secrets.AUTH_DOMAIN,
    databaseURL: "https://colibri-97b46.firebaseio.com",
    projectId: secrets.PROJECT_ID,
    storageBucket: secrets.STORAGE_BUCKET,
    messagingSenderId: secrets.MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

const AppNavigator = createStackNavigator(
    {
        IntroScreen: Intro,
        RegFormScreen: RegForm,
        IntroScreen: Intro,
        RegFormScreen: RegForm,
        LoginScreen: Login,
        EntranceScreen: Entrance,
        LoadingScreen: Loading,
    },
    {
        initialRouteName: 'LoadingScreen'
    }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
