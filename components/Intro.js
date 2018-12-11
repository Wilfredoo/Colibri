import React from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';

export default class Intro extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {
            place: 'a',
            text: "Welcome to Colibri. Click the arrow for a quick intro."
        };

        this.onPressButton = this.onPressButton.bind(this);
    }

    // THIS IS JUST FOR TESTING!! Remove when live
    componentDidMount() {
        firebase.auth().signOut().then(function() {
            console.log(" ");
            console.log('Signed Out, remove this from Intro.js when going live.');
            console.log(" ");
        }, function(error) {
            console.error('Sign Out Error', error);
        })
    }

    onPressButton() {
        if(this.state.place === 'a') {
            this.setState({
                place: 'b',
                text: "Once you log in you can enter the Forest, where there are other birds from around Berlin. Ohhh..."
            });
        } else if (this.state.place === 'b') {
            this.setState({
                place: 'c',
                text: "You can peck the ones you like, but you only have 3 pecks, so choose wisely. ~ When you peck someone they'll turn Green in your Forest and when someone pecks you they'll turn Blue."
            });
        } else if (this.state.place === 'c') {
            this.setState({
                place: 'd',
                text: "If you and someone pecked each other, you'll create a bond and they'll turn red in your Forest. ~ And that's it for now!"
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.bird} source={require('../assets/colibri-logo.png')} />
                <View style={styles.textarea}>
                    <Text style={{fontSize: 18}}>{this.state.text}</Text>
                </View>
                <TouchableOpacity style={this.arrow} onPress={this.onPressButton}>
                    <Image style={{alignSelf: 'stretch'}} source={require('../assets/right-arrow.png')} />
                </TouchableOpacity>
                <View style={styles.button}>
                    <View>
                        <Button
                            onPress={() => this.props.navigation.navigate('RegFormScreen')}
                            title="Register"
                            color='purple'
                        />
                    </View>
                    <View style={{flex:0.4}}/>
                    <View>
                        <Button
                            onPress={() => this.props.navigation.navigate('LoginScreen')}
                            title="Log In"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bird: {
        width: 350,
        height: 350,
        marginTop: -50,
        marginBottom: -50,
    },
    button: {
        width: deviceWidth - 40,
        marginBottom: 10,
        paddingTop: 10,
        flex: 1,
    },
    arrow: {
        marginTop: 10,
        marginBottom: 50,
    },
    textarea: {
        height: 110,
        marginLeft: 20,
        marginRight: 20,
    }
});
