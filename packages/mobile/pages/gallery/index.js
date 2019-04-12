import React, {Component} from 'react';

import { Button, View, StyleSheet, Text } from 'react-native';

class Gallery extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'title'),
    };
  }

  state = {}

  render() {
    const { navigation } = this.props;
    const param = navigation.getParam('param');

    return (
      <View style={styles.container}>
        <Text>gallery {param}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
});

export default Gallery;
