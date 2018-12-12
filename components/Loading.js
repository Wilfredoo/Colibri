import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class Loading extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'EntranceScreen' : 'IntroScreen')
        })
    }

    // THIS IS JUST FOR TESTING!! Remove when live
    // componentDidMount() {
    //     firebase.auth().signOut().then(function() {
    //         console.log(" ");
    //         console.log('Signed Out, remove this from Intro.js when going live.');
    //         console.log(" ");
    //     }, function(error) {
    //         console.error('Sign Out Error', error);
    //     })
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading</Text>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
