import React from 'react';
import { Alert, Dimensions, Image, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
            pic: '',
            peckButtonState: 'Peck',
            peckButtonActive: false
        };
        this.peckButton = this.peckButton.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: others_data.id,
            firstName: others_data.firstName,
            age: others_data.age,
            bio: others_data.bio,
            pic: others_data.pic
        });
        firebase.database().ref(`/bonds/${global_user_id}_${others_data.id}`)
        .on('value', data => {
            if (!data.exists()) {
                firebase.database().ref(`/bonds/${others_data.id}_${global_user_id}`)
                .on('value', data2 => {
                    if (!data2.exists()) {
                        this.setState({peckButtonState: 'Peck', peckButtonActive: true});
                    } else {
                        if(data2.val().bond) {
                            this.setState({peckButtonState: 'Bonded', peckButtonActive: true});
                        } else {
                            this.setState({peckButtonState: 'Peck Back', peckButtonActive: true});
                        }
                    }
                })
            } else {
                if(data.val().bond) {
                    this.setState({peckButtonState: 'Bonded', peckButtonActive: true});
                } else {
                    this.setState({peckButtonState: 'Pecked', peckButtonActive: true});
                }
            }
        })
    }

    peckButton() {
        if(this.state.peckButtonActive) {
            if(this.state.peckButtonState === 'Peck') {
                Alert.alert(
                    "😍 Oh yeah! ❤️",
                    `You pecked ${this.state.firstName}!`
                );
                this.setState({peckButtonState: 'Pecked'});
                let bond_pair = `${global_user_id}_${others_data.id}`;
                firebase.database().ref('/bonds/' + bond_pair).set({
                    bond: false
                })
            } else if (this.state.peckButtonState === 'Peck Back') {
                Alert.alert(
                    "Congratulations!",
                    `You bonded with ${this.state.firstName}!`
                );
                this.setState({peckButtonState: 'Bonded'});
                let bond_pair2 = `${others_data.id}_${global_user_id}`;
                firebase.database().ref('/bonds/' + bond_pair2)
                .update({bond: true});
            } else if (this.state.peckButtonState === 'Bonded') {
                // Link to Video Chat component
            } else {
                Alert.alert(
                    "Patience Grasshopper!",
                    `You already pecked ${this.state.firstName}. Maybe they'll peck you back, maybe not! 😉`
                )
            }
        }
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
                <View style={styles.button}>
                {
                    this.state.peckButtonState === 'Peck' &&
                    this.state.peckButtonActive === true &&
                    <Button
                        onPress={this.peckButton}
                        title="Peck"
                        color="purple"
                    />
                }
                {
                    this.state.peckButtonState === 'Pecked' &&
                    this.state.peckButtonActive === true &&
                    <Button
                        onPress={this.peckButton}
                        title="Pecked!"
                        color="green"
                    />
                }
                {
                    this.state.peckButtonState === 'Peck Back' &&
                    this.state.peckButtonActive === true &&
                    <Button
                        onPress={this.peckButton}
                        title="Peck back!"
                        color="blue"
                    />
                }
                {
                    this.state.peckButtonState === 'Bonded' &&
                    this.state.peckButtonActive === true &&
                    <Button
                        onPress={this.peckButton}
                        title="Video Chat"
                        color="red"
                    />
                }
                </View>
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
