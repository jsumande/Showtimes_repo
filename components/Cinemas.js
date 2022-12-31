import React, { Component } from 'react';
import { StyleSheet,Dimensions,View, Text,TouchableOpacity,FlatList,Navigator } from 'react-native';
import {AsyncStorage} from 'react-native';
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Cinemas extends Component  {

    constructor(){
 
        super();
    
        this.state = {
          mall : [
            { mall_name : "BAS Mall-Baniyas", key : "1", type : "NOVO" },
            { mall_name : "WTC", key : "2", type : "NOVO" },
            { mall_name : "Khalidiyah Mall", key : "4", type : "ROYAL" },
            { mall_name : "Dalma Mall", key : "5", type : "ROYAL" },
            { mall_name : "Paragon Mall", key : "6", type : "ROYAL" },
            { mall_name : "Deerfields Mall", key : "7", type : "ROYAL" },
            { mall_name : "Ruwais Mall", key : "8", type : "ROYAL" },
            { mall_name : "National Cinema", key : "9", type : "STAR" },
            { mall_name : "Grand Safeer Cinema", key : "10", type : "STAR" },
            { mall_name : "Star Cinemas", key : "11", type : "STAR" },
            { mall_name : "Marina Mall", key : "12", type : "VOX" },
            { mall_name : "Yas Mall", key : "13", type : "VOX" },
            { mall_name : "Nation Towers Abu Dhabi", key : "14", type : "VOX" },
            { mall_name : "Abu Dhabi Mall", key : "15", type : "VOX" },
            { mall_name : "The Galleria Al Maryah", key : "16", type : "VOX" },
          ],
            orientation : 1,
            heartColor : 1,
            widths : '15%',
            heights : '70%',

          data: [],
          isLoading: true,
          city : '',


          samples : [
            {value_index : 3},
            {value_index : 2},
            {value_index : 23},
            {value_index : 11},
            {value_index : 25},
            {value_index : 26},
          ],
          sample : '',
          sample2 : '',
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
            widths : '15%',
            heights : '70%',
          })
        }
        else{
          this.setState({
            widths : '25%',
            heights : '60%',
          })
        }
    
        Dimensions.addEventListener('change',({ window : {width,height}}) => {
            if(width < height){
              this.setState({
                widths : '25%',
                heights : '60%',
              })
            }
            else{
              this.setState({
                widths : '15%',
                heights : '70%',
              })
            }
        });

        // fetch('https://liveapper.com/movies/cinemas'
        //    ,{
        //         method: 'GET',
        //         headers: {
        //         Accept: 'application/json',
        //         'X-Accept-Origin': 'file://',
        //         }, 
        //     })
        //   .then((response) => response.json())
        //   .then((json) => {
        //     this.setState({ data: json.cinemas });
        //   })
        //   .catch((error) => console.error(error))
        //   .finally(() => {
        //     this.setState({ isLoading: false });
        //   });

          let parses = JSON.parse(global.Favorites)
          this.setState({ 
            sample: parses,
            // sample2: parses,
           });

          AsyncStorage.getItem("city")
          .then(value => {
              this.setState({ city: value });
            })
        .done();

        // AsyncStorage.getItem("favorite").then((value) => {
        //   this.setState({ sample2: value });
        // })
        // .then(res => {
        //   let parses = JSON.parse(this.state.sample2)
        //   this.setState({ sample: parses });
        //    console.log(this.state.sample);
        // }).done(alert("done"));

    }

    _renderList = ({item,index}) => {

        let BGcolors = '';
        let Fcolors = '';
        let datas = [];
        let favorite_check = false;


        if(this.state.sample != null){
          for(let i =0;i< this.state.sample.length;i++){

            if(index == this.state.sample[i].value_index){
              datas.push(
                <View>
                      <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#FFF000' onPress={()=> this.onButtonUnselect(index,i)  }/>
                </View>
              );
              favorite_check = true;
              break;
            }
            else{
              favorite_check = false;
            }
          }
        }

        

        if(item.company == 'Novo'){
            BGcolors = '#FFF000';
            Fcolors = '#342A0F';
        }
        else if(item.company == 'Royal'){
            BGcolors = '#6D1F7D';
            Fcolors = '#FFFFFF';
        }
        else if(item.company == 'Star'){
            BGcolors = '#990100';
            Fcolors = '#FFFFFF';
        }
        else if(item.company == 'CINEMAX'){
          BGcolors = '#ff6347';
          Fcolors = '#FFFFFF';
        }
        else if(item.company == 'Reel'){
          BGcolors = '#ff6347';
          Fcolors = '#FFFFFF';
        }
        else if(item.company == 'ROXY'){
          BGcolors = '#000000';
          Fcolors = '#FFFFFF';
        }
        else{
            BGcolors = '#447DC0';
            Fcolors = '#FFFFFF';
        }
        
        return(
            <View style={{flex: 1}}>
                {item.cityid == global.City ?
                <View style={{flexDirection:"row"}}>
                                
                  <TouchableOpacity style={{backgroundColor:[BGcolors],width:this.state.widths,paddingTop:10,paddingBottom:10,
                  paddingRight:5,borderBottomWidth:1,borderColor:'#555555',alignItems: 'flex-start'}} 
                  // onPress={() => this.Mall}
                  onPress={() => this.props.navigation.navigate('Mall',{mall_name : item.cinema,id : item.id})}
                  
                  >

                  <Text style={{color: [Fcolors],fontSize:17,alignSelf:'center'}} > {item.company}</Text>

                  </TouchableOpacity>
                      

                    <View style={{paddingTop:12,width: this.state.heights,paddingBottom:10,paddingLeft:5,paddingRight:5,borderBottomWidth:1,borderColor:'#555555'}}>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Mall',{mall_name : item.cinema,id : item.id})}>
                          <View style={{flex:1,alignItems:'flex-start'}}>
                            <Text style={{color: "white",fontSize:15}} >{item.cinema}</Text>
                          </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{paddingTop:5,width: '15%',paddingBottom:3,paddingLeft:3,paddingRight:3,borderBottomWidth:1,alignItems:'flex-end',borderColor:'#555555'}}>
                        {/* {index == 2 ? 
                          <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#FFF000'/>: (
                          <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#555555' onPress={()=> this.onButoonPress(index)  }/>
                        )} */}
                       
                       {/* { datas } */}
                       {/* <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#555555' onPress={()=> this.onButoonPress()  }/> */}

                       {favorite_check == false ? <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#555555' onPress={()=> this.onButoonPress(index)  }/>  : (
                         datas
                       )}
                        

                    </View>

                </View>: (null)}
            </View>
        );
    }

    onButtonUnselect = (values,index) => {
        let array_data = this.state.sample;
        // array_data.splice( array_data.indexOf(values), 1 );
        array_data.splice(index,1);
        this.setState({sample : array_data,})
        let string = JSON.stringify(this.state.sample)
        AsyncStorage.setItem('favorite',string);
       
    }

    onButoonPress = (values) => {
      // console.log(values);
      if(this.state.sample != null){
        let array_data = this.state.sample;
        let obj = {'value_index':values};
        array_data.push(obj);

        this.setState({sample : array_data,})
        console.log(this.state.sample);
        let string = JSON.stringify(this.state.sample)
        AsyncStorage.setItem('favorite',string);
      }
      else{
        let array_data = [];
        let obj = {'value_index':values};
        array_data.push(obj);

        this.setState({sample : array_data,})
        console.log(this.state.sample);

        let string = JSON.stringify(this.state.sample)
        AsyncStorage.setItem('favorite',string);
      }

    }

    // item = (type,mall,cityid,id,index) =>{

    //     let BGcolors = '';
    //     let Fcolors = '';

    //     if(type == 'Novo'){
    //         BGcolors = '#FFF000';
    //         Fcolors = '#342A0F';
    //     }
    //     else if(type == 'Royal'){
    //         BGcolors = '#6D1F7D';
    //         Fcolors = '#FFFFFF';
    //     }
    //     else if(type == 'Star'){
    //         BGcolors = '#990100';
    //         Fcolors = '#FFFFFF';
    //     }
    //     else if(type == 'CINEMAX'){
    //       BGcolors = '#ff6347';
    //       Fcolors = '#FFFFFF';
    //     }
    //     else if(type == 'Reel'){
    //       BGcolors = '#ff6347';
    //       Fcolors = '#FFFFFF';
    //     }
    //     else if(type == 'ROXY'){
    //       BGcolors = '#000000';
    //       Fcolors = '#FFFFFF';
    //     }
    //     else{
    //         BGcolors = '#447DC0';
    //         Fcolors = '#FFFFFF';
    //     }

    //     return(
    //         <View style={{flex: 1}}>
    //             {cityid == global.City ?
    //             <View style={{flexDirection:"row"}}>
                                
    //               <TouchableOpacity style={{backgroundColor:[BGcolors],width:this.state.widths,paddingTop:10,paddingBottom:10,
    //               paddingRight:5,borderBottomWidth:1,borderColor:'#555555',alignItems: 'flex-start'}} 
      
    //               onPress={() => this.props.navigation.navigate('Mall',{mall_name : mall,id : id})}
                  
    //               >

    //               <Text style={{color: [Fcolors],fontSize:17,alignSelf:'center'}} > {type}</Text>

    //               </TouchableOpacity>
                      

    //                 <View style={{paddingTop:12,width: this.state.heights,paddingBottom:10,paddingLeft:5,paddingRight:5,borderBottomWidth:1,borderColor:'#555555'}}>

    //                     <TouchableOpacity onPress={() => this.props.navigation.navigate('Mall',{mall_name : mall,id : id})}>
    //                       <View style={{flex:1,alignItems:'flex-start'}}>
    //                         <Text style={{color: "white",fontSize:15}} >{index} {mall}</Text>
    //                       </View>
    //                     </TouchableOpacity>
    //                 </View>

    //                 <View style={{paddingTop:5,width: '15%',paddingBottom:3,paddingLeft:3,paddingRight:3,borderBottomWidth:1,alignItems:'flex-end',borderColor:'#555555'}}>
    //                     {index == 2 ? 
    //                       <Icon.Button name="heart" backgroundColor="#222222" size={20} color='#FFF000'/>: (
    //                       <Icon.Button name="heart" backgroundColor="#222222" size={20} color={this.state.heartColor} onPress={()=> this.onButoonPress()  }/>
    //                     )}

    //                     <Icon.Button name="heart" backgroundColor="#222222" size={20} color={this.state.heartColor} onPress={()=> this.onButoonPress()  }/>

    //                 </View>

    //             </View>: (null)}
    //         </View>
    //     );
    // }



    footer= () => {
        return(
        <View style={{flex:1,padding:25}}>
          <Text style={{color:'#555555',alignSelf:'center',fontSize:16}}>More cinemas coming soon!</Text>
        </View>);
    }

    render(){

      const { data, isLoading } = this.state;
      const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
        return(
            <View style={{flex:1}}>

              <View style={{backgroundColor:'#131313'}}>
                  <View style={{flexDirection:'row', marginTop: 10}}>
                      <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => this.props.navigation.toggleDrawer()}/>
                      <Text style={{color:'white',fontSize: 18,paddingTop:5}}>{global.City_name} Cinemas</Text>
                  </View>
              </View>

              <View style={{flex:5,backgroundColor : '#222222'}}>
                  <FlatList
                        data={global.Cinema_by_city}
                        numColumns={this.state.orientation}
                        key={this.state.orientation}
                        ListFooterComponent={this.footer}
                        // renderItem = {({item,index}) => this.item(item.company,item.cinema,item.cityid,item.id,index)}
                        renderItem = {this._renderList}
                        keyExtractor={({ id }, index) => id}
                  />
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

// export class Mall extends Component{
//   render(){
//     return(
//       <View>
//         <Text>Hello World</Text>
//       </View>
//     );
//   }
// }


// export default class App extends Component{
//   render(){
//     return(
//       <Cinemas></Cinemas>
//     );
//   }
// }
