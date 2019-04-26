import React, { Component } from 'react';

import {
  Button, View, StyleSheet, Text, Image, ScrollView,
  TouchableHighlight,
} from 'react-native';

import { RNNotificationBanner } from 'react-native-notification-banner';
import Upload from 'react-native-background-upload';
import ImagePicker from 'react-native-image-picker';

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
  }

  fetch = (formdata) => {
    const { uri, ...rest } = formdata;

    // RNNotificationBanner.Info({
    //   title: '请稍后', subTitle: '资料上传中', duration: 10000, enableProgress: true, dismissable: false
    // });

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
            window.g_app._store.dispatch({
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

  handleBackPress = () => {
    const { photos } = this.state;
    const { navigation } = this.props;

    setTimeout(() => {
      photos.forEach(({ uri }) => {
        this.fetch({
          uri,
          is_doctor_only: 'true',
          mp_user_id: webview.params.no,
          category: '其他',
        });
      });
      navigation.navigate('spa');
    }, 2000);
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

  selectGallery = () => {
    const { photos } = this.state;
    const imagePickerOptions = {
      takePhotoButtonTitle: null,
      title: 'Upload Media',
      chooseFromLibraryButtonTitle: 'Choose From Library',
    };

    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      this.setState({ photos: [...photos, response] });
    });
  }

  render() {
    const { photos } = this.state;

    return (
      <View style={styles.container}>
        <Button title="save and back" onPress={this.handleBackPress} />
        <Button title="Load Images" onPress={this.handleButtonPress} />
        <ScrollView style={styles.ScrollView}>
          <View style={styles.imageBox}>
            <View style={styles.blankBox}>
              <Text style={styles.plus} onPress={this.selectGallery}>+</Text>
            </View>
          </View>
          {
            photos.map((p, i) => (
              // eslint-disable-next-line
              <View key={i} style={styles.imageBox}>
                <TouchableHighlight onPress={() => this.handleSelectImage(p)}>
                  <Image
                    style={styles.Image}
                    // borderWidth={selectedImageUris.includes(p.node.image.uri) ? 5 : 0}
                    borderColor="#2BAEEE"
                    source={{ uri: p.uri }}
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
