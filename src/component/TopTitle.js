/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, View, Text, Image} from 'react-native'

 
 const TopTitle = (props) => {

        return (
            <View>
                <Text style={styles.topTitle} >{props.name}</Text>
            </View>
        )
 }

const styles = StyleSheet.create({
    topTitle: {
        fontSize: 30,
        fontWeight: "bold",
        margin: 10
    }
});
        
 export default TopTitle;
