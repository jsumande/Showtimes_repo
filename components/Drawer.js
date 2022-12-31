import * as React from 'react';
import { View, Text ,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';
import Cinemas from './Cinemas';
import City from './City';
import Malls from './Mall';
import Removes from './Remove';
import About from './About';
import Help from './Help';
import Tap from './Tap';
import Movie_City from './Movie_City';
import Movie_Cinema from './Movie_Cinema';
import DrawerContent from './DrawerContent';
import Feedback from './Feedback';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

function HomePage({navigation }) {
  return (
      <View style={{flex:1,backgroundColor:'#191919'}}>
            <View style={{flexDirection:'row',marginBottom : 10, marginTop: 10}}>
                <Icon.Button name="bars" backgroundColor="#191919" size={20} color="white" onPress={() => navigation.toggleDrawer()}/>
                <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Now Showing in Abu Dhabi</Text>

              <View style={{flex:1,alignItems:'flex-end'}}>
                  <Icon.Button name="search" backgroundColor="#191919" size={20} color="white"/>
              </View>
                
            </View>
            {/* Content */}
            <LandingScreen navigations={navigation}></LandingScreen>
      </View>
    
  );
}

function Cinema({ navigation }) {
  return (
    <View style={{flex:1,backgroundColor:'#131313'}}>
      <View style={{flexDirection:'row', marginTop: 10}}>
          <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => navigation.toggleDrawer()}/>
          <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Abu Dubai Cinemas</Text>
      </View>

      <Cinemas navigations={navigation}></Cinemas>
  </View>
  );
}

function Mall({ route,navigation }) {
  const { mall_name } = route.params;
  return (
    <View style={{flex:1,backgroundColor:'#131313'}}>
      <View style={{flexDirection:'row', marginTop: 10}}>
          <Icon.Button name="arrow-left" backgroundColor="#131313" size={20} color="white" onPress={() => navigation.navigate('Abu Dhabi Cinemas'
            ,{
              screen: 'Home',
            })}/>

          <TouchableOpacity onPress={() => navigation.navigate('Abu Dhabi Cinemas'
            ,{
              screen: 'Home',
            })}>
          < Text style={{color:'white',fontSize: 18,paddingTop:5}}>Back</Text>
          </TouchableOpacity>

          <Text style={{color:'white',fontSize: 18,paddingTop:5,paddingLeft:25}}>{mall_name}</Text>

          <View style={{flex:1,alignItems:'flex-end'}}>
                  <Icon.Button name="search" backgroundColor="#191919" size={20} color="white"/>
          </View>

      </View>

      <Malls navigations={navigation}></Malls>
    </View>
  );
}

function Citys({navigation}){
  return(
    <View style={{flex:1,backgroundColor:'#131313'}}>
      <View style={{flexDirection:'row', marginTop: 10}}>
          <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => navigation.toggleDrawer()}/>
          <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Select City</Text>
      </View>
      <City navigations={navigation}></City>
  </View>
  );
}

function Remove({ navigation }){
  return(
    <View style={{flex:1,backgroundColor:'#131313'}}>
      <View style={{flexDirection:'row', marginTop: 10}}>
          <Icon.Button name="bars" backgroundColor="#131313" size={20} color="white" onPress={() => navigation.toggleDrawer()}/>
          <Text style={{color:'white',fontSize: 18,paddingTop:5}}>Remove Ads</Text>
      </View>
     <Removes></Removes>
  </View>
  );
}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        icon ={({color,zie})=>(
          <Icon></Icon>
        )}
        label="Home" onPress={() =>  {props.navigation.navigate('Change City',{screen: 'Home',})}} 
      />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator drawerType="slide" drawerPosition="left" initialRouteName="Abu Dhabi Movies"

    //  drawerStyle={{
    //     backgroundColor : '#191919',
    //   }} 

    //   drawerContentOptions={{
    //     activeTintColor : 'white',
    //     activeBackgroundColor : '#191919',
    //     inactiveTintColor : 'white',
    //     inactiveBackgroundColor : '#191919',
    //     style:{

    //     }
        
    //   }}

      drawerContent={props => <DrawerContent {...props} />}
      // drawerContent={props => <CustomDrawerContent {...props} />}
    >
      
      {/* <Drawer.Screen name="Root" component={MyNavigation} /> */}

      <Drawer.Screen name="Abu Dhabi Movies" component={LandingScreen}
              options={{
                drawerIcon: config => <Icon name={'home'} size={23} color={'white'}/>
              }}
      />

      <Drawer.Screen name="Abu Dhabi Cinemas" component={Cinemas} 
        options={{
          drawerIcon: config => <Icon name={'film'} size={23} color={'white'}/>
        }}
      />

      <Drawer.Screen name="Change City" component={City} 
        options={{
          drawerIcon: config => <Icon name={'map-marker'} size={23} color={'white'}/>
        }}
      />

      <Drawer.Screen name="Remove Ads" component={Removes} 
        options={{
          drawerIcon: config => <Icon name={'share-square'} size={23} color={'white'}/>
        }}
      />

      <Drawer.Screen name="About"  component={About}
        options={{
          drawerIcon: config => <Icon name={'info-circle'} size={23} color={'white'}/>
        }}
      />

      <Drawer.Screen name="Help"  component={Help}
        options={{
          drawerIcon: config => <Icon name={'question-circle'} size={23} color={'white'}/>
        }}
      />

      <Drawer.Screen name="Feedback"  component={Feedback}
        options={{
          drawerIcon: config => <Icon name={'question-circle'} size={23} color={'white'}/>
        }}
      />

      {/* <Drawer.Screen name="Feedback"  component={Feedback}
        options={{
          drawerIcon: config => <Icon name={'question-circle'} size={23} color={'white'}/>
        }}
      /> */}

      </Drawer.Navigator>
  );
}

function MyNavigation() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Home" component={MyDrawer} />
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Mall" component={Malls}/>
      <Stack.Screen name="Cinema" component={Cinemas} />
      <Stack.Screen name="Movie_City" component={Movie_City}/>
      <Stack.Screen name="Movie_Cinema" component={Movie_Cinema}/>
      <Stack.Screen name="Citys" component={City}/>
      <Stack.Screen name="Remove"  component={Removes}/>
      <Stack.Screen name="About"  component={About}/>
      <Stack.Screen name="Help"  component={Help}/>
      <Stack.Screen name="Feedback"  component={Feedback}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyNavigation/>
    </NavigationContainer>
  );
}
