import React, { Component } from 'react';
import { StyleSheet,View, Text,Share,TouchableOpacity,ScrollView } from 'react-native';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem, } from '@react-navigation/drawer';

export default class DrawerContent extends Component  {

    constructor(){
 
        super();
    
        this.state = {
          city : 'Abu Dhabi',
          cityId: '',
        }
      }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('city');
          if (value !== null) {
            // We have data!!
            this.setState({ cityId: value });
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    // componentDidMount() {
    //     AsyncStorage.getItem("city")
    //     .then(value => {
    //       this.setState({ cityId: value });
    //     })
    //     .done();
    // }

    onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'React Native | A framework for building native apps using React',
          });
    
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };

    render(){
        return(
            <View style={{flex:1,backgroundColor : '#191919',}}>
                <DrawerContentScrollView style={{paddingTop:35,marginLeft : 'auto',marginRight : 'auto'}}>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'home'} size={30} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:20}}>{global.City_name} Movies</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Abu Dhabi Cinemas',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'film'} size={26} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:19}}>{global.City_name} Cinemas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Change City',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <View style={{paddingLeft:5}}>
                            <Icon name={'map-marker'} size={30} color={'#CECECE'}/>
                        </View>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:25}}>Change City</Text>
                    </TouchableOpacity>

                    <View style={{paddingBottom:25,borderTopWidth:2}}></View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Remove Ads',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'check-circle'} size={30} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:20}}>Remove Ads</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.onShare} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'share-square'} size={30} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:20}}>Share the App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Remove Ads',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'star'} size={28} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:5,paddingLeft:20}}>Rate the App</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'envelope'} size={24} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:1,paddingLeft:20}}>Send us Feedback</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('About',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:25}}>
                        <Icon name={'info-circle'} size={24} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:1,paddingLeft:22}}>About</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Help',{screen: 'Home',})} style={{flexDirection:'row',paddingBottom:40}}>
                        <Icon name={'question-circle'} size={24} color={'#CECECE'}/>
                        <Text style={{color:'#CECECE',fontSize:16,paddingTop:1,paddingLeft:22}}>Help</Text>
                    </TouchableOpacity>

                </DrawerContentScrollView>

                <View style={{paddingBottom:25,paddingLeft:25,paddingTop:10}}>
                    <View style={{flexDirection:'row',paddingBottom:10}}>
                        <TouchableOpacity style={{paddingTop:8,paddingBottom:8,paddingLeft:12,paddingRight:12,borderRadius:7,backgroundColor:'#333333'}}>
                            <Icon name={'facebook-f'} size={17} color={'#CECECE'}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,borderRadius:7,backgroundColor:'#333333',marginLeft:5}}>
                            <Icon name={'instagram'} size={17} color={'#CECECE'}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{paddingTop:8,paddingBottom:8,paddingLeft:10,paddingRight:10,borderRadius:7,backgroundColor:'#333333',marginLeft:5}}>
                            <Icon name={'twitter'} size={17} color={'#CECECE'}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={{color:'#333333'}}>Cinema Showtimes UAE</Text>
                </View>
                
            </View>
        );
    }
}