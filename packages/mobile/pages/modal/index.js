import React, {Component} from 'react';

import { Button, View, StyleSheet, Text } from 'react-native';

class Modal extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'modal'),
    };
  }

  state = {}

  render() {
    const { navigation } = this.props;
    const param = navigation.getParam('param');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30 }}>This is a modal!</Text>
            <Button
                onPress={() => this.props.navigation.goBack()}
                title="Dismiss"
            />
        </View>
    );
  }
}

export default Modal;
