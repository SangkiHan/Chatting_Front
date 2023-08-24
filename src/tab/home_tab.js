/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, View, Text, Button} from 'react-native'
 
 class TabHomeScreen extends React.Component{

     render() {
        return (
            <View style={styles.tabContainer}>
                <Text>최근있는 일정들이 렌더링 될 예정</Text>
            </View>
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
        
 export default TabHomeScreen;
