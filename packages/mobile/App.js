/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Demos from './pages/demos';
import Gallery from './pages/gallery/index_image_picker';
import Spa from './pages/spa';
import Modal from './pages/modal';
import Camera from './pages/camera';
import Notification from './pages/notification';

const AppNavigator = createStackNavigator(
  {
    home: {
      screen: Demos,
    },
    gallery: {
      screen: Gallery,
    },
    spa: {
      screen: Spa,
    },
    camera: {
      screen: Camera,
    },
    notification: {
      screen: Notification,
    }
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#2b2b2b',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootNavigator = createStackNavigator(
  {
    main: {
      screen: AppNavigator,
    },
    modal: {
      screen: Modal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    defaultNavigationOptions: {
      // 禁止modal页面可以在ios中用上到下滑动手势返回
      gesturesEnabled: false,
    },
  }
);

const AppContainer = createAppContainer(RootNavigator);

// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

export default App;
