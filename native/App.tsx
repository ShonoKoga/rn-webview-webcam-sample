import React, {useEffect, useState} from 'react';
import {Linking, Alert, Platform, SafeAreaView} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {WebView} from 'react-native-webview';
import Permissions, {PERMISSIONS, RESULTS} from 'react-native-permissions';

const url = 'https://rn-webview-webcam-sample.vercel.app/';

const App = () => {
  const openLink = async () => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android Properties
          showTitle: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          // Specify full animation resource identifier(package:anim/name)
          // or only resource name(in case of animation bundled with app).
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
          headers: {
            'my-custom-header': 'my custom header value',
          },
        });
        Alert.alert(JSON.stringify(result));
      } else Linking.openURL(url);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const checkPermission = async () => {
    const result = await Permissions.checkMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ]);
    console.log('check', result);
    const granted =
      result['android.permission.CAMERA'] === RESULTS.GRANTED &&
      result['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.GRANTED;

    if (granted) {
      setIsShow(true);
    } else {
      const result = await Permissions.requestMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      ]);
      console.warn('request', result);
      const granted =
        result['android.permission.CAMERA'] === RESULTS.GRANTED &&
        result['android.permission.READ_EXTERNAL_STORAGE'] === RESULTS.GRANTED;
      if (granted) {
        setIsShow(true);
      }
    }
  };

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      openLink();
    } else {
      checkPermission();
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'android' && isShow && (
        <WebView
          source={{uri: url}}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
