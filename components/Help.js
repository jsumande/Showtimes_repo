import React, { Component } from 'react';
import { ActivityIndicator,Dimensions,View, Text,Image,TouchableOpacity,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';

export default class Help extends Component  {
    constructor(){
 
        super();
    
        this.state = {
          screen : 0,
          color_0 : 'white',
          color_1 : '#333333',
          color_2 : '#333333',
          color_3 : '#333333',
          color_4 : '#333333',
          color_5 : '#333333',
          color_6 : '#333333',
          screenWidth : Dimensions.get('window').width,
          screenHeight : Dimensions.get('window').height,
          data: [],
          isLoading: true,
        }
      }

      componentDidMount() {

        admob()
            .setRequestConfiguration({
            maxAdContentRating: MaxAdContentRating.PG,
            tagForChildDirectedTreatment: true,
            tagForUnderAgeOfConsent: true,
            })
            .then(() => {});
          
        fetch('https://liveapper.com/movies/help.json'
           ,{
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'X-Accept-Origin': 'file://',
                }, 
            })
          .then((response) => response.json())
          .then((json) => {
            this.setState({ data: json.help });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });

      }


    change = ({nativeEvent}) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        this.setState({
            screen : slide,
        });

        if(slide == 0){
            this.setState({
                color_0 : 'white',
                color_1 : '#333333',
                color_2 : '#333333',
                color_3 : '#333333',
                color_4 : '#333333',
                color_5 : '#333333',
                color_6 : '#333333',
            });
        }
        else if(slide == 1){
            this.setState({
                color_0 : '#333333',
                color_1 : 'white',
                color_2 : '#333333',
                color_3 : '#333333',
                color_4 : '#333333',
                color_5 : '#333333',
                color_6 : '#333333',
            });
        }
        else if(slide == 2){
            this.setState({
                color_0 : '#333333',
                color_1 : '#333333',
                color_2 : 'white',
                color_3 : '#333333',
                color_4 : '#333333',
                color_5 : '#333333',
                color_6 : '#333333',
            });
        }
        else if(slide == 3){
            this.setState({
                color_0 : '#333333',
                color_1 : '#333333',
                color_2 : '#333333',
                color_3 : 'white',
                color_4 : '#333333',
                color_5 : '#333333',
                color_6 : '#333333',
            });
        }
        else if(slide == 4){
            this.setState({
                color_0 : '#333333',
                color_1 : '#333333',
                color_2 : '#333333',
                color_3 : '#333333',
                color_4 : 'white',
                color_5 : '#333333',
                color_6 : '#333333',
            });
        }
        else if(slide == 5){
            this.setState({
                color_0 : '#333333',
                color_1 : '#333333',
                color_2 : '#333333',
                color_3 : '#333333',
                color_4 : '#333333',
                color_5 : 'white',
                color_6 : '#333333',
            });
        }
        else{
            this.setState({
                color_0 : '#333333',
                color_1 : '#333333',
                color_2 : '#333333',
                color_3 : '#333333',
                color_4 : '#333333',
                color_5 : '#333333',
                color_6 : 'white',
            });
        }

        
    }

    render(){

        // let screenWidth = Dimensions.get('window').width;
        // let screenHeight =Dimensions.get('window').height;
        const { data, isLoading } = this.state;
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#131313'}}>
                    <View style={{flexDirection:'row', marginTop: 10}}>

                        <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => this.props.navigation.toggleDrawer()}/>
                        <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Help</Text>

                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})}>
                                <Text style={{color:'white',fontSize:18,paddingRight:15,paddingTop:5}}>Skip</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

                {isLoading ? 
                    <View style={{flex:5,backgroundColor : '#222222'}}>
                        <ActivityIndicator/> 
                    </View>
                : (
                <View style={{flex:5,backgroundColor : '#222222'}} >
                    <ScrollView 
                        horizontal={true} 
                        pagingEnabled={true} 
                        showsHorizontalScrollIndicator={false}
                        onScroll={this.change}
                    >

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center',paddingBottom:25}}>{data[0].text}</Text>
                        <Image source={require('./images/help/help1.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>

                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center',paddingBottom:25}}>{data[1].text}</Text>
                        <Image source={require('./images/help/help2.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>
                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18 ,textAlign:'center',paddingBottom:25}}>{data[2].text}</Text>
                        <Image source={require('./images/help/help3.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>
                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center',paddingBottom:25}}>{data[3].text}</Text>
                        <Image source={require('./images/help/help4.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>
                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center',paddingBottom:25}}>{data[4].text}</Text>
                        <Image source={require('./images/help/help5.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>
                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18 ,textAlign:'center',paddingBottom:25}}>{data[5].text}</Text>
                        <Image source={require('./images/help/help6.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>
                    </View>

                    <View style={{alignItems:'center',width:this.state.screenWidth,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:18,textAlign:'center',paddingBottom:25}}>{data[6].text}</Text>
                        <Image source={require('./images/help/help7.png')} style={{width: 130 + (this.state.screenWidth / 2), height: 100 +( this.state.screenHeight /2) }}/>


                    <View style={{width:'100%',paddingTop:35,paddingBottom:50}}>
                            <TouchableOpacity style={{backgroundColor:'#333333',padding:15}} onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})}>
                                <Text style={{color:'white',alignSelf:'center',fontSize:16}}>Get Started</Text>
                            </TouchableOpacity>
                         </View>
                    </View>


                </ScrollView>
                
                    <View style={{backgroundColor:'#222222',width:'100%'}}>
                        <View style={{flexDirection:'row',alignSelf:'center'}}>
                            <Text style={{color:[this.state.color_0],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_1],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_2],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_3],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_4],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_5],fontSize:40,paddingRight:10}}>•</Text>
                            <Text style={{color:[this.state.color_6],fontSize:40,paddingRight:10}}>•</Text>
                        </View>         
                    </View>
                </View>
                    )
                    }

                
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