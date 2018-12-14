import React from 'react';
import { Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Forest extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        if (global_user_gender === 'male') {
            console.log("female users: ");
        } else if (global_user_gender === 'female') {
            firebase.database().ref('/genders/male').on('value', data => {
                let maleUsers = Object.keys(data.toJSON())
                console.log("male users: ", maleUsers);
                // let arrayOfPromises = [];
                // for (let i = 0; i < maleUsers.length; i++) {
                //     arrayOfPromises.push(firebase.database().ref('/users/' + maleUsers[i]).on('value', s => s))
                // }
                const arrayOfPromises = maleUsers.map(id => {
                    return firebase.database().ref().child('users').child(id).on('value', s => s)
                })
                console.log(arrayOfPromises);
                Promise.all(arrayOfPromises).then(results => {
                    console.log("results: ", results);
                })
            })
        } else {
            console.warn("Error! This user has no gender!");
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text>Forest</Text>
            </ScrollView>
        )
    }

}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 10,
    },
    text2: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        marginLeft: 20,
        marginRight: 20,
        height: 100,
    },
    button: {
        width: deviceWidth - 40,
        paddingTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    circleimage: {
        height: 250,
        width: 250,
        borderRadius: 125,
        alignSelf: 'center',
        marginTop: 10,
    },
});
