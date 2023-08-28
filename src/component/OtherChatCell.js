/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, View, Text, Image} from 'react-native'
 
 const OtherChatCell = (props) => {

        const { chat } = props;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.name}>{chat.sender}</Text>
                    <Text style={styles.otherChat}>{chat.message}</Text>
                    <Text style={styles.time}>{chat.time}</Text>
                </View>
            </View>
        )
 }

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        margin: 10,
        alignItems: 'center',
    },
    profile: {
        borderRadius: 20,
        alignItems: 'center',
        width: 40,
        height: 40,
    },
    name: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold',
    },
    otherChat: {
        alignSelf: 'flex-start',
        padding: 10,
        color: 'white',
        backgroundColor: 'gray',
        fontSize: 16,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: 'solid',
        marginVertical: 10,
    },
    time: {
        fontSize: 10
    }
});
        
 export default OtherChatCell;
