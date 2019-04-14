import React, {Component} from 'react';

import { Button, View, StyleSheet, Text, Image, CameraRoll, ScrollView } from 'react-native';
import { RNCamera } from 'react-native-camera';

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'title'),
    };
  }

  state = {
    photos: [],
  }

  handleButtonPress = () => {
    CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
        groupTypes: 'All',
      })
      .then(r => {
        this.setState({ photos: r.edges });
      })
      .catch((err) => {
        //Error Loading Images
        console.log(err);
      });
  };

  navigateToCamera = () => {
    const { navigation } = this.props;
    navigation.navigate('camera');
  }

  render() {
    const { navigation } = this.props;
    const { photos } = this.state;
    const param = navigation.getParam('param');

    return (
      <View style={styles.container}>
        <Button title="Load Images" onPress={this.handleButtonPress} />
        <ScrollView style={styles.ScrollView}>
          <View style={styles.imageBox}>
            <View style={styles.blankBox} onPress={this.navigateToCamera}>
              <Text style={styles.plus}>+</Text>
            </View>
          </View>
          {
            photos.map((p, i) => {
              return (
                <View key={i} style={styles.imageBox}>
                  <Image
                    style={styles.Image}
                    source={{ uri: p.node.image.uri }}
                  />
                </View>
              );
            })
          }
        </ScrollView>
      </View>
    )
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
  Image:{
    width: 150,
    height: 150,
  },
  imageBox: {
    flex: 1,
    alignItems: 'center',
  }
});

export default Gallery;
