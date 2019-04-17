import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import { RNNotificationBanner } from 'react-native-notification-banner';
import Icon from 'react-native-vector-icons/FontAwesome';

const Notification = () => {
  const copy = <Icon name="copy" size={24} color="#FFFFFF" family="FontAwesome" />;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {
        RNNotificationBanner.Normal({ title: 'Message', subTitle: 'Sub Message' });
      }}
      >
        <Text>Normal</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        setTimeout(() => {
          RNNotificationBanner.Dismiss();
        }, 2000);

        RNNotificationBanner.Info({
          title: 'Message', subTitle: 'Sub Message', duration: 10000, enableProgress: true, dismissable: false
        });
      }}
      >
        <Text>Info</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        RNNotificationBanner.Success({ title: 'Message', subTitle: 'Sub Message' });
      }}
      >
        <Text>Success</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        RNNotificationBanner.Warn({ title: 'Message', subTitle: 'Sub Message' });
      }}
      >
        <Text>Warning</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        RNNotificationBanner.Error({ title: 'Message', subTitle: 'Sub Message' });
      }}
      >
        <Text>Error</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        RNNotificationBanner.Show({
          title: 'Message',
          titleSize: 50,
          titleColor: '#555555',
          subTitle: 'Message',
          subTitleSize: 50,
          subTitleColor: '#555555',
          withIcon: true,
          duration: 1,
          tintColor: '#000000',
          icon: copy,
          dismissable: false,
          onClick: () => {
            console.log('on click');
          },
          onHide: () => {
            console.log('on hide');
          }
        });
      }}
      >
        <Text>Custom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default Notification;
