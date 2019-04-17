import React, { Component } from 'react';

import {
  View, StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';

import webview from './webview';

class Spa extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'title'),
  })

  state = {}

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: 'http://192.168.2.35:8000/' }}
          style={{ flex: 1 }}
          ref={(n) => { webview.ref = n; }}
          onMessage={(event) => {
            if (event.nativeEvent.data) {
              navigation.navigate(event.nativeEvent.data);
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    flex: 1,
  },
});

export default Spa;
