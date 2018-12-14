import React from 'react';
import { Button, BackHandler, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconTabs from './IconTabs.js';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';

class Entrance extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {};
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                global.global_user_id = user.uid;
                console.log("Global User ID set: ", global_user_id);
                firebase.database().ref('/users/' + global_user_id).on('value', data => {
                    var userData = data.toJSON();
                    global.global_user_gender = userData.gender;
                    console.log("global_user_gender set to: ", global_user_gender);
                })
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.container}>Entrance</Text>


            </View>
        )
    }
}

export default withNavigation(Entrance);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});
