import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, Keyboard, Button, Image} from 'react-native';
import firebase from 'firebase';
import { ImagePicker, Permissions, Constants } from 'expo';


export default class RegForm extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            uid: '',
            result: null,
            image: null,
            authenticating: false,
            email : '',
            password: '',
            errorMessage : null

        };
        this.onSubmit = this.onSubmit.bind(this);
    }


handleSignUp() {
  //firebase stuff
  console.log("handling sign up!");
}

    componentWillMount() {
        console.log("here is the state: ", this.state);
        firebase.database().ref('/users')
          .on('value', data => {
            // let x = data.toJSON();
            console.log("everything in db: ", data);
          })
    }


    onSubmit() {
      console.log(this.state.firstName);
      if (!this.state.firstName || !this.state.lastName || !this.state.age || !this.state.email || !this.state.password || !this.state.bio) {
        alert("Please fill out all fields")
      } else {
        firebase.database().ref('/users').push(
            {
              id: this.state.uid,
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              age: this.state.age,
              bio: this.state.bio
            }
        )
        }
    }

    askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };

  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result });
    console.log("here is state: ", this.state.result.uri);
  };




    render() {
      let { image } = this.state;
        return (

            <ScrollView style={styles.regform}>

                <Text style={styles.header}>Register</Text>

                <TextInput
                    style={styles.textinput}
                    // I put this.state.uid for testing, works!
                    // placeholder="First Name"
                    placeholder="Email"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                 />

                 <TextInput
                     style={styles.textinput}
                     // I put this.state.uid for testing, works!
                     // placeholder="First Name"
                     placeholder="Password"
                     underlineColorAndroid={'transparent'}
                     onChangeText={(password) => this.setState({password})}
                     value={this.state.password}
                  />

                <TextInput
                    style={styles.textinput}
                    // I put this.state.uid for testing, works!
                    // placeholder="First Name"
                    placeholder="First Name"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(firstName) => this.setState({firstName})}
                 />

                <TextInput
                    style={styles.textinput}
                    placeholder="Last Name"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(lastName) => this.setState({lastName})}
                isRequired={true} />

                <TextInput
                    style={styles.textinput}
                    placeholder="Your Age"
                    underlineColorAndroid={'transparent'}
                    onChangeText={(age) => this.setState({age})}
                />

                <TextInput
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
                          <Image source={{ uri: this.state.result.uri }} style={{ width: 200, height: 200 }} />}




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
