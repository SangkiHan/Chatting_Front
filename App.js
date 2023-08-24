/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {
   StyleSheet,
   Image
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import TabScreen from './src/tab/tab';
 import ContactDetailScreen from './src/stack/contact_detail';
 
 const Stack = createNativeStackNavigator();

 class App extends React.Component{
 
   render () {
     return (
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen 
             name="Main" 
             component={TabScreen}
             options={{
               headerShown:false
             }}
           />
           <Stack.Screen
            name="ContactDetailScreen"
            component={ContactDetailScreen}
           />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;
 