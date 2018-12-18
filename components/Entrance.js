import React from 'react';
import { Button, BackHandler, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconTabs from './IconTabs.js';
import { withNavigation } from 'react-navigation';
import {Video} from 'expo';
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
                <Text>Entrance</Text>
                <Video
                    source={{uri: 'https://firebasestorage.googleapis.com/v0/b/colibri-97b46.appspot.com/o/157642ae-699d-4b44-a7fa-d092f6c2cb84?alt=media&token=565c64e6-1be5-4aad-a80e-b7a53378dfc5'}}
                    style={{width: 300, height: 300}}
                    shouldPlay
                    isMuted={false}
                />

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
