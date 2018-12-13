// this one looks great, you can record and pause and watch the video you just created, and its flipped already, no audio though.

import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Camera,  Permissions, Video } from 'expo';

export default class VideoPage extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      video: null,
      recording: false,
      stopping: false
    }

    this.cameraRef = null;
    this.setRef = this.setRef.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.reset = this.reset.bind(this);
  }

  async componentDidMount(){
    let cStatus = await Permissions.askAsync(Permissions.CAMERA);
    let aStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    if (cStatus.status !== "granted")
      alert("1 This won't work without permission: " + cStatus.status);

    aStatus = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (aStatus.status !== "granted")
      alert("2 This won't work without permission: " + aStatus.status);
  }

  startRecording = () => {
    this.setState({recording: true});

    this.cameraRef.recordAsync({maxDuration : 2, mute : true})
      .then((video) => this.setState({video: video, recording: false}));
  }

  stopRecording = () => {
    console.log(this.state);
    this.setState({ stopping: true });
    this.cameraRef.stopRecording();
  }

  renderPlayback = () => {

    const W = Dimensions.get("window").width;
    const P = Math.floor( W / 2) - 50;

    return(
      <View style={{flex: 1}}>

        <Video source={{ uri: this.state.video.uri}} useNativeControls={true} style={{ width: W, height: W }} resizeMode="cover" />
        <TouchableOpacity onPress={() => this.reset()}
            style={{width: 100, height: 40, position: "absolute", borderRadius: 8, borderColor: "red", borderWidth: 1, bottom: 50, left: P, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: "red"}}>RESET</Text>
        </TouchableOpacity>
      </View>

    )

  }

  reset() {
    this.setState({video: null, stopping: false, recording: false});
  }

  setRef(ref){
    console.log("Setting this.cameraRef to " + ref);
    this.cameraRef = ref;
  }

  renderCamera = () => {

    const W = Dimensions.get("window").width;
    const P = Math.floor( W / 2) - 50;

    let bColor = this.state.stopping ? "blue" : "red" ;

    return(
      <View style={{flex: 1}}>
        <Camera
            style={{ width: W, height: W, borderColor: "red" }}
            type={Camera.Constants.Type.front}
            ref={this.setRef}
          />

        {!this.state.recording &&
          <TouchableOpacity onPress={() => this.startRecording()}
            style={{width: 100, height: 40, position: "absolute", borderRadius: 8, borderColor: "red", borderWidth: 1, bottom: 50, left: P, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: "red"}}>START</Text>
          </TouchableOpacity>
        }

        {this.state.recording &&
          <TouchableOpacity onPress={() => this.stopRecording()}
            style={{width: 100, height: 40, position: "absolute", borderRadius: 8, borderColor: bColor, borderWidth: 1, bottom: 50, left: P, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: bColor}}>STOP</Text>
          </TouchableOpacity>
        }
      </View>
    )

  }

  render() {

      return (
        <View style={styles.pbcontainer}>

          {this.state.video === null && this.renderCamera()}

          {this.state.video !== null && this.renderPlayback()}

        </View>
      );

  }
}

const styles = StyleSheet.create({

  pbcontainer: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
