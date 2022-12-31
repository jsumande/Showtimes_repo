import React, { Component } from 'react';
import { StyleSheet,Button,View, Text,Image,FlatList } from 'react-native';
import { NavigationContainer , DrawerActions} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

// const today = [
//   { name : "Spider-Man", key : "1", img : require('./images/poster/marvel/Poster_1.jpg') },
//   { name : "Black Panther", key : "2", img : require('./images/poster/marvel/Poster_2.jpg') },
//   { name : "Captain Marvel", key : "3", img : require('./images/poster/marvel/Poster_3.jpg') },
//   { name : "Avengers", key : "4", img : require('./images/poster/marvel/Poster_4.jpg') },
//   { name : "Thor", key : "5", img : require('./images/poster/marvel/Poster_5.jpg') },
//   { name : "Guardians of the Galaxy", key : "6", img : require('./images/poster/marvel/Poster_6.jpg') },
//   { name : "Iron Man 3", key : "7", img : require('./images/poster/marvel/Poster_7.jpg') },
//   { name : "Captain America", key : "8", img : require('./images/poster/marvel/Poster_8.jpg') },
// ];

// const tomorrow = [
//   { name : "Aquaman", key : "1", img : require('./images/poster/dc/Poster_1.jpg') },
//   { name : "Justice League", key : "2", img : require('./images/poster/dc/Poster_2.jpg') },
//   { name : "Batman vs Superman", key : "3", img : require('./images/poster/dc/Poster_3.jpg') },
//   { name : "The Dark Knight", key : "4", img : require('./images/poster/dc/Poster_4.jpg') },
//   { name : "Wonder Woman", key : "5", img : require('./images/poster/dc/Poster_5.jpg') },
//   { name : "Shazam", key : "6", img : require('./images/poster/dc/Poster_6.jpg') },
//   { name : "Suicide Squad", key : "7", img : require('./images/poster/dc/Poster_7.jpg') },
//   { name : "Joker", key : "8", img : require('./images/poster/dc/Poster_8.jpg') },
// ];

// const nextday = [
//   { name : "How to train your DRAGON", key : "1", img : require('./images/poster/cartoon/Poster_1.jpg') },
//   { name : "BIG HERO 6", key : "2", img : require('./images/poster/cartoon/Poster_2.jpg') },
//   { name : "Toy Story 4", key : "3", img : require('./images/poster/cartoon/Poster_3.jpg') },
//   { name : "Ralph Breaks the Internet", key : "4", img : require('./images/poster/cartoon/Poster_4.jpg') },
//   { name : "COCO", key : "5", img : require('./images/poster/cartoon/Poster_5.jpg') },
//   { name : "Your Name", key : "6", img : require('./images/poster/cartoon/Poster_6.jpg') },
//   { name : "MOANA", key : "7", img : require('./images/poster/cartoon/Poster_7.jpg') },
//   { name : "The LEGO Movie", key : "8", img : require('./images/poster/cartoon/Poster_8.jpg') },
// ];

function Item({name,img}){
  return (
    <View style={{flex: 1,alignItems:'center',paddingBottom:15}}>
      <Image source={img} style={{width: 170, height: 220}}/>
      <Text style={{color: "white",paddingTop: 5}} > {name} </Text>
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>


      <View style={styles.row}>

      <View style={styles.buttons}>
      <Button
        title="Today"
        color="#ff6347"
        onPress={() => navigation.navigate('Home',{
          screen: 'Homes'
        })}
      />

      <Button
        title="Tomorrow"
        color="#3c3c3c"
        onPress={() => navigation.navigate('Home',{
          screen: 'Tomorrow'
        })}
        />

      <Button
        title="Thursday"
        color="#3c3c3c"
        onPress={() => navigation.navigate('Home',{
          screen: 'NextDay'
        })}
        />

      </View>

      </View>

      <View style={styles.bodys}>

        {/* <View style={styles.body_content}>

          <View style={{height : 100,backgroundColor : '#3c3c3c',alignItems : 'center',paddingTop : 35}}>
          <Text style={{color: 'white'}}>Sorry, there are no shows in this cinema today</Text>
          </View>
          

        </View> */}
        <Button
        title="Sample"
        color="#3c3c3c"
        onPress={() => navigation.navigate('Home',{
          screen: 'sample'
        })}
        />
        <FlatList
          data={today}
          numColumns={2}
          renderItem = {({item}) => <Item name={item.name} img={item.img} ></Item>}
          keyExtractor={item => item.key}
        
        />
      
      </View>
    
    </View>

    

  );
}

function NextDay({ navigation }) {
  return (
    <View style={styles.container}>

    <View style={styles.row}>

    <View style={styles.buttons}>
    <Button
      title="Today"
      color="#3c3c3c"
      onPress={() => navigation.navigate('Home',{
        screen: 'Homes'
      })}
    />

    <Button
      title="Tomorrow"
      color="#3c3c3c"
      onPress={() => navigation.navigate('Home',{
        screen: 'Tomorrow'
      })}
      />

    <Button
      title="Thursday"
      color="#ff6347"
      onPress={() => navigation.navigate('Home',{
        screen: 'NextDay'
      })}
      />

    </View>

    </View>

    <View style={styles.bodys}>


    <FlatList
      data={nextday}
      numColumns={2}
      renderItem = {({item}) => <Item name={item.name} img={item.img} ></Item>}
      keyExtractor={item => item.key}

    />

    </View>

  
    </View>
  );
}

function Tomorrow({ navigation }) {
  return (
    <View style={styles.container}>

    <View style={styles.row}>

    <View style={styles.buttons}>
    <Button
      title="Today"
      color="#3c3c3c"
      onPress={() => navigation.navigate('Home',{
        screen: 'Homes'
      })}
    />

    <Button
      title="Tomorrow"
      color="#ff6347"
      onPress={() => navigation.navigate('Home',{
        screen: 'Tomorrow'
      })}
      />

    <Button
      title="Thursday"
      color="#3c3c3c"
      onPress={() => navigation.navigate('Home',{
        screen: 'NextDay'
      })}
      />

    </View>

    </View>

    <View style={styles.bodys}>


    <FlatList
      data={tomorrow}
      numColumns={2}
      renderItem = {({item}) => <Item name={item.name} img={item.img} ></Item>}
      keyExtractor={item => item.key}

    />

    </View>


      
    </View>
  );
}

function sample({navigation}){
  return(
    <View>
      <Text>Sample</Text>
    </View>
  );
}


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function Root({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>

        <Stack.Screen name="Homes" component={HomeScreen} options={{
          title: 'Now Showing in Abu Dhabi',
          headerStyle: {
            backgroundColor: '#191919',
          },
          headerLeft: () => (
            <Icon.Button name="bars" backgroundColor="#191919" size={25} color="white" onPress={() => navigation.toggleDrawer()} />
            // <Evil name="ei-navicon" size={25} color="white"/>
          ),
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize : 16
          },
        }} />

        <Stack.Screen name="NextDay" component={NextDay}  options={{
          title: 'Now Showing in Abu Dhabi',
          headerStyle: {
            backgroundColor: '#191919',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize : 16
          },
        }}/>

        <Stack.Screen name="Tomorrow" component={Tomorrow}  options={{
          title: 'Now Showing in Abu Dhabi',
          headerStyle: {
            backgroundColor: '#191919',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize : 16
          },
        }}/>

        <Stack.Screen name="sample" component={sample} />

      </Stack.Navigator>
  );
}

function HomeApp() {
  return (
    <SafeAreaProvider>

    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      // drawerStyle={{
      //   backgroundColor : '#191919',
      // }} 
      drawerType="slide">

        <Drawer.Screen name="Home" component={Root}/>
        {/* <Drawer.Screen name="Homes" component={HomeScreen} /> */}
        <Drawer.Screen name="Tomorrow" component={Tomorrow} />
        <Drawer.Screen name="NextDay" component={NextDay} />
      </Drawer.Navigator>

    </NavigationContainer>

    </SafeAreaProvider>

  );
}

export default HomeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor : '#282828',
  },

  row : {
    flex : 1,
    alignItems : 'stretch',
  },

  buttons : {
    flexDirection : 'row',
    backgroundColor : '#191919',
    justifyContent : 'center',
    paddingBottom : 5,
  },

  bodys : {
    flex : 12,
  },

  body_content : {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  fonts :{
    color: 'white',
  },
});

// export default App = () => {
//   return (
//     <View style={styles.container}>
//        <Tex>Hello</Tex>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex : 1,
//     justifyContent : "center",
//     alignItems : "center",
//     backgroundColor : "#282828",
//   },

//   img :{
//       width : 190,
//       height : 60,
//       resizeMode: 'stretch'
//   },
// });