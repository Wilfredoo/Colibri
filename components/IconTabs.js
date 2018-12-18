import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { withNavigation } from 'react-navigation';

class IconTabs extends React.Component {
    static navigationOptions = {
        header: null,
    }

    find_dimesions(layout){
        const {x, y, width, height} = layout;
        // console.log("tabicons x",x);
        // console.log("tabicons y",y);
        // console.log("tabicons w",width);
        // console.log("tabicons h",height);
    }

    render() {
        return (
            <View style={styles.rowContainer}
            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout)}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProfileScreen')}>
                    <Image
                        source={require('../assets/colibri-logo.png')}
                        style={styles.bird}
                    />
                </TouchableOpacity>
                <Image
                    source={require('../assets/green-tree.png')}
                    style={styles.tree}

                />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('EntranceScreen')}>
                    <Image
                        source={require('../assets/bond-icon.png')}
                        style={styles.bond}
                        onPress={() => this.props.navigation.navigate('')}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

export default withNavigation(IconTabs);

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
// onPress={() => this.props.navigation.navigate('ForestScreen')}
// onPress={() => this.props.navigation.navigate('BondsScreen')}
