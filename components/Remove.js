import React, { Component } from 'react';
import { StyleSheet,Dimensions,View, Text,ImageBackground,TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';

export default class App extends Component  {

    componentDidMount() {

        admob()
        .setRequestConfiguration({
          maxAdContentRating: MaxAdContentRating.PG,
          tagForChildDirectedTreatment: true,
          tagForUnderAgeOfConsent: true,
        })
        .then(() => {
        });
    }

    render(){
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
        return(
            <View style={{flex:1}}>

                <View style={{backgroundColor:'#131313'}}>
                    <View style={{flexDirection:'row', marginTop: 10}}>
                        <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => this.props.navigation.toggleDrawer()}/>
                        <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Remove Ads</Text>
                    </View>
                </View>

                <ScrollView style={{flex:5,backgroundColor : '#222222',alignself:"center",paddingTop:5}}>

                    <Text style={{color:'white',fontSize:16,textAlign:'center',marginBottom:25}}>Ads will be removed permanently after {"\n"}your purchase.Thank you for you {"\n"}support!</Text>

                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'white',fontSize:20}}>Remove Ads</Text>
                    </TouchableOpacity>

                    <Text style={{color:'white',fontSize:15,textAlign:'center',position:'relative',top:-18,marginBottom:8}}>Permanently Remove Ads for $5.99</Text>

                    <TouchableOpacity style={styles.button_2}>
                        <Text style={{color:'white',fontSize:20}}>Restore Purchase</Text>
                    </TouchableOpacity>

                    <View style={{paddingTop:40}}></View>
                    
                </ScrollView>

                <View style={{width:'100%'}}>
                    <BannerAd
                        unitId={adUnitId}
                        size={BannerAdSize.SMART_BANNER}
                        requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                        }}
                        onAdLoaded={() => {
                        console.log('Loaded');
                        }}
                        onAdFailedToLoad={(error) => {
                        console.error('Advert failed to load: ', error);
                        }}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    button : {
        padding:18,
        margin:25,
        borderRadius:4,
        backgroundColor:'#52de97',
        alignItems:'center'
    },

    button_2 : {
        padding:18,
        margin:25,
        borderRadius:4,
        backgroundColor:'#323232',
        alignItems:'center'
    },
  
  });
  