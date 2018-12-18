// <Video source={{ uri: this.state.video.uri}} useNativeControls={true} style={{ width: W, height: W }} resizeMode="cover" />


// jon created this for uids
makeUID() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 64; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    console.log("makeUID result: ", text);
    this.setState({
        uid: text
    })
}


// this was pushing users to database in regform
firebase.database().ref('/users').push(
    {
      id: this.state.uid,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      bio: this.state.bio,
      email: this.state.email,
      password: this.state.password
    }
)

// video code working
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
    this.cameraRef.recordAsync()
      .then((video) => this.setState({video: video, recording: false}));
  }

  stopRecording = () => {
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


// audio code working
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';
import Expo, {
  Asset,
  Audio,
  FileSystem,
  Permissions,
  LinearGradient,
} from 'expo';
import {
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import dayjs from 'dayjs';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const DISABLED_OPACITY = 0.5;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      haveRecordingPermissions: false,
      isLoading: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      shouldCorrectPitch: true,
      volume: 1.0,
    };
    this.recordingSettings = JSON.parse(
      JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY)
    );
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}Audio/`
    ).catch(e => {
      console.log(e, 'Directory exists');
    });
    this._askForPermissions();
  }

  componentWillUnmount() {
    this.sound = null;
    this._onStopPressed();
  }

  _askForPermissions = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
      haveRecordingPermissions: response.status === 'granted',
    });
  };

  _updateScreenForSoundStatus = status => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
    }
  };

  _updateScreenForRecordingStatus = status => {
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!this.state.isLoading) {
        this._stopRecordingAndEnablePlayback();
      }
    }
  };

  async _stopPlaybackAndBeginRecording() {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  }

  async _stopRecordingAndEnablePlayback() {
    this.setState({
      isLoading: true,
    });
    try {
      await this.recording.stopAndUnloadAsync();
    } catch (error) {
      // Do nothing -- we are already unloaded.
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI());
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    });
    const { sound } = await this.recording.createNewLoadedSound(
      {
        isLooping: true,
        isMuted: this.state.muted,
        volume: this.state.volume,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
      },
      this._updateScreenForSoundStatus
    );
    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  }

  _onRecordPressed = () => {
    if (this.state.isRecording) {
      this._stopRecordingAndEnablePlayback();
    } else {
      this._stopPlaybackAndBeginRecording();
    }
  };

  _onPlayPausePressed = () => {
    if (this.sound !== null) {
      if (this.state.isPlaying) {
        this.sound.pauseAsync();
      } else {
        this.sound.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.sound !== null) {
      this.sound.stopAsync();
    }
  };

  _onMutePressed = () => {
    if (this.sound !== null) {
      this.sound.setIsMutedAsync(!this.state.muted);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.sound !== null) {
      this.sound.setVolumeAsync(value);
    }
  };

  _onSeekSliderValueChange = value => {
    if (this.sound !== null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.sound.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.sound !== null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.soundDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.sound !== null &&
      this.state.soundPosition !== null &&
      this.state.soundDuration !== null
    ) {
      return this.state.soundPosition / this.state.soundDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return `0${string}`;
      }
      return string;
    };
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }

  _getPlaybackTimestamp() {
    if (
      this.sound !== null &&
      this.state.soundPosition !== null &&
      this.state.soundDuration !== null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.soundPosition
      )} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
    }
    return '';
  }

  _getRecordingTimestamp() {
    if (this.state.recordingDuration !== null) {
      return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
    }
    return `${this._getMMSSFromMillis(0)}`;
  }

  _isSaveAudio = () => {
    Alert.alert('是否保存录音?', '', [
      { text: '取消', onPress: () => console.log('OK Pressed') },
      {
        text: '确定',
        onPress: async () => {
          this._onStopPressed();
          const isCaf = this.recording.getURI().lastIndexOf('.caf') > -1;
          const newUri = `${FileSystem.documentDirectory}Audio/${dayjs().format(
            'YYYY_MM_DD__HH_mm_ss'
          )}${isCaf ? '.caf' : '.3gp'}`;
          await FileSystem.moveAsync({
            from: this.recording.getURI(),
            to: newUri,
          });
          this.props.navigation.goBack();
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.container}>
          <View
            style={[
              styles.halfScreenContainer,
              {
                opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
              },
            ]}>
            <View style={styles.recordingContainer}>
              <TouchableHighlight
                underlayColor="transparent"
                style={styles.onPressBtn}
                onPress={this._onRecordPressed}
                disabled={this.state.isLoading}>
                <MaterialCommunityIcons
                  name="record-rec"
                  size={80}
                  color={this.state.isRecording ? '#cb3837' : '#000'}
                />
              </TouchableHighlight>
              <View>
                <Text style={[styles.recordingTimestamp]}>
                  {this._getRecordingTimestamp()}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.halfScreenContainer,
              {
                opacity:
                  !this.state.isPlaybackAllowed || this.state.isLoading
                    ? DISABLED_OPACITY
                    : 1.0,
                backgroundColor: '#999',
              },
            ]}>
            <LinearGradient
              colors={['#3b5998', '#192f6a']}
              style={styles.halfScreenContainer}>
              <View style={styles.playbackContainer}>
                <Slider
                  style={styles.playbackSlider}
                  value={this._getSeekSliderPosition()}
                  onValueChange={this._onSeekSliderValueChange}
                  onSlidingComplete={this._onSeekSliderSlidingComplete}
                  maximumTrackTintColor="#ccc"
                  minimumTrackTintColor="#1abc9c"
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }
                />
                <Text style={[styles.playbackTimestamp]}>
                  {this._getPlaybackTimestamp()}
                </Text>
              </View>
              <View
                style={[
                  styles.buttonsContainerBase,
                  styles.buttonsContainerTopRow,
                ]}>
                <View style={styles.volumeContainer}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    style={styles.wrapper}
                    onPress={this._onMutePressed}
                    disabled={
                      !this.state.isPlaybackAllowed || this.state.isLoading
                    }>
                    <Ionicons
                      name={this.state.muted ? 'md-volume-off' : 'md-volume-up'}
                      size={32}
                    />
                  </TouchableHighlight>
                  <Slider
                    style={styles.volumeSlider}
                    value={1}
                    maximumTrackTintColor="#ccc"
                    minimumTrackTintColor="#1abc9c"
                    onValueChange={this._onVolumeSliderValueChange}
                    disabled={
                      !this.state.isPlaybackAllowed || this.state.isLoading
                    }
                  />
                </View>
                <View style={styles.playStopContainer}>
                  <TouchableHighlight
                    underlayColor="transparent"
                    style={styles.wrapper}
                    onPress={this._onPlayPausePressed}
                    disabled={
                      !this.state.isPlaybackAllowed || this.state.isLoading
                    }>
                    <Ionicons
                      name={!this.state.isPlaying ? 'md-play' : 'md-pause'}
                      size={32}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="transparent"
                    style={styles.wrapper}
                    onPress={this._onStopPressed}
                    disabled={
                      !this.state.isPlaybackAllowed || this.state.isLoading
                    }>
                    <Foundation name="stop" size={32} />
                  </TouchableHighlight>
                </View>
                <View />
              </View>
              <View
                style={[
                  styles.buttonsContainerBase,
                  styles.buttonsContainerBottomRow,
                ]}>
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this._isSaveAudio}
                  disabled={
                    !this.state.isPlaybackAllowed || this.state.isLoading
                  }>
                  <LinearGradient
                    colors={['#4c669f', '#3b5998']}
                    start={[0, 1]}
                    end={[1, 1]}
                    style={styles.buttonsSave}>
                    <Text style={{ color: '#fff' }}>保存录音</Text>
                  </LinearGradient>
                </TouchableHighlight>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#fb907e',
  },
  wrapper: {},
  onPressBtn: {
    padding: 5,
  },
  halfScreenContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  recordingContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playbackContainer: {
    alignSelf: 'stretch',
    padding: 20,
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  playbackTimestamp: {
    textAlign: 'right',
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  buttonsContainerBase: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonsContainerTopRow: {
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  playStopContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - 70,
  },
  buttonsContainerBottomRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  buttonsSave: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    shadowColor:'#ccc',
    shadowOffset:{h:2,w:2},
    shadowRadius:3,
    shadowOpacity:0.2,
  },
});

Expo.registerRootComponent(App);
