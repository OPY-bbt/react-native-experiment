import React, { Component } from 'react';

import {
  Button, View, StyleSheet, Text, Image, CameraRoll, ScrollView,
  TouchableHighlight, Platform,
} from 'react-native';

import webview from '../spa/webview';

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'title'),
  })

  state = {
    photos: [],
    selectedImageUris: [],
  }

  fetch = (formdata) => {
    const { navigation } = this.props;

    fetch('https://doctor-api-test.ifeizhen.com/galleries/form_upload', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxNjA2MywiZW5jcnlwdGVkX3Bhc3N3b3JkIjoiJDJhJDExJHZ1QlRVUTJtc2hRUTBKS3hObXpzV2VvbTRrYlpOUjl4b3c4dEx2dENYcXYwMlgxeFM5cGVPIiwiZXhwIjoxNTYzMTcwOTM4fQ.ZpYpAmykr4yTtqVV0LB0-V7JwVqtWzrZR0NeCavBAcc',
      },
      body: formdata,
    }).then(() => {
      webview.ref.injectJavaScript(`
        window.g_store.dispatch({
          type: 'galleryManage/fetch',
          payload: { no: 10901 },
        });
        true;
      `);
      navigation.navigate('spa');
    }).catch((err) => {
      console.log(err);
    });
  }

  handleButtonPress = () => {
    CameraRoll
      .getPhotos({
        first: 20,
        assetType: 'Photos',
        groupTypes: Platform.OS === 'ios' ? 'All' : undefined,
      })
      .then((r) => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        // Error Loading Images
        console.log(err);
      });
  }

  handleBackPress = () => {
    const { selectedImageUris } = this.state;
    const { navigation } = this.props;

    if (selectedImageUris.length > 0) {
      // only test
      const [uri] = selectedImageUris;
      const form = new FormData();
      form.append('category', 'test');
      form.append('is_doctor_only', true);
      form.append('file', { uri, name: 'image.jpg', type: 'multipart/form-data' });
      form.append('mp_user_id', '10901');
      this.fetch(form);
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
        <Button title="back to webview" onPress={this.handleBackPress} />
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
