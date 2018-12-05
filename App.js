import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Intro from './components/Intro.js';
import RegForm from './components/RegForm.js'

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
