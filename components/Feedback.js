import React, { Component } from 'react';
import {TouchableOpacity,View,Text,ScrollView,TextInput,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import admob,{ BannerAd, BannerAdSize,InterstitialAd, RewardedAd, TestIds,MaxAdContentRating } from '@react-native-firebase/admob';


export default class Feedback extends Component  {


    constructor(){
 
        super();
    
        this.state = {

            addname : '',
            addphone : '',
            addemail : '',
            addsubject : '',

            // modal

            modalSuccess : false,
            modalSuccessClicked : false,

            modalError : false,
            modalErrorClicked : false,
        }

        this.value = {
            sample : 'hello wrold',
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
    }

      
      onsubmit = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let contact = this.state;
        
        let formdata = new FormData();
        formdata.append("addname",contact.addname)
        formdata.append("addphone",contact.addphone)
        formdata.append("addemail",contact.addemail)
        formdata.append("addsubject",contact.addsubject)

        console.log(formdata);

        if(reg.test(this.state.addemail) == true && this.state.addname !== '' && this.state.addphone !== '' && this.state.addsubject !== ''){

            this.setState({
                modalSuccess : true,
                modalError : false,
            });

            fetch('https://liveapper.com/movies/mail.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'X-Accept-Origin': 'file://',
                    },
                    body : formdata,
                });

                this.textInput.clear();
                this.textInput1.clear();
                this.textInput2.clear();
                this.textInput3.clear();
            // .then((response) => response.json())
            // .then((json) => {alert(success)})
            // .catch((error) => console.error(error));
        }
        else{
            this.setState({
                modalError : true,
                modalSuccess : false,
            });

            // alert(this.state.addname + " " + this.state.addemail + " " +  this.state.addphone + " " +  this.state.addsubject);
        }
    }


    modalSuccessClose = () => {
        this.setState({
            modalSuccess : false,
            addname : '',
            addphone : '',
            addemail : '',
            addsubject : '',
        });
        this.props.navigation.goBack()
        // this.props.navigation.closeDrawer();
    }

    modalErrorClose = () => {
        this.setState({
            modalError : false,
            // addname : '',
            // addphone : '',
            // addemail : '',
            // addsubject : '',
        });
    }

    render(){
        const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2682302390410239~8527335166';
        return(
            <View style={{flex:1,backgroundColor:'#131313'}}>

                {/* Success */}
                <Modal  transparent={true} visible={this.state.modalSuccess}>
                  <View style={{flex:1,}}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',borderBottomWidth:1,borderBottomColor:"#3c3c3c"}}>
                          <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Thank you for contacting us</Text>
                      </View>
                      
                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',paddingBottom:10}}>
                        <Text style={{color:'white',textAlign:'left',paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15,fontSize:14}}>We will get back to you as soon as possible.</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>

                            {/* <TouchableOpacity style={{backgroundColor:'white',width:'50%',paddingTop:10,paddingBottom:10,marginRight:10}} onPress={() => this.modalClose()}>
                                <Text style={{textAlign:'center'}}>Cancel</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={{backgroundColor:'#ff6347',width:'100%',paddingTop:10,paddingBottom:10}} onPress={() => this.modalSuccessClose()}>
                              <Text style={{textAlign:'center',color:'white'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>


                {/* Error */}
                <Modal  transparent={true} visible={this.state.modalError}>
                  <View style={{flex:1,}}>
                    <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',borderBottomWidth:1,borderBottomColor:"#3c3c3c"}}>
                          <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Please fill in the form</Text>
                      </View>
                      
                      <View style={{backgroundColor:'#3c3c3caa',width:'75%',paddingBottom:10}}>
                        <Text style={{color:'white',textAlign:'left',paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15,fontSize:14}}>All fields are required.</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>

                            {/* <TouchableOpacity style={{backgroundColor:'white',width:'50%',paddingTop:10,paddingBottom:10,marginRight:10}} onPress={() => this.modalClose()}>
                                <Text style={{textAlign:'center'}}>Cancel</Text>
                            </TouchableOpacity> */}

                            <TouchableOpacity style={{backgroundColor:'#ff6347',width:'100%',paddingTop:10,paddingBottom:10}} onPress={() => this.modalErrorClose()}>
                              <Text style={{textAlign:'center',color:'white'}}>OK</Text>
                            </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>

                <View style={{backgroundColor:'#131313'}}>
                    <View style={{flexDirection:'row',marginBottom : 10, marginTop: 10}}>
                        {/* <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => this.props.navigation.toggleDrawer()}/> */}

                        <Text style={{color:'white',fontSize: 18,paddingTop:5,paddingLeft:10}}>New Conversation</Text>


                        <View style={{flex:1,alignItems:'flex-end'}}>

                            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                <Text style={{color:'white',fontSize: 18,paddingTop:5,paddingRight:10}}>Close</Text>
                            </TouchableOpacity>
   
                        </View>
                    </View>
                </View>

                <ScrollView style={{flex:5,backgroundColor : '#222222',alignself:"center",paddingTop:5}}>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#CECECE',fontSize:17,paddingLeft:10,paddingBottom:10,borderBottomWidth:1,paddingRight:30,paddingTop:10,borderBottomColor:'#333333'}}>Name</Text>
                        <TextInput style={{borderBottomWidth:1,width:'100%',color:'white',borderBottomColor:'#333333'}} onChangeText={(text) => this.setState({addname : text})} ref={input => { this.textInput = input }}></TextInput>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#CECECE',fontSize:17,paddingLeft:10,paddingBottom:10,borderBottomWidth:1,paddingRight:30,paddingTop:10,borderBottomColor:'#333333'}}>Phone</Text>
                        <TextInput style={{borderBottomWidth:1,width:'100%',color:'white',borderBottomColor:'#333333'}} onChangeText={(text) => this.setState({addphone : text})} keyboardType = 'numeric' ref={input => { this.textInput1 = input }}></TextInput>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#CECECE',fontSize:17,paddingLeft:10,paddingBottom:10,borderBottomWidth:1,paddingRight:30,paddingTop:10,borderBottomColor:'#333333'}}>Email</Text>
                        <TextInput style={{borderBottomWidth:1,width:'100%',color:'white',borderBottomColor:'#333333'}} onChangeText={(text) => this.setState({addemail : text})} ref={input => { this.textInput2 = input }}></TextInput>
                    </View>

                    <View>
                        <TextInput
                            onChangeText={(text) => this.setState({addsubject : text})}
                            multiline={true}
                            numberOfLines={5}
                            placeholder="How can we help?"
                            placeholderTextColor="#CECECE"
                            textAlignVertical='top'
                            paddingLeft={10}
                            ref={input => { this.textInput3 = input }}
                            style={{borderBottomWidth:1,width:'100%',color:'white',borderBottomColor:'#333333'}}
                            />
                    </View>

                    <View style={{alignItems:'stretch',paddingTop:20,paddingBottom:50}}>
                            <TouchableOpacity style={{backgroundColor:'#ff6347',padding:15}} onPress={() => this.onsubmit()}>
                                <Text style={{color:'white',alignSelf:'center'}}>Send</Text>
                            </TouchableOpacity>
                    </View>


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