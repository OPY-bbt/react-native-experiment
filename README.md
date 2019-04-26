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

### react-native-background-upload
- 上传文件不支持iOS新ph://格式文件比如从Camera.getPhoto获取文件就是此格式，所以需要使用 react-native-image-picker，此库获取的图片是file：//格式，相关[issue](https://github.com/Vydia/react-native-background-upload/issues/141)

- 目前测下来当文件上传已经开始，这时候进入后台会继续下载，如果进入后台之前下载还没有开始启动（Upload.startUpload(options).then()还没有执行），那么在后台程序会被暂停。

- 在后台完成的上传没有 complete 回调

- 当同时上传多张图片时进入后台，会报lost connection错误(暂不支持多张图片后台上传)

### Debug
- iOS 如果想调试webview里的js，需要使用Safari连接webview，但是Safari 12.1 有bug不能使用，需要下载12.2 Preview版。

- iOS 真机 remote debug 会遇到跨域问题 [link](https://stackoverflow.com/questions/48445514/react-native-js-debugger-issues-with-cors-ios)

- Android 运行 `adb -s xxxxx` 之前要使用 `adb devices` 保证当前只有一个设备在线

- 小米手机debug时，除了需要开启usb debug模式，还需要一些其他配置 [link](https://stackoverflow.com/questions/47239251/install-failed-user-restricted-android-studio-using-redmi-4-device)

### Xcode 10.2
- `error: Unable to resolve build file: XCBCore.BuildFile`。 同时打开两个workspace有时会出现这个错误。解决办法就是关闭其他的。什么鬼。。 [link](https://stackoverflow.com/questions/50708012/error-unable-to-resolve-build-file-xcbcore-buildfile)