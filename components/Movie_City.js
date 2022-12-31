import React, { Component } from 'react';
import { Image,StyleSheet,View, Text,ImageBackground,TouchableOpacity,ActivityIndicator,ScrollView,FlatList,Share,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import YouTube from 'react-native-youtube';
import PushNotification from "react-native-push-notification";
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';



export default class MovieCity extends Component  {


    constructor(){
        super();

        this.state = {
      
            // API
            isLoading: true,
            movie_data : [],
            mall_data : [],
            refresh : true,
            Img_info : '',

            buttonInfo : '',
            refresh : true,

            today : [],
            tomorrow : [],
            nextday  : [],


            // youtube

            play :false,
            hidden:false,
            fullscreen :false,
            status : '',


            // modal

            modalDisplay : false,
            mallClicked : '',

            modalPlot : false,
            starring_info : '',
            plot_info : '',

            // Cinema Notification

            time_format : '',
            schedule : '',
            company : '',
            cinema : '',

            weekday : [
              {weekdayName : "Sunday"},
              {weekdayName : "Monday"},
              {weekdayName : "Tuesday"},
              {weekdayName : "Wednesday"},
              {weekdayName : "Thursday"},
              {weekdayName : "Friday"},
              {weekdayName : "Saturday"},
            ],

    
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

        fetch('https://liveapper.com/movies/movies?id='+this.props.route.params.id+'&cityid='+global.City
           ,{
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'X-Accept-Origin': 'file://',
                }, 
            })
          .then((response) => response.json())
          .then((json) => {
            this.setState({ 
              movie_data : json.movies,
            });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ 
              isLoading: false,
            });

            if(this.state.movie_data[0].poster.substring(0,6) == 'http:/'){
                this.setState({
                    Img_info : this.state.movie_data[0].poster.replace('http','https'),
                })
            }else{
                this.setState({
                    Img_info : this.state.movie_data[0].poster,
                })
            }

        });
        this.setState({buttonInfo : 'today',})

        fetch('https://liveapper.com/movies/times?date='+global.today+'&movieid='+this.props.route.params.imdb+'&cityid='+global.City
           ,{
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'X-Accept-Origin': 'file://',
                }, 
            })
          .then((response) => response.json())
          .then((json) => {
            this.setState({ 
              mall_data : json.times,
              today : json.times,
            });
          })
          .catch((error) => console.error(error))
          .finally();

        fetch('https://liveapper.com/movies/times?date='+global.tomorrow+'&movieid='+this.props.route.params.imdb+'&cityid='+global.City
          ,{
               method: 'GET',
               headers: {
               Accept: 'application/json',
               'X-Accept-Origin': 'file://',
               }, 
           })
         .then((response) => response.json())
         .then((json) => {
           this.setState({ 
                tomorrow : json.times,
           });
         })
         .catch((error) => console.error(error))
         .finally();

        fetch('https://liveapper.com/movies/times?date='+global.nextday+'&movieid='+this.props.route.params.imdb+'&cityid='+global.City
           ,{
                method: 'GET',
                headers: {
                Accept: 'application/json',
                'X-Accept-Origin': 'file://',
                }, 
            })
          .then((response) => response.json())
          .then((json) => {
            this.setState({ 
                nextday : json.times,
            });
          })
          .catch((error) => console.error(error))
          .finally();

    }

    getToday = () => {

        this.setState({
             mall_data : [],
            buttonInfo : 'today',
            refresh : true,
        })
        
    
        this.setState({
          // movie_data : [],
          refresh : false,
          mall_data : this.state.today,
          // buttonInfo : 'today',
        })
      };
    
      getTomorrow = () => {
    
        this.setState({
          refresh : true,
          mall_data : [],
          buttonInfo : 'tomorrow',
        })
    
        this.setState({
          // movie_data : [],
          refresh : false,
          mall_data : this.state.tomorrow,
          // buttonInfo : 'tomorrow',
          // refresh : false,
        })
      };
    
      getNextDay = () => {
    
        this.setState({
          refresh : true,
          mall_data : [],
          buttonInfo : 'nextday',
        })
    
        this.setState({
          // movie_data : [],
          refresh : false,
          mall_data : this.state.nextday,
          // buttonInfo : 'nextday',
        })
      };

      youtubePlay = () =>{
          this.setState({
            play : true,
            fullscreen : true,
            hidden : true,
          });
      }


      fullscreen = (e) =>{

        if(!e.isFullscreen){
          this.setState({
            play : false,
            fullscreen : false,
            hidden : false,
          });
          // alert(e.isFullscreen);
        }
      }

      errors = (e) => {
        // this.setState({
        //   play : false,
        //   fullscreen : false,
        //   hidden : false,
        // });
        if(e.error == 'UNKNOWN'){
            
       this.setState({
          // play : false,
          fullscreen : false,
          // hidden : false,
        });
        }

      }

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

    mall_item = (type,cinema,company,time) => {

        let BGcolors = '';
        let Fcolors = '';
        let data_array = time.split(',');
        let datas = [];


        for(let i =0;i< data_array.length;i++){

            let date = new Date();
            let hour = data_array[i].substring(0,2);
            let time = data_array[i].substring(0,2);
            let minute = data_array[i].substring(2,4);
            let mid = 'AM';

            if (hour > 12) {
              hour = hour - 12;
              if(hour < 10){
                hour = "0"+hour;
              }
                hour = hour;
            }
            else{
              if(hour < 10){
                hour = "0"+hour;
              }
                hour = hour;
            }   
            if(hour==0){ 
                hour=12;
            }
            if(time >= 12){
                mid = 'PM'
            }

            let format = data_array[i].substring(0,2)+":"+data_array[i].substring(2,4)+" "+mid;
            let schedule = hour+":"+minute+" "+mid;

            datas.push(
                <TouchableOpacity style={{backgroundColor:'#3c3c3c',width:'20%',paddingTop:10,paddingBottom:10,borderWidth:1,borderRadius:2,borderColor:'#3c3c3c',marginLeft:15,marginTop:15}} onPress={() => this.modalView(cinema,format,schedule,company)}>
                    <Text style={{color: 'white',fontSize:13,alignSelf:'center'}} > {hour}:{minute} {mid}</Text>
                </TouchableOpacity>
            )
        }


        if(company == 'Novo'){
            BGcolors = '#FFF000';
            Fcolors = '#342A0F';
        }
        else if(company == 'Royal'){
            BGcolors = '#6D1F7D';
            Fcolors = '#FFFFFF';
        }
        else if(company == 'Star'){
            BGcolors = '#990100';
            Fcolors = '#FFFFFF';
        }
        else if(company == 'CINEMAX'){
          BGcolors = '#ff6347';
          Fcolors = '#FFFFFF';
        }
        else if(company == 'Reel'){
          BGcolors = '#ff6347';
          Fcolors = '#FFFFFF';
        }
        else if(company == 'ROXY'){
          BGcolors = '#000000';
          Fcolors = '#FFFFFF';
        }
        else{
            BGcolors = '#447DC0';
            Fcolors = '#FFFFFF';
        }

          return(
            <View style={{flex: 1,paddingBottom:15,paddingTop:15,marginLeft:10,marginRight:10,}}>
                
                <View style={{flexDirection:'row'}}>

                <TouchableOpacity style={{backgroundColor:[BGcolors],width:'25%',paddingTop:10,paddingBottom:10,paddingRight:5,borderBottomWidth:1,borderColor:'#555555',alignItems: 'flex-start'}} >
                  <Text style={{color: [Fcolors],fontSize:17,alignSelf:'center'}} > {company}</Text>
                </TouchableOpacity>

                <View style={{paddingTop:12,width: '75%',paddingBottom:10,paddingLeft:5,paddingRight:5,borderBottomWidth:1,backgroundColor:'white'}}>
                    <TouchableOpacity>
                        <View style={{flex:1,alignItems:'flex-start'}}>
                            <Text style={{color: "#342A0F",fontSize:15}} > {cinema}</Text>
                          </View>
                    </TouchableOpacity>
                </View>

                </View>


                <View style={{marginLeft:15,paddingTop:10}}>
                    <Text style={{color:'white'}}>{type}</Text>
                </View>

                <View style={{paddingBottom:15,width:'100%'}}>
                    <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
                        { datas }
                    </View>
                </View>

            </View>
          );
      }

      modalView = (cinema,format,schedule,company) => {

        this.setState({
          time_format : '',
          schedule : '',
          company : '',
          cinema : '',
        });


        this.setState({
          time_format : format,
          schedule : schedule,
          company : company,
          cinema : cinema,
        });


        this.setState({
          modalDisplay:true,
          mallClicked : cinema,
        });
      }

      modalPlot = (actor,plot) => {
        this.setState({
          modalPlot:true,
          starring_info : actor,
          plot_info : plot,
        });
      }

      modalClose = () => {
        this.setState({
          modalDisplay:false,
        });
      }

      setReminder = () => {
        

        let time = this.state.time_format;
        let hour = time.substring(0,2);
        let minutes = time.substring(3,5);
        let date = new Date();
        date.setHours(parseInt(hour - 1));
        date.setMinutes(minutes);
        date.setSeconds(0);

        PushNotification.localNotificationSchedule({

          title: this.props.route.params.title +" , "+this.state.schedule, 
          message: this.state.company+" - "+this.state.cinema, 
          date: new Date(date),
        });


        this.setState({
          modalDisplay:false,
        });
      }
  

    render(){
        const { movie_data,mall_data,isLoading } = this.state;
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
        return(
            <View style={{flex:1,backgroundColor:'#131313'}}>

                <View style={{flexDirection:'row', marginTop: 10}}>
                 <Icon.Button name="arrow-left" backgroundColor="#131313" size={20} color="white" 
                    onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})}/>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Abu Dhabi Movies',{screen: 'Home',})}>
                        < Text style={{color:'white',fontSize: 18,paddingTop:5}}>Back</Text>

                        </TouchableOpacity>
                        {/* <View style={{paddingTop:5,paddingLeft:25}}> */}
                        <View style={{flex:1,alignItems:'center',paddingTop:5,paddingLeft:25}}>
                              <Text style={{color:'white',fontSize: 18}}numberOfLines={1}>{this.props.route.params.title}</Text>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end'}}>
                            <Icon.Button name="share-square" backgroundColor="#191919" size={20} color="white" onPress={this.onShare}/>
                        </View>

                </View>


                <Modal  transparent={true} visible={this.state.modalDisplay}>
                  <View style={{flex:1,}}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',borderBottomWidth:1,borderBottomColor:"#3c3c3c"}}>
                          <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>{this.props.route.params.title} - {this.state.mallClicked}</Text>
                      </View>
                      
                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',paddingBottom:10}}>
                        <Text style={{color:'white',textAlign:'left',paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15,fontSize:14}}>We will remind you an hour before the show starts.</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
                            <TouchableOpacity style={{backgroundColor:'white',width:'50%',paddingTop:10,paddingBottom:10,marginRight:10}} onPress={() => this.modalClose()}>
                                <Text style={{textAlign:'center'}}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{backgroundColor:'#ff6347',width:'50%',paddingTop:10,paddingBottom:10}} onPress={() => this.setReminder()}>
                              <Text style={{textAlign:'center',color:'white'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Modal  transparent={true} visible={this.state.modalPlot}>
                  <View style={{flex:1,}}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                      <View style={{backgroundColor:'#3c3c3caa',width:'85%',borderBottomWidth:1,borderBottomColor:"#3c3c3c"}}>
                          <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>{this.props.route.params.title}</Text>
                      </View>
                      
                      <View style={{backgroundColor:'#3c3c3caa',width:'85%',paddingBottom:10}}>

                        <Text style={{color:'white',textAlign:'left',paddingTop:15,paddingLeft:15,paddingRight:15,fontSize:15}}>Starring</Text>
                        <Text style={{color:'white',textAlign:'left',paddingTop:10,paddingBottom:15,paddingLeft:15,paddingRight:13,fontSize:14}}>{this.state.starring_info}</Text>

                        <Text style={{color:'white',textAlign:'left',paddingTop:15,paddingLeft:15,paddingRight:15,fontSize:15}}>Summary</Text>
                        <Text style={{color:'white',textAlign:'left',paddingTop:10,paddingBottom:30,paddingLeft:15,paddingRight:15,fontSize:13}}>{this.state.plot_info}</Text>
                        
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
                            <TouchableOpacity style={{backgroundColor:'#ff6347',width:'100%',paddingTop:15,paddingBottom:15}} onPress={() => this.setState({modalPlot:false})}>
                              <Text style={{textAlign:'center',color:'white'}}>OK</Text>
                            </TouchableOpacity>
                        </View>

                      </View>
                    </View>
                  </View>
                </Modal>

                <View style={{width: '90%', marginLeft : 'auto',marginRight : 'auto'}}>
                {/* <View style={{flexDirection:'row',marginBottom : 10, marginTop: 10}}>
                  
                <Icon.Button name="bars" backgroundColor="#282828" size={20} color="white" onPress={this.toggleDrawer.bind(this)}/>
                  <Text style={{color:'white',fontSize: 15,paddingTop:7}}>Now Showing in Abu Dhabi</Text>
                </View> */}

                <View style={{flexDirection:'row',marginBottom : 5,height: 36,position: 'relative'}}>
                  {/* <View style={{position:'absolute',width:"33.33%",height:'100%',top : 0,left: 0 , backgroundColor: '#ff6347'}}/> */}
                  <TouchableOpacity
                    style={[(this.state.buttonInfo) == 'today' ? styles.active : styles.deactive,{borderTopLeftRadius : 3,borderBottomLeftRadius:3}]}

                    onPress={(this).getToday}
                    // onPress={() => this.props.navigations.navigate('Article')}
                  >
                    <Text style={{color:'white'}}>Today</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[(this.state.buttonInfo) == 'tomorrow' ? styles.active : styles.deactive]}
                    onPress={this.getTomorrow}
                  >
                    <Text style={{color:'white'}}>Tomorrow</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[(this.state.buttonInfo) == 'nextday' ? styles.active : styles.deactive,{borderTopRightRadius : 3, borderBottomRightRadius : 3}]}
                    onPress={this.getNextDay}
                  >
                    <Text style={{color:'white'}}>{this.state.weekday[global.nextdayName].weekdayName}</Text>
                  </TouchableOpacity>

                </View>
              </View>


                <View style={{flex:5,backgroundColor : '#222222'}}>
                    {isLoading ? 
                        <View style={{flex: 1,justifyContent: "center"}}>
                            <ActivityIndicator size="large" color="white" />
                        </View> 
                    : (

                    <ImageBackground source={{uri:this.state.Img_info}} style={{resizeMode:'cover',flex:1}}>
                        <ScrollView style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)'}}>

                            <View style={{paddingTop:10,marginLeft:10,marginRight:10,flexDirection:'row',width:'100%'}}>
                              <TouchableOpacity onPress={() => this.youtubePlay()}>
                                {/* <Image  source={{uri: this.state.Img_info}} style={{width: 140, height: 220}} /> */}
                                <ImageBackground source={{uri: this.state.Img_info}} style={{width: 140, height: 220}}>
                                <View style={{paddingTop:80,alignSelf:'center'}}>
                                    <Icon name={'play-circle'} size={60} color={'#CECECE'}/>
                                </View>
                                </ImageBackground>
                                
                              </TouchableOpacity>

                                <View style={{width:'50%',marginLeft:10,marginRight:10}}>
                                     <Text style={{color:'white',fontSize: 17}}>{movie_data[0].title}</Text>

                                      <TouchableOpacity onPress={() => this.modalPlot(movie_data[0].actors,movie_data[0].plot)}>
                                        <Text style={{color:'white',fontSize: 12,paddingTop:10}} numberOfLines={8} >{movie_data[0].plot}</Text>
                                      </TouchableOpacity>
                                     
                                     <Text style={{color:'white',fontSize: 12,paddingTop:5}}>{movie_data[0].genre}</Text>
                                     <Text style={{color:'white',fontSize: 12,paddingTop:10}}>{movie_data[0].runtime} Minutes , {movie_data[0].language}</Text>

                                    <View style={{flexDirection:'row',paddingTop:10}}>
                                        <Image style={{width:15,height:15}} source={require('./images/movie/icon-imdb.png')}></Image>
                                        <Text style={{color:'white',paddingLeft:5,paddingRight:5}}>{movie_data[0].rating_imdb}%</Text>
                                        <Image style={{width:15,height:15}} source={require('./images/movie/icon-rotten.png')}></Image>
                                        <Text style={{color:'white',paddingLeft:5,paddingRight:5}}>{movie_data[0].rating_rotten}%</Text>
                                        <Image style={{width:15,height:15}} source={require('./images/movie/icon-meta.png')}></Image>
                                        <Text style={{color:'white',paddingLeft:5,paddingRight:5}}>{movie_data[0].rating_meta}%</Text>
                                    </View>

                                </View>

                            </View>

                            {/* <View style={{paddingTop:10,marginLeft:10,marginRight:10,alignContent:'flex-start'}}>
                                <View style={{width:'100%'}}>
                                    <Text style={{color:'white',fontSize:12}}>Starring : {movie_data[0].actors}</Text>
                                </View>

                                <View style={{width:'100%',flexDirection:'row',paddingTop:5}}>
                                    <Text style={{color:'white',fontSize:12}}>Rated :</Text>

                                    <View style={{borderColor:'#ff6347',borderWidth:1,backgroundColor:'#ff6347',borderRadius:2,paddingLeft:5,paddingRight:5,marginLeft:5}}>
                                        <Text style={{color:'white',fontSize:12}}>{movie_data[0].rated}</Text>
                                    </View>
                                   
                                </View>

                                <View style={{width:'100%'}}>
                                    <Text style={{color:'white',fontSize:12}}>Popularity : {movie_data[0].popularity}</Text>
                                </View>
                                                              
                            </View> */}

                            <FlatList
                            data={mall_data}
                            renderItem = {({item}) => this.mall_item(item.type,item.cinema,item.company,item.time)}
                            keyExtractor={({ id }, index) => id}
                            refreshing={this.state.refresh}
                            // keyExtractor={item => item.key}
                            />

                          {this.state.play ?
                          <YouTube
                            videoId={this.props.route.params.trailer}
                            play={this.state.play}
                            hidden={this.state.hidden}
                            fullscreen = {this.state.fullscreen}
                            apiKey="yourApiKey"
                            onChangeFullscreen = {e => this.fullscreen(e)}
                            onError={e => this.errors(e)}
                            style={{ alignSelf: 'stretch', height: 300 }}
                          />
                          : null
                          }
                

                        </ScrollView>
                    </ImageBackground>
                     )}

                </View>

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
    active : {
      backgroundColor:'#ff6347',
      borderColor: '#ff6347',
      flex : 1,justifyContent: 'center',alignItems: 'center',borderWidth : 1,
    },
  
    deactive : {
      borderColor: '#3c3c3c',
      backgroundColor:'#3c3c3c',
      flex : 1,justifyContent: 'center',alignItems: 'center',borderWidth : 1,
    },
  
  });
  