import React, { Component } from 'react';
import { StyleSheet,Button,View, Text,Image,FlatList } from 'react-native';
import Splash from './components/Splash';
import Drawers from './components/Drawer';
import Select_City from './components/Select_City';
import {AsyncStorage} from 'react-native';
import PushNotification from "react-native-push-notification";

import { NavigationContainer } from '@react-navigation/native';


function getUI(data,data2){


  if(data2){
    return(
      <Select_City></Select_City>
    )
  }
  else{
    if(data){
      return(
        <Drawers></Drawers>
      )
    }
    else{
      return(
        <Splash></Splash>
      )
    }
  }

 

  
}

export default class App extends Component  {

  constructor(){
    super()

    global.City = '';
    global.Favorites = '';
    global.City_name = '';

    // API
    global.movie_by_city_today = '';
    global.movie_by_city_tomorrow = '';
    global.movie_by_city_nextday = '';
    global.Cinema_by_city = '';
    global.today = '';
    global.tomorrow = '';
    global.nextday = '';
    global.nextdayName = '';
   

    this.state = {
      showMe : false,
      select_city : false,
      cityId: '',

      citys : [
        {  city_code : 'Abu Dhabi' , cityid : 'abu',city : "Abu Dhabi", key : "1", img : require('./components/images/cities/abu.jpg') },
        {  city_code : 'Dubai' , cityid : 'dub',  city : "Dubai", key : "2", img : require('./components/images/cities/dub.jpg') },
        {  city_code : 'Al Ain' , cityid : 'ain',  city : "Al Ain", key : "3", img : require('./components/images/cities/ain.jpg') },
        {  city_code : 'Sharjah' , cityid : 'sha',  city : "Sharjah", key : "4", img : require('./components/images/cities/sha.jpg') },
        {  city_code : 'Ajman' , cityid : 'ajm',  city : "Ajman", key : "5", img : require('./components/images/cities/ajm.jpg') },
        {  city_code : 'Fujairah' , cityid : 'fuj',  city : "Fujairah", key : "6", img : require('./components/images/cities/fuj.jpg') },
        {  city_code : 'RAK' , cityid : 'ras',  city : "Ras Al Khaimah", key : "7", img : require('./components/images/cities/ras.jpg') },
      ],
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('city');
      if (value == null) {
        AsyncStorage.setItem('city_id', 'abu');
        AsyncStorage.setItem('city', 'Abu Dhabi');
      }
      else{
        alert("Existed");
      }
    } catch (error) {
      // Error retrieving data
    }
  };


  apiData = (value) => {

    fetch('https://liveapper.com/movies/cinemas'
            ,{
                  method: 'GET',
                  headers: {
                  Accept: 'application/json',
                  'X-Accept-Origin': 'file://',
                  }, 
              })
    .then((response) => response.json())
    .then((json) => { global.Cinema_by_city = json.cinemas;})
    .catch((error) => console.error(error))
    .finally(() => {});

  }


  componentDidMount() {

    PushNotification.configure({
        
      onNotification: function (notification) {

        PushNotification.localNotification({

          title: notification.title, 
          message: notification.message,
        });

        console.log("NOTIFICATION:", notification.title);
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    
    
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Date setter

    var date_today = new Date();
    let today_Year = date_today.getFullYear();
    let today_Month = '';
    if(parseInt(date_today.getMonth() + 1) < 10){
      today_Month =  "0"+parseInt(date_today.getMonth() + 1);
    }
    else{
      today_Month = parseInt(date_today.getMonth() + 1);
    }
    let today_date = date_today.getDate();
    global.today = today_Year+"-"+today_Month+"-"+today_date;

    var date_tomorrow = new Date();
    date_tomorrow.setDate(date_tomorrow.getDate() + 1);
    let tomorrow_Year = date_tomorrow.getFullYear();
    let tomorrow_Month = '';
    if(parseInt(date_tomorrow.getMonth() + 1) < 10){
      tomorrow_Month =  "0"+parseInt(date_tomorrow.getMonth() + 1);
    }
    else{
      tomorrow_Month = parseInt(date_tomorrow.getMonth() + 1);
    }
    let tomorrow_date = date_tomorrow.getDate();
    global.tomorrow = tomorrow_Year+"-"+tomorrow_Month+"-"+tomorrow_date;

    var date_nextday = new Date();
    date_nextday.setDate(date_nextday.getDate() + 2);
    let nextday_Year = date_nextday.getFullYear();
    let nextday_Month = '';
    if(parseInt(date_nextday.getMonth() + 1) < 10){
      nextday_Month =  "0"+parseInt(date_nextday.getMonth() + 1);
    }
    else{
      nextday_Month = parseInt(date_nextday.getMonth() + 1);
    }
    let nextday_date = date_nextday.getDate();
    let nextday_day = date_nextday.getDay();
    global.nextday = nextday_Year+"-"+nextday_Month+"-"+nextday_date;
    global.nextdayName = nextday_day;


    AsyncStorage.getItem("city")
      .then(value => {
        if(!value){
            // AsyncStorage.setItem('city_id', 'abu');
            // AsyncStorage.setItem('city', 'Abu Dhabi');
            // alert('empty');
            // this.apiData('abu');
            // global.City = 'abu';
            // global.City_name = 'Abu Dhabi';

            // this.setState({select_city:true})

            setTimeout(() =>{
              this.setState({
                select_city : true
              })
            },2000)
          }
          else{

            AsyncStorage.getItem("city")
            .then(value => {
              global.City_name = value;
            })
            .done();

            AsyncStorage.getItem("city_id")
            .then(value => {
              
              global.City = value;
              this.apiData(value);
              

            })
            .done();

            setTimeout(() =>{
              this.setState({
                showMe : true
              })
            },3000)
            
          }
        })
      .done();
      
      
      AsyncStorage.getItem("favorite").then((value) => {
        global.Favorites = value;
      })
      .done();

  }

  render(){
    return (
      getUI(this.state.showMe,this.state.select_city)
      );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent : "center",
    alignItems : "center",
    backgroundColor : "#282828",
  },

  img :{
      width : 230,
      height : 65,
      resizeMode: 'stretch'
  },
});