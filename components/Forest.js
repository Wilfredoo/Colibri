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
            users: []
        };
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        if (global_user_gender === 'male') {
            firebase.database().ref('/genders/female').on('value', data => {
                let femaleUsers = Object.keys(data.toJSON());
                const arrayOfPromises = femaleUsers.map(id => {
                    return new Promise((resolve, reject) => {
                        return firebase.database().ref('/users/' + id).on('value', data => {
                            resolve(data.val())
                        })
                    })
                })
                Promise.all(arrayOfPromises)
                .then(results => {
                    this.setState({users: results});
                })
            })
        } else if (global_user_gender === 'female') {
            firebase.database().ref('/genders/male').on('value', data => {
                let maleUsers = Object.keys(data.toJSON());
                const arrayOfPromises = maleUsers.map(id => {
                    return new Promise((resolve, reject) => {
                        return firebase.database().ref('/users/' + id).on('value', data => {
                            resolve(data.val())
                        })
                    })
                })
                Promise.all(arrayOfPromises)
                .then(results => {
                    this.setState({users: results});
                })
            })
        } else {
            console.warn("Error! This user has no gender!");
        }
    }

    onPress(id) {
        global.other_id = id;
        console.log("other_id set: ", other_id);
        this.props.navigation.navigate('OthersScreen');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
            {
                this.state.users.map(data => {
                    return (
                        <View key={data.id}>
                            <TouchableOpacity onPress={() => this.onPress(data.id)}>
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
                </View>
            </ScrollView>
        )
    }

}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
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
        height: 150,
        width: 150,
        borderRadius: 125,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});
