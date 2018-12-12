import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Entrance extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {
            currentUser: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("User's email: ", user.email);
                console.log("UID: ", user.uid);
                this.setState({currentUser: user.uid, currentEmail: user.email});
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
            <View style={styles.container}>
                <Text style={styles.container}>Entrance</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
