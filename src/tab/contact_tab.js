/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { Client, Stomp } from '@stomp/stompjs';
import React, { useEffect, useRef, useState } from 'react';
import {StyleSheet, View, Text, Button, ScrollView, FlatList} from 'react-native'
import { GestureHandlerRootView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import * as encoding from 'text-encoding';

const TabContactScreen = () => {

    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState();

    const clientRef = useRef(null);

    useEffect(() => {
        // STOMP 클라이언트 생성
        clientRef.current = new Client({
        brokerURL: 'http://218.155.95.66:8100/ws-stomp/websocket',
        reconnectDelay: 5000,
        forceBinaryWSFrames: true,
        appendMissingNULLonIncoming: true,
        debug: (msg) => {
            console.log(msg)
        },
        onConnect: (frame) => {
            console.log('Connected to STOMP server:', frame);
            const subscription = clientRef.current.subscribe('/sub/chat/room/2', (message) => {
                const newMessage = JSON.parse(message.body);
                console.log(newMessage);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        },
        onStompError: (error) => {
            console.error('STOMP Error:', error);
        },
        onWebSocketError: (error) => {
            console.error('WebSocket Error:', error);
        },
    });

        // STOMP 연결 시작
        clientRef.current.activate();

        return () => {
            if (clientRef.current) {
                clientRef.current.deactivate();
            }
        };
    }, []);

    const onChangeInput = (event) => {
        setTextInput(event);
    }

    const sendMessage = () => {
        if (clientRef.current && clientRef.current.connected) {
            const testMessage = { message: textInput, roomId:"2", sender: "Snagki", type:"TALK"};
            clientRef.current.publish({ destination: "/pub/chat/sendMessage", body: JSON.stringify(testMessage) });
            setTextInput("");
        }
    }
  
    return (
        // <GestureHandlerRootView>
        //     <ScrollView style={styles.tabContainer}>
        //         {messages.map((message, index) => (
        //         <View key={index} 
        //             style={{ padding: 10}}>
        //             <Text
        //                 style={
        //                     message.sender==="Snagki" ? {textAlign:'right'} : {textAlign: 'left'}
        //                 }
        //             >{message.sender}:  {message.message}</Text>
        //         </View>
        //         ))}
        //     </ScrollView>
        //     <View>
        //         <TextInput
        //             value={textInput}
        //             onChangeText={onChangeInput}
        //         />
        //         <TouchableOpacity
        //             onPress={sendMessage}
        //             style={{ backgroundColor: 'lightblue', padding: 10, alignItems: 'center' }}
        //         >
        //             <Text>Send Message</Text>
        //         </TouchableOpacity>
        //     </View>
        // </GestureHandlerRootView>
        <View>
            <View
                style={{
                    padding: 5,
                    flexGrow: 1,
                }}
            >
            <FlatList
                style={styles.list}
                contentContainerStyle={{paddingBottom: 50}}
                data={serverMessages}
                keyExtractor={(item, index) => item.message + index}
                renderItem={({item}) =>
                item.type == 'Welcome' || item.type == 'Leave' ? (
                    <Text style={styles.welcomeChat}>{item.message}</Text>
                ) : item.id == user.id ? (
                    <MyChatCell chat={item}></MyChatCell>
                ) : (
                    <OtherChatCell chat={item}></OtherChatCell>
                )
                }
            />
            </View>
            <View style={styles.bottomContainer}>
            <TextInput
                style={styles.input}
                placeholder={'Add Message'}
                onChangeText={text => {
                setMessageText(text);
                }}
                value={messageText}></TextInput>
            <Pressable onPress={sendMessage} disabled={messageText == ''}>
                <Text style={styles.send}>Send</Text>
            </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        padding: 8,
    },
    welcomeChat: {
        alignSelf: 'center',
        padding: 10,
        color: 'white',
        backgroundColor: '#212124',
        fontSize: 16,
        borderRadius: 20,
        marginVertical: 10,
    },
    myChat: {
        alignSelf: 'flex-end',
        padding: 10,
        color: 'white',
        backgroundColor: 'yellow',
        fontSize: 16,
        borderRadius: 20,
        marginVertical: 10,
    },
    otherChat: {
        alignSelf: 'flex-start',
        padding: 10,
        color: 'white',
        backgroundColor: 'gray',
        fontSize: 16,
        borderRadius: 20,
        marginVertical: 10,
    },
    input: {
        width: '70%',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginRight: 30,
    },
    send: {
        backgroundColor: 'black',
        color: 'white',
        padding: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    bottomContainer: {
        marginHorizontal: 10,
        flexDirection: 'row',
        marginBottom: 80,
    },
    list: {
        height: '80%',
    },
});
        
 export default TabContactScreen;