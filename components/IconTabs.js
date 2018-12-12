import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class IconTabs extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View>
                <Image
                    source={require('../assets/colibri-logo.png')}
                    style={{width: 30, height: 30}}

                />
                <Image
                    source={require('../assets/green-tree.png')}
                    style={{width: 30, height: 30}}

                />
                <Image
                    source={require('../assets/bond-icon.png')}
                    style={{width: 30, height: 30}}

                />
            </View>
        )
    }
}

// add these once the screens exist
// onPress={() => this.props.navigation.navigate('ProfileScreen')}
// onPress={() => this.props.navigation.navigate('ForestScreen')}
// onPress={() => this.props.navigation.navigate('BondsScreen')}
