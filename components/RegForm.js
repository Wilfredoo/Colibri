import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class RegForm extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            uid: '',
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.makeUID = this.makeUID.bind(this);
    }

    makeUID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 64; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log("makeUID result: ", text);
        this.setState({
            uid: text
        })
    }

    componentWillMount() {
        this.makeUID();
    }

    onSubmit() {
        console.log("trying to submit");
        firebase.database().ref(`/users/${this.state.uid}`).set(
            {
            name: this.state.firstName
            }
        ).then(() => {
            console.log("inserted this: ", this.state.firstName);
        })
    }

    render() {
        return (
            <ScrollView style={styles.regform}>
                <Text style={styles.header}>Register</Text>
                <TextInput
                    style={styles.textinput}
                    // I put this.state.uid for testing, works!
                    // placeholder="First Name"
                    placeholder={this.state.uid}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(firstName) => this.setState({firstName})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Last Name"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(lastName) => this.setState({lastName})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Your Age"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(age) => this.setState({age})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Your Email"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Phone Number"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(phone) => this.setState({phone})}
                    value={this.state.phone}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Brief bio (hint: be creative)"
                    secureTextEntry={true} underlineColorAndroid={'transparent'}
                    onChangeText={(bio) => this.setState({bio})}
                    value={this.state.text}
                />
                <TouchableOpacity onPress={this.onSubmit} style={styles.button}>
                    <Text style={styles.btntext}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    regform: {
        alignSelf: 'stretch',
    },
    header: {
        fontSize: 24,
        color: '#fff',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: '#fff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#59cbbd',
        marginTop: 30,
    },
    btntext: {
        color: '#fff',
        fontWeight: 'bold'
    },
});
