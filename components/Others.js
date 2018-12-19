import React from 'react';
import { Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconTabs from './IconTabs.js';
import firebase from 'firebase';

export default class Others extends React.Component {
    static navigationOptions = {
        header: <IconTabs />,
    }

    constructor() {
        super();
        this.state = {
            id: '',
            firstName: '',
            age: '',
            bio: '',
            pic: ''
        };
    }

    componentDidMount() {
        this.setState({
            id: others_data.id,
            firstName: others_data.firstName,
            age: others_data.age,
            bio: others_data.bio,
            pic: others_data.pic
        })
    }

    find_dimesions(layout){
        const {x, y, width, height} = layout;
        // console.log("profile x",x);
        // console.log("profile y",y);
        // console.log("profile w",width);
        // console.log("profile h",height);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: `data:image/gif;base64,${this.state.pic}`}}
                    style={styles.circleimage}
                    onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout)}}
                />
                <Text style={styles.text}>{this.state.firstName}, {this.state.age}</Text>
                <Text style={styles.text2}>{this.state.bio}</Text>
            </View>
        )
    }
}

let deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    text: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 20,
        marginBottom: 10,
    },
    text2: {
        textAlign: 'center',
        fontSize: 20,
        fontStyle: 'italic',
        marginLeft: 20,
        marginRight: 20,
        height: 100,
    },
    button: {
        width: deviceWidth - 40,
        paddingTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    circleimage: {
        height: 250,
        width: 250,
        borderRadius: 125,
        alignSelf: 'center',
        marginTop: 10,
    },
});
