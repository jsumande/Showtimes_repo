import React, { Component } from 'react';
import { StyleSheet,TouchableOpacity,View,Text,FlatList,Image,Dimensions,TextInput,ActivityIndicator,ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';


export default class Cinemas extends Component  {
    
    constructor(){
 
        super();
    
        this.state = {
          today : [],
          tomorrow : [],
          nextday  : [],
          data: [],
          isLoading: true,
    
          default : '',
          buttonInfo : '',
          orientation : 2,
          show : true,

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
        .then(() => {
        });
    
        if(Dimensions.get('window').width > Dimensions.get('window').height){
          this.setState({
            orientation : 3,
          })
        }
        else{
          this.setState({
            orientation : 2,
          })
        }
    
        Dimensions.addEventListener('change',({ window : {width,height}}) => {
            if(width < height){
              this.setState({
                orientation : 2,
              })
            }
            else{
              this.setState({
                orientation : 3,
              })
            }
        });
        this.setState({buttonInfo : 'today',})
        fetch('https://liveapper.com/movies/movies?date='+global.today+'&cinemaid='+this.props.route.params.id
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
              data: json.movies,
              today : json.movies, 
              isLoading : true,
            });
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });

        fetch('https://liveapper.com/movies/movies?date='+global.tomorrow+'&cinemaid='+this.props.route.params.id
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
              tomorrow : json.movies,
              isLoading : true,
            });
         })
         .catch((error) => console.error(error))
         .finally(() => {
           this.setState({ isLoading: false });
        });

      fetch('https://liveapper.com/movies/movies?date='+global.nextday+'&cinemaid='+this.props.route.params.id
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
            nextday : json.movies,
            isLoading : true,
          });
       })
       .catch((error) => console.error(error))
       .finally(() => {
         this.setState({ isLoading: false });
       });

        

      }
    
      getToday = () => {
        this.setState({
          data : [],
          buttonInfo : 'today',
        })

        this.setState({
          data : this.state.today,
          refresh : false,
        })
      };
    
      getTomorrow = () => {

        this.setState({
          data : [],
          buttonInfo : 'tomorrow',
        })

        this.setState({
          data : this.state.tomorrow,
          refresh : false,
        })
      };
    
      getNextDay = () => {

        this.setState({
          data : [],
          buttonInfo : 'nextday',
        })

        this.setState({
          data : this.state.nextday,
          refresh : false,
        })
      };
    
      getAlert = () => {
        alert('sampe')
      };

      showInputField = () => {
        if (this.state.show == true) {
          this.setState({ show: false });
          console.log("Show");
        } 
        else {
          this.setState({ show: true });
    
          if(this.state.buttonInfo == 'today'){
            this.setState({ data : this.state.today, });
          }
          else if(this.state.buttonInfo == 'tomorrow'){
            this.setState({ data : this.state.tomorrow,});
          }
          else if(this.state.buttonInfo == 'nextday'){
            this.setState({ data : this.state.nextday, });
          }
        }
      };

      movie_item = (title,poster,id,imdb,trailer,rated) => {
        let movie_poster = '';
        let date_today = '';
          if(poster.substring(0,6) == 'http:/'){
            movie_poster = poster.replace('http','https');
          }
          else{
            movie_poster = poster;
          }

          if(this.state.buttonInfo == 'today') {date_today = '2020-05-05'; }
          else if(this.state.buttonInfo == 'tomorrow') {date_today = '2020-05-06';}
          else if(this.state.buttonInfo == 'nextday') {date_today = '2020-05-07';}
    
          return(
            <View style={{flex: 1,alignItems:'center',paddingBottom:15}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Movie_Cinema',{id : id,imdb : imdb,title : title,mall_name:this.props.route.params.mall_name,cinema_id:this.props.route.params.id,date_today : date_today,trailer:trailer})}>
                {/* <Image source={{uri: movie_poster}} style={{width: 170, height: 220}}/> */}
                <ImageBackground source={{uri: movie_poster}} style={{width: 170, height: 250}}>
                {/* <View style={{paddingTop:10,paddingLeft:8,backgroundColor:'rgba(255,255,255,0.3)',width:30,height:30,borderRadius: 1000,}}> */}

                {rated ? <Text style={{color:'white',fontSize:12,textAlign:'center',backgroundColor:'rgba(255,255,255,0.3)',paddingTop:8,marginTop:10,marginLeft:7,width:30,height:30,borderRadius: 1000}}>{rated}</Text> : null}
                  
                {/* </View> */}
              </ImageBackground>
                </TouchableOpacity>
                <Text style={{color: "white",paddingTop: 5,textAlign:'center',marginLeft:5,marginRight:5}} >{title}</Text>
            </View>
          );
      }

      handleSearch = (text) => {

        this.setState({
          refresh : true,
          data : [],
        })
    
        let items = [];
        if(this.state.buttonInfo == 'today') {
        items = this.state.today; }
        else if(this.state.buttonInfo == 'tomorrow') {
        items = this.state.tomorrow;}
        else if(this.state.buttonInfo == 'nextday') {
        items = this.state.nextday;}
    
        let filteredName = items.filter((item) => {
          // return item.title.toLowerCase().match(text.toLowerCase())
          return item.title.toLowerCase().includes(text.toLowerCase())
        });
    
        let filteredGenre = items.filter((item) => {
          // return item.title.toLowerCase().match(text.toLowerCase())
          return item.genre.toLowerCase().includes(text.toLowerCase())
        });
    
        let filteredActor = items.filter((item) => {
          // return item.title.toLowerCase().match(text.toLowerCase())
          return item.actors.toLowerCase().includes(text.toLowerCase())
        });
    
        let filteredPlot = items.filter((item) => {
          // return item.title.toLowerCase().match(text.toLowerCase())
          return item.plot.toLowerCase().includes(text.toLowerCase())
        });
    
        let filteredLanguage = items.filter((item) => {
          return item.language.toLowerCase().includes(text.toLowerCase())
        });
    
        if(filteredName.length >= filteredGenre.length && filteredName.length >= filteredActor.length  && filteredName.length >= filteredPlot.length && filteredName.length >= filteredLanguage.length){
          this.setState({
            refresh : false,
            data : filteredName,
          })
        }
        else if(filteredGenre.length >= filteredName.length && filteredGenre.length >= filteredActor.length  && filteredGenre.length >= filteredPlot.length && filteredGenre.length >= filteredLanguage.length){
          this.setState({
            refresh : false,
            data : filteredGenre,
          })
        }
        else if(filteredActor.length >= filteredGenre.length && filteredActor.length >= filteredName.length && filteredActor.length >= filteredPlot.length && filteredActor.length >= filteredLanguage.length){
          this.setState({
            refresh : false,
            data : filteredActor,
          })
        }
        else if(filteredPlot.length >= filteredGenre.length && filteredPlot.length >= filteredName.length && filteredPlot.length >= filteredActor.length  && filteredPlot.length >= filteredLanguage.length){
          this.setState({
            refresh : false,
            data : filteredPlot,
          })
        }
    
        else if(filteredLanguage.length >= filteredGenre.length && filteredLanguage.length >= filteredName.length && filteredLanguage.length >= filteredActor.length  && filteredLanguage.length >= filteredPlot.length){
          this.setState({
            refresh : false,
            data : filteredLanguage,
          })
        }
    
      }
    
      render(){
        const { data, isLoading } = this.state;
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
            return (
                
              <View style={{flex:1,backgroundColor:'#131313'}}>

              <View style={{flexDirection:'row', marginTop: 10}}>
                <Icon.Button name="arrow-left" backgroundColor="#131313" size={20} color="white" 
                onPress={() => this.props.navigation.navigate('Abu Dhabi Cinemas',{screen: 'Home',})}/>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Abu Dhabi Cinemas',{screen: 'Home',})}>
                        < Text style={{color:'white',fontSize: 18,paddingTop:5}}>Back</Text>

                        </TouchableOpacity>
                        {/* <View style={{paddingTop:5,paddingLeft:25}}> */}
                        <View style={{flex:1,alignItems:'center',paddingTop:5,paddingLeft:25}}>
                              <Text style={{color:'white',fontSize: 18}}numberOfLines={1}>{this.props.route.params.mall_name}</Text>
                        </View>

                        <View style={{flex:1,alignItems:'flex-end'}}>

                          {this.state.show ? (
                            <Icon.Button name="search" backgroundColor="#191919" size={20} color="white" onPress={() => this.showInputField()}/>
                            ) : 
                            <Icon.Button name="times" backgroundColor="#191919" size={20} color="white" onPress={() => this.showInputField()}/>
                          }

                        </View>

                </View>

                {this.state.show ? (
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
                  ) : 
                  <View style={{width: '90%', marginLeft : 'auto',marginRight : 'auto'}}>
                    <TextInput placeholder="Search Movies,Geners,Stars,Plot..." 
                    style={{borderColor: 'white',borderWidth : 1,
                    height:36,backgroundColor:'white',borderRadius:3,marginBottom : 5}}
                    onChangeText={this.handleSearch}
                    ></TextInput>
                  </View>
                  }
    
                  <View style={{flex:5,backgroundColor : '#222222',paddingTop: 5}}>

                    {isLoading ? 
                    <View style={{flex: 1,
                      justifyContent: "center"}}>
                        <ActivityIndicator size="large" color="white" />
                    </View> 
                  : (
                    <View>
                      <FlatList
                        data={data}
                        numColumns={this.state.orientation}
                        key={this.state.orientation}
                        renderItem = {({item}) => this.movie_item(item.title,item.poster,item.id,item.imdb,item.trailer,item.rated)}
                        keyExtractor={({ id }, index) => id}
                        ListEmptyComponent = {() => (
                          <View style={{alignItems:'center',backgroundColor:'#3c3c3c',paddingLeft:10,paddingRight:5,borderRadius:3,marginLeft:15,marginRight:15,marginBottom:25}}>
                            <Text style={{color:'white',paddingTop:50,paddingBottom:50}}>Sorry,there are no shows in this cinema today</Text>
                          </View>
                        )}
                        />
                    </View>
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
    