import React, { Component } from 'react';

import {
  Button, View, StyleSheet, PermissionsAndroid, Platform
} from 'react-native';

class Demos extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title', 'Home'),
  })

  state = {
    routes: [
      {
        title: '弹框',
        path: 'modal',
      },
      {
        title: '上传图片',
        path: 'gallery',
      },
      {
        title: '医生端',
        path: 'spa',
      }, {
        title: '拍照',
        path: 'camera',
      }, {
        title: '通知',
        path: 'notification',
      }
    ],
  }

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      this.requestPermissions(['READ_EXTERNAL_STORAGE', 'WRITE_EXTERNAL_STORAGE', 'CAMERA']);
    }
  }

  requestPermissions = async (permissions) => {
    // eslint-disable-next-line
    for (const permission of permissions) {
      // eslint-disable-next-line
      await this.requestPermission(permission);
    }
  }

  requestPermission = async (permission) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS[permission],
        {
          title: `${permission} Permission`,
          message: `App needs access to your ${permission}.`,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(`${permission} ok`);
      } else {
        console.log(`${permission} denied`);
      }
    } catch (err) {
      console.warn(`request${permission}Permission err`, err);
    }
  }

  navigateTo = (route) => {
    const { navigation } = this.props;
    navigation.navigate(route.path, route);
  }

  render() {
    const { routes } = this.state;

    return (
      <View style={styles.container}>
        {
          routes.map(route => (
            <View
              key={route.title}
              style={styles.link}
            >
              <Button
                onPress={() => this.navigateTo(route)}
                title={route.title}
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  link: {
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

export default Demos;
