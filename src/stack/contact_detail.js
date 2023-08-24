/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, View, Text, Button} from 'react-native'
 
 class ContactDetailScreen extends React.Component{

    componentDidMount(){
        const { params } = this.props.route
        this.props.navigation.setOptions({
            headerTitle: params.name
        })
    }
    render() {
        const { params } = this.props.route
        const name = params.name
        const age = params.age
        const phone = params.phone

    return (
        <View style={styles.tabContainer}>
            <Text>이름: {name}</Text>
            <Text>나이: {age}</Text>
            <Text>전화번호: {phone}</Text>
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
        
 export default ContactDetailScreen;
