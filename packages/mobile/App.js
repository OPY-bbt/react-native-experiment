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
import Gallery from './pages/gallery';
import Spa from './pages/spa';
import Modal from './pages/modal';
import Camera from './pages/camera';

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
