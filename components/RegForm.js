import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default class RegForm extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        axios.get('https://facebook.github.io/react-native/movies.json').then((res) => { console.warn(res.data.movies)})


        axios.get('/test').then((res) => { console.warn("axios worked")})
    }

    onSubmit() {
        console.log(this.state);
        axios.post('/register').then(() => {
                  // if (resp.data.success) {}
                  console.log("axios response");
              })
              .catch(err => {
                console.log(err);
              })
    }

    render() {
        return (
            <ScrollView style={styles.regform}>
                <Text style={styles.header}>Register</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="First Name"
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
