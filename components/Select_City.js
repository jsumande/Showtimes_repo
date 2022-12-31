import React, { Component } from 'react';
import { StyleSheet,Dimensions,View, Text,ImageBackground,TouchableOpacity,FlatList } from 'react-native';
import {AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNRestart from 'react-native-restart';
import Drawers from './Drawer';



export default class Select extends Component  {

    constructor(){
        super();

        this.state = {
          citys : [
            {  city_code : 'Abu Dhabi' , cityid : 'abu',city : "Abu Dhabi", key : "1", img : require('./images/cities/abu.jpg') },
            {  city_code : 'Dubai' , cityid : 'dub',  city : "Dubai", key : "2", img : require('./images/cities/dub.jpg') },
            {  city_code : 'Al Ain' , cityid : 'ain',  city : "Al Ain", key : "3", img : require('./images/cities/ain.jpg') },
            {  city_code : 'Sharjah' , cityid : 'sha',  city : "Sharjah", key : "4", img : require('./images/cities/sha.jpg') },
            {  city_code : 'Ajman' , cityid : 'ajm',  city : "Ajman", key : "5", img : require('./images/cities/ajm.jpg') },
            {  city_code : 'Fujairah' , cityid : 'fuj',  city : "Fujairah", key : "6", img : require('./images/cities/fuj.jpg') },
            {  city_code : 'RAK' , cityid : 'ras',  city : "Ras Al Khaimah", key : "7", img : require('./images/cities/ras.jpg') },
          ],

          orientation : 1,
        }
    }

    componentDidMount() {

        if(Dimensions.get('window').width > Dimensions.get('window').height){
          this.setState({
            orientation : 2,
          })
        }
        else{
          this.setState({
            orientation : 1,
          })
        }
    
        Dimensions.addEventListener('change',({ window : {width,height}}) => {
            if(width < height){
              this.setState({
                orientation : 1,
              })
            }
            else{
              this.setState({
                orientation : 2,
              })
            }
        });
    }

    refresh_city = (id,city_code) => {

        AsyncStorage.setItem('city_id', id);
        AsyncStorage.setItem('city', city_code);
        setTimeout(() =>{
          RNRestart.Restart();
        },500)
      }

    item = (cityid,city,images,city_code) =>{
        return(
            <View style={{flex: 1}}>
                <View style={{flex:1}}>
                  <TouchableOpacity 
                        // onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})}
                        onPress={() => this.refresh_city(cityid,city_code)}
                  >
                    <ImageBackground source={images} style={{flex:1,resizeMode:"cover",justifyContent:"center",paddingTop:45,paddingBottom:45,
                      borderBottomWidth:1,borderBottomColor:'black'}}>
                          <Text style={{color:'white',fontSize:25,paddingLeft:20,position:"relative",top:33}}>{city}</Text>
                      </ImageBackground>
                  </TouchableOpacity>
                    
                </View>
                
            </View>
        );
    }

    render(){
        return(
            <View style={{flex:1}}>

            <View style={{backgroundColor:'#131313'}}>
                  <View style={{flexDirection:'row', marginTop: 10}}>
                      <Text style={{color:'white',fontSize: 18,paddingTop:10,paddingBottom:10,paddingLeft:15}}>Select City</Text>
                  </View>
              </View>

                <View style={{flex:5,backgroundColor : '#222222'}}>
                    <FlatList
                        data={this.state.citys}
                        numColumns={this.state.orientation}
                        key={this.state.orientation}
                        ListFooterComponent={this.footer}
                        renderItem = {({item}) => this.item(item.cityid,item.city,item.img,item.city_code)}
                        keyExtractor={item => item.key}
                    />
                </View>
            </View>
        );
    }

}