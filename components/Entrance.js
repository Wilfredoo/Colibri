import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Entrance extends React.Component {
    static navigationOptions = {
        header: null,
    }

    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <View>
                <Text>Entrance</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});
