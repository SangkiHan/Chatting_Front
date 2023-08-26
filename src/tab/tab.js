/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, Image} from 'react-native'
 import TabHomeScreen from './home_tab';
 import ChatRoomListTab from './ChatRoomListTab';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

 const Tab = createBottomTabNavigator();

 let HomeLogo = '../../assets/pics/friends_icon.png'
 let ContactLogo = '../../assets/pics/chat_icon.png'
 
 const tabName = (name) =>{
    let tabName;
    if(name==="home"){
        tabName = "홈"
    }else if(name==="RoomList"){
        tabName = "채팅방"
    }
    return tabName;
 }
 

 const TabBarIcon = (focused, name) => {

  let iconImagePath;

  if(name==="Home"){
    iconImagePath = require(HomeLogo) 
  } else if(name==="RoomList"){
    iconImagePath = require(ContactLogo)
  }
  return (
      <Image
        source={iconImagePath}
        style={{
          width: focused ? 30 : 24,
          height: focused ? 30 : 24
        }}
      />
    )
  }
 
 class TabScreen extends React.Component{

     render() {
        return (
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({route}) => ({
                headerShown:false,
                tabBarLabelPosition: "",
                tabBarLabel: () => {
                 tabName(route.name)
                },
                tabBarIcon: ({focused}) => (
                  TabBarIcon(focused, route.name)
                )
              })}
            >
              <Tab.Screen name="Home" component={TabHomeScreen}/>
              <Tab.Screen name="RoomList" component={ChatRoomListTab}/>
            </Tab.Navigator>
        )
     }
 }

 const styles = StyleSheet.create({
     tabContainer:{
         flex:1,
         alignItems: "center", 
         justifyContent: "center",
         marginTop: 40
     }
 })
        
 export default TabScreen;
