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
 import TabContactScreen from './contact_tab';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

 const Tab = createBottomTabNavigator();

 let HomeLogo = '../../assets/pics/home_icon.png'
 let ContactLogo = '../../assets/pics/contact_icon.png'
 
 const tabName = (name) =>{
    let tabName;
    if(name==="home"){
        tabName = "홈"
    }else if(name==="contact"){
        tabName = "연락처"
    }
    return tabName;
 }
 

 const TabBarIcon = (focused, name) => {

  let iconImagePath;

  if(name==="Home"){
    iconImagePath = require(HomeLogo) 
  } else if(name==="Contact"){
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
              <Tab.Screen name="Contact" component={TabContactScreen}/>
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
