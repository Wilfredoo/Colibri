import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class IconTabs extends React.Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <View style={styles.rowContainer}>
                <Image
                    source={require('../assets/colibri-logo.png')}
                    style={styles.bird}

                />
                <Image
                    source={require('../assets/green-tree.png')}
                    style={styles.tree}

                />
                <Image
                    source={require('../assets/bond-icon.png')}
                    style={styles.bond}

                />
            </View>
        )
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 30,
    },
    bird: {
        width: deviceWidth / 4,
        height: 150,
        marginTop: -30,
    },
    tree: {
        width: deviceWidth / 4,
        height: 100,
    },
    bond: {
        width: deviceWidth / 4,
        height: 75,
        marginTop: 10,
    },
})

// add these once the screens exist
// onPress={() => this.props.navigation.navigate('ProfileScreen')}
// onPress={() => this.props.navigation.navigate('ForestScreen')}
// onPress={() => this.props.navigation.navigate('BondsScreen')}
