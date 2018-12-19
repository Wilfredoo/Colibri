import React from 'react';
import { ActivityIndicator, Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Forest extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {
            users: [],
            showLoading: true,
        };
        this.onPress = this.onPress.bind(this);
    }

    componentDidMount() {
        let whichGender = null;
        if (global_user_gender === 'male') {
            whichGender = 'female';
        } else if (global_user_gender === 'female') {
            whichGender = 'male';
        } else {
            console.warn("Error! This user has no gender somehow!");
        }
        let arrayOfPromises = new Promise((resolve, reject) => {
            firebase.database().ref()
            .child('users').orderByChild('gender').equalTo(whichGender).on('value', data => {
                resolve(Object.values(data.val()))
                this.setState({showLoading: false});
                this.setState({users: Object.values(data.val())});
            })
        })
    }

    onPress(data) {
        global.others_data = data;
        this.props.navigation.navigate('OthersScreen');
    }

    render() {
        return (
            <ScrollView>
            {
                this.state.showLoading &&
                <View>
                    <Image style={styles.bird} source={require('../assets/colibri-logo.png')} />
                    <Text style={styles.loadtext}>Loading</Text>
                    <ActivityIndicator size="large" />
                </View>
            }
            <View style={styles.container}>
            {
                this.state.users.map(data => {
                    return (
                        <View key={data.id} ref={data.id}>
                            <TouchableOpacity onPress={() => this.onPress(data)}>
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
    loadtext: {
        alignSelf: 'center',
        marginBottom: 10,
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
    bird: {
        width: 200,
        height: 200,
        marginTop: 20,
        marginBottom: 50,
        alignSelf: 'center',
    },
});
