import React from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Keyboard, Button, Image} from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import firebase from 'firebase';


export default class RegForm extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            result: null,
            image: null,
            authenticating: false,
            email : '',
            password: '',
            errorMessage : null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        if (!this.state.firstName || !this.state.lastName || !this.state.age || !this.state.email || !this.state.password || !this.state.bio) {
            alert("Please fill out all fields.");
        } else {
            let self = this;
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(data){
                console.log("user uid: ", data.user.uid)
                console.log("what is the state: ", self.state);
                firebase.database().ref('/users/' + data.user.uid).set({
                    firstName: self.state.firstName,
                    lastName: self.state.lastName,
                    age: self.state.age,
                    bio: self.state.bio,
                    pic: self.state.result.base64
                })
                .then(() => {
                    this.props.navigation.navigate('EntranceScreen')
                })
            })
            .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    useLibraryHandler = async () => {
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64: true,
        });
        this.setState({ result });
    };

    render() {
        let { image } = this.state;
        return (
            <ScrollView style={styles.regform}>
                <Text style={styles.header}>Register</Text>
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    underlineColorAndroid={'transparent'}
                    autoFocus
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.secondTextInput.focus();}}
                    onChangeText={email => this.setState({email})}
                />
                <TextInput
                    ref={(input) => {this.secondTextInput = input;}}
                    style={styles.textinput}
                    placeholder="Password"
                    autoCapitalize="none"
                    underlineColorAndroid={'transparent'}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.thirdTextInput.focus();}}
                    onChangeText={password => this.setState({password})}
                />
                <TextInput
                    ref={(input) => {this.thirdTextInput = input;}}
                    style={styles.textinput}
                    placeholder="First Name"
                    underlineColorAndroid={'transparent'}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.fourthTextInput.focus();}}
                    onChangeText={(firstName) => this.setState({firstName})}
                />
                <TextInput
                    ref={(input) => {this.fourthTextInput = input;}}
                    style={styles.textinput}
                    placeholder="Last Name"
                    underlineColorAndroid={'transparent'}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.fifthTextInput.focus();}}
                    onChangeText={(lastName) => this.setState({lastName})}
                    isRequired={true}
                />
                <TextInput
                    ref={(input) => {this.fifthTextInput = input;}}
                    style={styles.textinput}
                    keyboardType="numeric"
                    placeholder="Your Age"
                    underlineColorAndroid={'transparent'}
                    returnKeyType = {"next"}
                    onSubmitEditing={() => {this.sixthTextInput.focus();}}
                    onChangeText={(age) => this.setState({age})}
                />
                <TextInput
                    ref={(input) => {this.sixthTextInput = input;}}
                    style={styles.textinput}
                    placeholder="Brief bio (hint: be creative)"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(bio) => this.setState({bio})}
                    value={this.state.text}
                />
                <Button
                    title="Upload Profile Pic"
                    onPress={this.useLibraryHandler}
                />
                {this.state && this.state.result &&
                <Image source={{ uri: `data:image/gif;base64,${this.state.result.base64}` }} style={{ width: 200, height: 200 }} />}
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
        color: 'black',
        paddingBottom: 10,
        marginBottom: 40,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        color: 'black',
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
