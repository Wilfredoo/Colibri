import React from 'react';
import { Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Forest extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {
            colibris: []
        };
    }

    componentDidMount() {
        if (global_user_gender === 'male') {
            console.log("female users: ");
        } else if (global_user_gender === 'female') {
            firebase.database().ref('/genders/male').on('value', data => {
                let maleUsers = Object.keys(data.toJSON());
                const arrayOfPromises = maleUsers.map(id => {
                    return new Promise((resolve, reject) => {
                        return firebase.database().ref('/users/' + id).on('value', data => {
                            resolve(data)
                        })
                    })
                })
                Promise.all(arrayOfPromises)
                .then(results => {
                    this.setState({colibris: results});
                    // console.log(this.state.colibris);
                })
            })
        } else {
            console.warn("Error! This user has no gender!");
        }
    }

    render() {
        // console.log(this.state);
        return (
            <ScrollView style={styles.container}>
            {
                this.state.colibris.map(data => {
                    console.log("data: ",data);
                    console.log("id: ", data.id);
                    console.log("name: ", data.firstName);
                    console.log("age: ", data.age);
                    return (
                        <View>
                            <TouchableOpacity key={data.id}>
                                <Image
                                    source={{uri: `data:image/gif;base64,${data.pic}`}}
                                    style={styles.circleimage}
                                />
                            </TouchableOpacity>
                            <Text>{data.bio}</Text>
                        </View>
                    )
                })
            }

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
