import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

export default class Loading extends React.Component {
    static navigationOptions = {
        header: null,
    }

    componentDidMount() {
        console.log("checking if signed in");
        global.global_user_gender = null;
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                global.global_user_id = user.uid;
                console.log("Global User ID set: ", global_user_id);
                firebase.database().ref('/users/' + global_user_id).on('value', data => {
                    var userData = data.toJSON();
                    global.global_user_gender = userData.gender;
                    console.log("global_user_gender set: ", global_user_gender);
                    this.props.navigation.navigate(user ? 'EntranceScreen' : 'IntroScreen');
                })
            } else {
                this.props.navigation.navigate('IntroScreen');
            }
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
