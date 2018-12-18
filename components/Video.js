// this one looks great, you can record and pause and watch the video you just created, and its flipped already, no audio though.

import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Constants, Camera,  Permissions, Video } from 'expo';
import uuid from 'uuid';
import * as firebase from 'firebase';


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
    this.callingTwoFunctions = this.callingTwoFunctions.bind(this);
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

    this.cameraRef.recordAsync({maxDuration : 2})
      .then((video) => this.setState({video: video, recording: false}));
  }

  stopRecording = () => {
    console.log("state", this.state.video);
    this.setState({ stopping: true });
    this.cameraRef.stopRecording();
  }

  renderPlayback = () => {
    console.log("i want only the uri: ", this.state.video.uri);
    this.callingTwoFunctions()

    const W = Dimensions.get("window").width;
    const P = Math.floor( W / 2) - 50;

    return(
      <View style={{flex: 1}}>

        <Video source={{ uri: this.state.video.uri}} useNativeControls={true} style={{ width: W, height: W }} resizeMode="cover" />
        <Video source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/colibri-97b46.appspot.com/o/582c395b-35a3-4cac-8e4c-4a848b88363b'}} useNativeControls={true} style={{ width: W, height: W }} resizeMode="cover" />
        <TouchableOpacity onPress={() => this.reset()}
            style={{width: 100, height: 40, position: "absolute", borderRadius: 8, borderColor: "red", borderWidth: 1, bottom: 50, left: P, justifyContent: "center", alignItems: "center" }}>
            <Text style={{color: "red"}}>RESET</Text>
        </TouchableOpacity>
      </View>
    )
  }

  async callingTwoFunctions() {
    var url1 = await this.urlToBlob()
    var url2 = await this.blobToFirebase(url1);
  }

   urlToBlob = () => {
    console.log("Im happening");
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                resolve(xhr.response);
            }
        };
        xhr.open('GET', this.state.video.uri);
        xhr.responseType = 'blob'; // convert type
        xhr.send();
    })
    }

  blobToFirebase = async (blob) => {
  const storage = firebase.storage();
  // console.log("storageEEE: ", storage);
  const storageRef = storage.ref();
  // console.log("storageREEEEF: ", storageRef);
  const videoRef = storageRef.child(uuid.v4())

  const snapshot = await videoRef.put(blob);
  return snapshot.downloadURL;
  }

  componentDidMount() {
    var storage = firebase.storage();
    let httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/colibri-97b46.appspot.com/o/582c395b-35a3-4cac-8e4c-4a848b88363b')
    console.log("it is this", httpsReference);
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

// should this be async? why?
// why is normal function syntax not working?
// why are they running if Im not calling them?



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
