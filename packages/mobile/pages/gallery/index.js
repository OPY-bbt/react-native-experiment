import React, { Component } from 'react';

import {
  Button, View, StyleSheet, Text, Image, CameraRoll, ScrollView,
  TouchableHighlight, Platform
} from 'react-native';

import { RNNotificationBanner } from 'react-native-notification-banner';
import Upload from 'react-native-background-upload';

import webview from '../spa/webview';

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'title'),
  })

  state = {
    photos: [],
    selectedImageUris: [],
  }

  componentDidMount() {
    this.handleButtonPress();
  }

  fetch = (formdata) => {
    const { navigation } = this.props;
    const { uri, ...rest } = formdata;

    RNNotificationBanner.Info({
      title: '请稍后', subTitle: '资料上传中', duration: 10000, enableProgress: true, dismissable: false
    });

    navigation.navigate('spa');

    if (webview.token) {
      const options = {
        url: 'https://doctor-api-test.ifeizhen.com/galleries/form_upload',
        path: uri,
        method: 'POST',
        type: 'multipart',
        field: 'file',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: webview.token,
        },
        // Below are options only supported on Android
        notification: {
          enabled: true
        },
        parameters: rest,
      };

      Upload.startUpload(options).then((uploadId) => {
        console.log('Upload started');
        Upload.addListener('progress', uploadId, (data) => {
          console.log(`Progress: ${data.progress}%`);
        });
        Upload.addListener('error', uploadId, (data) => {
          console.log(`Error: ${data.error}%`);
        });
        Upload.addListener('cancelled', uploadId, () => {
          console.log('Cancelled!');
        });
        Upload.addListener('completed', uploadId, () => {
          // data includes responseCode: number and responseBody: Object
          console.log('Completed!');

          RNNotificationBanner.Dismiss();

          RNNotificationBanner.Success({ title: '上传成功', subTitle: '' });

          webview.ref.injectJavaScript(`
            window.g_store.dispatch({
              type: 'galleryManage/fetch',
              payload: { no: ${webview.params.no} },
            });
            true;
          `);
        });
      }).catch((err) => {
        console.log('Upload error!', err);
      });
    }
  }

  handleButtonPress = () => {
    CameraRoll
      .getPhotos({
        first: 20,
        assetType: 'Photos',
        groupTypes: Platform.OS === 'ios' ? 'All' : undefined,
      })
      .then((r) => {
        console.log('photos', r);
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        // Error Loading Images
        console.log('getPhotos error', err);
      });
  }

  handleBackPress = () => {
    const { selectedImageUris } = this.state;
    const { navigation } = this.props;

    if (selectedImageUris.length > 0) {
      // only test
      const [uri] = selectedImageUris;

      this.fetch({
        uri: Platform.OS === 'ios' ? uri : uri.replace('file://', ''),
        is_doctor_only: 'true',
        mp_user_id: webview.params.no,
        category: 'test',
      });
    } else {
      navigation.navigate('spa');
    }
  }

  handleSelectImage = (image) => {
    const { selectedImageUris } = this.state;
    const newImageUri = image.node.image.uri;

    let imageUris;
    if (selectedImageUris.some(v => v === newImageUri)) {
      imageUris = selectedImageUris.filter(v => v !== newImageUri);
    } else {
      imageUris = [...selectedImageUris, newImageUri];
    }
    this.setState({
      selectedImageUris: imageUris,
    });
  }

  navigateToCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('camera');
  }

  render() {
    const { photos, selectedImageUris } = this.state;

    return (
      <View style={styles.container}>
        <Button title="save and back" onPress={this.handleBackPress} />
        <Button title="Load Images" onPress={this.handleButtonPress} />
        <ScrollView style={styles.ScrollView}>
          <View style={styles.imageBox}>
            <View style={styles.blankBox}>
              <Text style={styles.plus} onPress={this.navigateToCamera}>+</Text>
            </View>
          </View>
          {
            photos.map((p, i) => (
              // eslint-disable-next-line
              <View key={i} style={styles.imageBox}>
                <TouchableHighlight onPress={() => this.handleSelectImage(p)}>
                  <Image
                    style={styles.Image}
                    borderWidth={selectedImageUris.includes(p.node.image.uri) ? 5 : 0}
                    borderColor="#2BAEEE"
                    source={{ uri: p.node.image.uri }}
                  />
                </TouchableHighlight>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollView: {
    flex: 1,
  },
  plus: {
    fontSize: 20,
  },
  blankBox: {
    width: 150,
    height: 150,
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  Image: {
    width: 150,
    height: 150,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Gallery;
