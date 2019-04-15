import React, { Component } from 'react';

import {
  Button, View, StyleSheet
} from 'react-native';
import { WebView } from 'react-native-webview';

class Spa extends Component {
    static navigationOptions = ({ navigation }) => ({
      title: navigation.getParam('title', 'title'),
    })

    state = {}

    render() {
      const { navigation } = this.props;

      return (
        <View style={styles.container}>
          <Button
            title="jump to native screen"
            onPress={() => navigation.navigate('modal')}
          />
          <WebView
            source={{ uri: 'https://doctor-spa-test.ifeizhen.com/' }}
            style={{ flex: 1 }}
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
