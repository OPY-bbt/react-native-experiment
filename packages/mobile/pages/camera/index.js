import React, { Component } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, View, CameraRoll, Platform
} from 'react-native';
import { RNCamera } from 'react-native-camera';

class Camera extends Component {
  takePicture = async () => {
    if (this.camera) {
      try {
        const { navigation } = this.props;
        const options = {
          fixOrientation: Platform.OS !== 'ios' ? true : undefined,
        };
        const data = await this.camera.takePictureAsync(options);
        await CameraRoll.saveToCameraRoll(data.uri);
        navigation.navigate('gallery');
      } catch (error) {
        console.log('take picture failed', error);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          captureAudio={false}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default Camera;
