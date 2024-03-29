/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import { Client, Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { format } from 'date-fns';
 import React, { useEffect, useRef, useState } from 'react';
 import {StyleSheet, View, Text, Button, ScrollView, FlatList, Pressable, KeyboardAvoidingView, Platform, StatusBar, NativeModules} from 'react-native'
 import { GestureHandlerRootView, State, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
 import * as encoding from 'text-encoding';
 import MyChatCell from '../component/MyChatCell';
 import OtherChatCell from '../component/OtherChatCell';
import { useUser } from '../context/UserProvider';
 
 const ChattingRoom = (props) => {
    const { userData } = useUser();
    const { StatusBarManager } = NativeModules;
    const { params } = props.route;
 
    const [messages, setMessages] = useState([]);
    const [textInput, setTextInput] = useState();
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    const clientRef = useRef(null);
    const flatList = useRef(null);


    props.navigation.setOptions({
        headerTitle: params.name
    })

    const findChat = () => {
        axios({
            method: "get",
            url: "http://218.155.95.66:8100/v1/chat/findChat",
            params: {
                roomId: params.roomId
            },
            responseType: "json"
        })
        .then(response => {
          if (response.status === 200) {
            setMessages(response.data);
            setTimeout(()=>{
                flatList.current.scrollToEnd();
            },400)
          } else {

          }
        })
        .catch(error => {
          alert(error);
        });
    }

    useEffect(() => {
        Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
            setStatusBarHeight(statusBarFrameData.height)
        }) : null

        findChat();

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
                const subscription = clientRef.current.subscribe('/sub/chat/room/'+params.roomId, (message) => {
                    const newMessage = JSON.parse(message.body);
                    console.log(newMessage);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                    setTimeout(()=>{
                    flatList.current.scrollToEnd();
                    },400)
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
            const date = new Date();
            const formattedDate = format(date, 'yyyy-MM-dd HH:mm');
            const message = { message: textInput, roomId:params.roomId, senderId: userData.userId, sender: userData.userName, type:"TALK", time: formattedDate};
            clientRef.current.publish({ destination: "/pub/chat/sendMessage", body: JSON.stringify(message) });
            setTextInput("");
        }
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.rootContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? statusBarHeight : 0}
        >
            <GestureHandlerRootView 
                style={{ 
                    flex: 1 ,
                    margin: 10,
                    marginBottom: 50
                }}
            >
            <FlatList
                ref={flatList}
                contentContainerStyle={{ justifyContent: 'flex-end', flexGrow: 1 }}
                data={messages}
                keyExtractor={(item, index) => item.message + index}
                renderItem={({ item }) =>
                item.senderId === userData.userId ? (
                    <MyChatCell chat={item} />
                ) : (
                    <OtherChatCell chat={item} />
                )
                }
            />
            <View style={styles.bottomContainer}>
                <TextInput
                style={styles.input}
                placeholder={'Add Message'}
                onChangeText={onChangeInput}
                value={textInput}
                />
                <Pressable 
                    onPress={sendMessage} 
                    disabled={textInput === ''}
                    style={{
                        marginTop: 'auto'
                    }}
                >
                    <Text style={styles.send}>Send</Text>
                </Pressable>
            </View>
            </GestureHandlerRootView>
        </KeyboardAvoidingView>
    );
};
 
 const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
     input: {
         width: '75%',
         borderWidth: 1,
         borderColor: 'black',
         borderRadius: 10,
         padding: 10,
         marginRight: 10,
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
         flexDirection: 'row'
     }
 });
         
  export default ChattingRoom;