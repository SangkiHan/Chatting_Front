/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { forSlideRight } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/HeaderStyleInterpolators';
import React from 'react';
 import {StyleSheet, View, Text, Image} from 'react-native'
 
 const MyChatCell = (props) => {
    
        const { chat } = props;

        return (
            <View style={styles.container}>
            <View>
                <Text style={styles.name}>{chat.sender}</Text>
                <Text style={styles.myChat}>{chat.message}</Text>
            </View>
            </View>
        )
 }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    profile: {
        borderRadius: 20,
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    name: {
        textAlign: 'right',
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    myChat: {
        padding: 10,
        color: 'black',
        backgroundColor: 'white',
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        marginVertical: 10,
    },
});
        
 export default MyChatCell;
