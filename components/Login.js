import React from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';

export default class Login extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            disabled: true
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

    onSubmit(evt) {
        evt.preventDefault();
        firebase
            .auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                clearInterval(this.checker);
                firebase.database().ref('/users/' + global_user_id).on('value', data => {
                    var userData = data.toJSON();
                    global.global_user_gender = userData.gender;
                    console.log("global_user_gender set: ", global_user_gender);
                    this.props.navigation.navigate('EntranceScreen');
                })
            })
            .catch(error => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert('Please double check email and password.');
                }
            });
    }

    checkLength() {
        if(this.state.email.length > 2 && this.state.password.length > 5) {
            this.setState({disabled:false});
        } else {
            this.setState({disabled:true});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Log In</Text>
                <View>
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
                        onChangeText={password => this.setState({password})}
                    />
                    <View style={styles.button}>
                        <Button
                        title="Let's Go!"
                        onPress={this.onSubmit}
                        disabled={this.state.disabled}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    header: {
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
