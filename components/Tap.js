import React, { Component,useEffect, useState } from 'react';
import { Button } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const eventListener = interstitial.onAdEvent(type => {
      if (type === AdEventType.LOADED) {
        setLoaded(true);
      }
      else{
        // this.props.navigation.navigate('Help',{screen: 'Home',});
        // navigation.navigate('About',{screen: 'Home',})
        navigation.goBack()
      }
    });

    interstitial.load();

    return () => {
      eventListener();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }
  interstitial.show()

  return (
    <Button
      title="Show Interstitial"
      onPress={() => {
        // interstitial.show();
      }}
    />
  );
}


export default App;