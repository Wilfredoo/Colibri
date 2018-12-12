import React from 'react';
import { View, Dimensions, StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Keyboard, Button, Image } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import RadioGroup from 'react-native-radio-buttons-group';
import firebase from 'firebase';


export default class RegForm extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            result: null,
            image: null,
            authenticating: false,
            email : '',
            password: '',
            errorMessage : null,
            disabled: true,
            gender: '',
            data: [
                {
                    label: 'Male',
                    color: 'blue',
                },
                {
                    label: 'Female',
                    color: 'pink',
                }
            ]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.checkLength = this.checkLength.bind(this);
    }

    componentDidMount() {
        this.checker = setInterval(
            () => this.checkLength(),
            250
        );
    }

    componentWillUnmount() {
        clearInterval(this.checker);
    }

    checkLength() {
        if(this.state.email.length > 6 && this.state.password.length > 5 && this.state.bio
           && this.state.firstName && this.state.lastName && this.state.age) {
            this.setState({disabled:false});
        } else {
            this.setState({disabled:true});
        }
    }

    onSubmit() {
        if (!this.state.firstName || !this.state.lastName || !this.state.age || !this.state.email || !this.state.password || !this.state.bio) {
            alert("Please fill out all fields.");
        } else {
            console.ignoredYellowBox = ['Setting a timer'];
            let self = this;
            if (this.state.data[0].selected) {
                self.setState({gender: 'male'});
            } else if (this.state.data[1].selected) {
                self.setState({gender: 'female'});
            }
            firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(function(data){
                firebase.database().ref('/users/' + self.state.gender + '/' + data.user.uid).set({
                    firstName: self.state.firstName,
                    lastName: self.state.lastName,
                    age: self.state.age,
                    bio: self.state.bio,
                    pic: self.state.result.base64
                })
            .catch(error => {console.error(error);})
                .then(() => {
                    this.props.navigation.navigate('EntranceScreen')
                })
                .catch(error => {console.error(error);})
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

    onPress = (data) => {
        this.setState({ data });
    };

    render() {
        let { image } = this.state;
        let selectedButton = this.state.data.find(e => e.selected == true);
        selectedButton = selectedButton ? selectedButton.value : this.state.data[0].label;
        return (
            <ScrollView style={styles.container}>
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
                    onChangeText={(lastName) => this.setState({lastName})}
                    isRequired={true}
                />
                <View>
                    <Text>Select Gender</Text>
                    <RadioGroup
                        radioButtons={this.state.data}
                        onPress={this.onPress}
                    />
                </View>
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
                {this.state && this.state.result && <Image
                    source={{ uri: `data:image/gif;base64,${this.state.result.base64}` }}
                    style={{ width: 200, height: 200 }}
                />}
                <View style={styles.button}>
                    <Button
                    title="Sign Up"
                    onPress={this.onSubmit}
                    disabled={this.state.disabled}
                    />
                </View>
            </ScrollView>
        );
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'center',
    },
    header: {
        alignSelf: 'center',
        fontSize: 24,
        paddingBottom: 10,
        marginBottom: 40,
        marginTop: 50,
        borderBottomColor: '#199187',
        borderBottomWidth: 1,
    },
    textinput: {
        alignSelf: 'stretch',
        height: 40,
        marginBottom: 30,
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: 1,
    },
    button: {
        width: deviceWidth - 40,
        marginBottom: 10,
        paddingTop: 10,
        flex: 1,
    },
});
