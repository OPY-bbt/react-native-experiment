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
          source={{ uri: 'http://192.168.10.22:8000/' }}
          style={{ flex: 1 }}
          ref={(n) => { webview.ref = n; }}
          onMessage={(event) => {
            if (event.nativeEvent.data) {
              const { action, payload } = JSON.parse(event.nativeEvent.data);
              switch (action) {
                case 'token':
                  webview.token = payload;
                  break;
                case 'navigation':
                  webview.params = payload.params;
                  navigation.navigate(payload.path);
                  break;
                default:
                  console.warn('unknown action');
              }
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
