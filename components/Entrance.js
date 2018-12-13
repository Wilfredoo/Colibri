import React from 'react';
import { Button, BackHandler, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Entrance extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {
            currentUser: null,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.logoutButton = this.logoutButton.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                console.log("User's email: ", user.email);
                console.log("UID: ", user.uid);
                this.setState({currentUser: user.uid, currentEmail: user.email});
            }
        })
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack('EntranceScreen');
        return true;
    }

    async logoutButton() {
        try {
            await firebase.auth().signOut();
            navigate('IntroScreen');
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.container}>Entrance</Text>

                <Button
                    title="Log Out"
                    onPress={this.logoutButton}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
