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
 import ChattingRoom from './src/stack/chattingRoom';
 import LoginScreen from './src/stack/Login';
 import {UserProvider} from './src/context/UserProvider';
 
 const Stack = createNativeStackNavigator();

 class App extends React.Component{
 
   render () {
     return (
       <UserProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{
                headerTitle:"Simple Chatting App"
              }}
              component={LoginScreen}
            />
            <Stack.Screen 
              name="Main" 
              component={TabScreen}
              options={{
                headerShown:false
              }}
            />
            <Stack.Screen
              name="ChattingRoom"
              component={ChattingRoom}
            />
          </Stack.Navigator>
        </NavigationContainer>
       </UserProvider>
     );
   }
 };
 
 const styles = StyleSheet.create({
 });
 
 export default App;
 