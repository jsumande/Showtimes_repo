import React, { Component } from 'react';
import { StyleSheet,Dimensions,View, Text,Image,TouchableOpacity,ScrollView } from 'react-native';
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
                        <Text style={{color:'white',fontSize: 18,paddingTop:5}}>About</Text>
                    </View>
                </View>

                <ScrollView style={{flex:5,backgroundColor : '#222222',alignself:"center",paddingTop:5}}>

                    <View style={{alignItems:'center',paddingTop:30}}>
                        <Image source={require('./images/logo.png')} style={{width:130,height:130}} />
                    </View>
                    
                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Fed Up of trawling countless cinema{"\n"}
                            websites trying to find out what's showing{"\n"}
                            at your nearest multiplex? Can't get{"\n"}
                            through to customer service at your local{"\n"}
                            cinema's call centre? Getting lost amidst{"\n"}
                            the dross of unofficial,poor quality and{"\n"}
                            fan-made trailers on Youtube? Well, worry{"\n"}
                            no more, all your troubles could soon be{"\n"}
                            over.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Ligts... Camera... Action... It's showtime!
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Cinema Showtime UAE is the first app that{"\n"}
                            allows you to effortlessly source the{"\n"}
                            schedules of any of the country's cinemas{"\n"}
                            instantly.From Abu Dhabi to Ajman,Dubai{"\n"}
                            to Ras Al Khaimah,every city with a cinema{"\n"}
                            is catered for by tge UAE's most accurate,{"\n"}
                            most complete and most in-depth movie{"\n"}
                            listing app.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            It's so simple and intuitive to use.Just{"\n"}
                            select your emirate and the app gives you a{"\n"}
                            full listing of what movies are available.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Let's roll the credits and see what makes{"\n"}
                            Cinema Showtime UAE such a blockbuster:
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:22,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Comprehensive listing of all cinemas in {"\n"}the UAE.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Fast and friendly filter functionality by{"\n"}city and cinema.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Search quickly and easily by movie,{"\n"}genre,actors or plot.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Crisp and clean image-driven user{'\n'}
                            interface- immersive browsing by{'\n'}
                            movie cover and title.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Three-day schedule information.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Favorite your preferred cinemas so{'\n'}
                            they appear first in movie listings.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Full movie details:cover,title,plot,{'\n'}
                            actors,genre,rating,language and{'\n'}
                            runtime.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Whet your appetite by simply tapping{'\n'}
                            on a cover to play the official trailer. 
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Go Behind the scenes for more in-{'\n'}
                            depth info by tapping on actors images{'\n'}
                            or plot section.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Don't take our world for it-get the{'\n'}
                            latest ratings from IMDB, Rotten{'\n'}
                            Tomatoes and Metacritic to help you{'\n'}
                            make up your mind.
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Let your friends know what you're off{'\n'}
                            to see with our simple Social sharing{'\n'}
                            functionality.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            The app is currently covering the following{'\n'}
                            UAE cinemas,and more to come soon:
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            VOX Cinemas
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            NOVO Cinemas
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Reel Cinemas
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Cineroyal
                        </Text>
                    </View>

                    <View style={{marginLeft:40,marginRight:15,paddingTop:15,flexDirection:'row',alignItems:'flex-start',flexWrap:'wrap',flex:1}}>
                        <Text style={{color:'white',width:10}}>{'\u2022'}</Text>
                        <Text style={{color:'white',flex:1,fontSize:15}}>
                            Star Cinemas
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Because we want you to have the best{'\n'}
                            movie-going experience possible,we've{'\n'}
                            done all the hard work so you don't have to.{'\n'}
                            And like all great movies,we're already{'\n'}
                            working on the sequel and we need your{'\n'}
                            feedback to make sure it's more{'\n'}
                            'Terminator 2' than 'Teen Wolf Too'.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Something not working to your liking?{'\n'}
                            Want to see a new feature? Let us know{'\n'}
                            your comments on contact@showtimes.ae{'\n'}
                            and please also take the time to rate our{'\n'}
                            application and post a review in the App{'\n'}
                            store.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:15}}>
                            All that's left now is to sit back and enjoy the show!
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:25}}>
                            Privacy
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Our app uses Google Analytics to collect{'\n'}
                            anonymously usage data. No personal user{'\n'}
                            data is collected.
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:25}}>
                            Data Source
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:25}}>
                        <Text style={{color:'white',fontSize:15}}>
                            Movie showtimes are updated on daily{'\n'}
                            basis according to the UAE local cinemas to{'\n'}
                            guarantee optimum accuracy.Movie{'\n'}
                            covers,metadata and trailers are provided{'\n'}
                            by The Movie Database(TMDb)
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:32}}>
                        <Text style={{color:'white',fontSize:25}}>
                            Copyright
                        </Text>
                    </View>

                    <View style={{marginLeft:30,paddingTop:25,paddingBottom:25}}>
                        <Text style={{color:'white',fontSize:15}}>
                            The app features references to movie{'\n'}
                            covers,metadata and trailer provided by{'n'}
                            The Movie Database(TMDb). We and{'\n'}
                            TMDb respect the right of copyright{'\n'}
                            holders and publishers and requires all{'\n'}
                            users to confirm they own the copyright or{'\n'}
                            have permission from the copyright holder{'\n'}
                            to upload content.We comply with the{'\n'}
                            Digital Millennium Copyright Act(DMCA){'\n'}
                            and expeditiously remove content when{'\n'}
                            properly notified,unless it reasonably{'\n'}
                            appears to us that the content does not{'\n'}
                            infringe upon copyright.
                        </Text>
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