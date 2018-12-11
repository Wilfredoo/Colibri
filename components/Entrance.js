import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';

export default class Entrance extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {}
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("User's email: ", user.email);
                console.log("UID: ", user.uid);
            }
        })

        // firebase.database().ref('/users/' + this.state.uid).push(
        //     {
        //       firstName: this.state.firstName,
        //       lastName: this.state.lastName,
        //       age: this.state.age,
        //       bio: this.state.bio
        //     }
        // )
    }

    render() {
        return (
            <View>
                <Text>Entrance</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
