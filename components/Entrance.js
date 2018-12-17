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
