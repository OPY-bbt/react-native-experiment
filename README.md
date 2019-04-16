# react-native-experiment

## 记录一下react-native开发中遇到的问题

### CameraRoll
- Android中不支持groupTypes参数，需要使用 `Platform.OS === 'ios'` 做判断

- Android sdk 23以上需要开发者自己向用户申请权限 [link](https://stackoverflow.com/questions/51800636/cant-access-camera-roll-in-photos-react-native?rq=1)。
如果你想实现拍照+保存+读取功能那么你至少需要`READ_EXTERNAL_STORAGE`, `WRITE_EXTERNAL_STORAGE`, `CAMERA`三个权限，对于如何申请权限，可以查阅文档[Android Permission](https://facebook.github.io/react-native/docs/permissionsandroid)

### react-native-webview
- Android中如果想要访问本地服务，不能使用localhost和127.0.0.1，需要使用本机IP.

- 如果需要在webview中上传文件，需要增加相关权限 [link](https://github.com/react-native-community/react-native-webview/blob/master/docs/Guide.md#add-support-for-file-upload)

### react-native-camera
- info.plist 增加相关权限

- Android: `android/app/build.gradle` 中增加如下代码
```
    android {
        ...
        defaultConfig {
            ...
            missingDimensionStrategy 'react-native-camera', 'general'
        }
    }
```

### Debug
- iOS 如果想调试webview里的js，需要使用Safari连接webview，但是Safari 12.1 有bug不能使用，需要下载12.2 Preview版。

- Android 运行 `adb -s xxxxx` 之前要使用 `adb devices` 保证当前只有一个设备在线

- 小米手机debug时，除了需要开启usb debug模式，还需要一些其他配置 [link](https://stackoverflow.com/questions/47239251/install-failed-user-restricted-android-studio-using-redmi-4-device)