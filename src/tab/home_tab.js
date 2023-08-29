/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Button, Alert, SafeAreaView} from 'react-native'
import {  GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import TopTitle from '../component/TopTitle';
import { useUser } from '../context/UserProvider';


const TabHomeScreen = (props) => {
    
    const [person, setPerson] = useState([]);
    const { userData } = useUser();

    const goAlert = (item) => {
        Alert.alert(                  
            item.userName+"님과의 채팅방이 존재하지 않습니다.",                    
            "생성할까요?",
            [                           
              {
                text: "네",                            
                onPress: () => {
                    // Axios를 사용하여 POST 요청 보내기
                    const requestData = {
                        otherUserId: item.otherMemberId,
                    };
                    axios.post("http://218.155.95.66:8100/v1/chatroom/save", requestData)
                    .then(response => {
                    if (response.status === 200) {
                        const roomId = response.data;
                        props.navigation.navigate('ChattingRoom', {
                        name: item.userName,
                        roomId: roomId,
                        });
                    } else {
                        console.log('API failed');
                    }
                    })
                    .catch(error => {
                    alert(error);
                    });
                },   
              },
              { 
                text: "아니요", 
                style: "cancel"
              }
            ],
            { 
                cancelable: false 
            }
        )
    }

    const press = (item) => {
        axios({
            method: "get",
            url: "http://218.155.95.66:8100/v1/chatroom/exist",
            params: {
                otherUserId:item.otherMemberId
            },
            responseType: "json"
        })
        .then(response => {
          if (response.status === 200) {
              const roomId = response.data.roomId;
              if(roomId!=null || roomId!=undefined){
                props.navigation.navigate("ChattingRoom",{
                    name: item.userName,
                    roomId : roomId
                })
              }
              else {
                goAlert(item)
              }
          } else {
            console.log('API failed');
          }
        })
        .catch(error => {
          alert(error);
        });
    }

    const findFriends = () => {
        axios({
            method: "get",
            url: "http://218.155.95.66:8100/v1/friend/findAll",
            responseType: "json"
        })
        .then(response => {
          if (response.status === 200) {
            setPerson(response.data)
          } else {
            console.log('API failed');
          }
        })
        .catch(response => {
          alert(response);
        });
    }

    useEffect(() => {
        findFriends();
    }, []);

    const RenderPerson = () => {
        return (
            <GestureHandlerRootView>
            {
                person.map((item, idx) => (
                    <TouchableOpacity  
                        style={styles.container} 
                        key={idx}
                        onPress={()=>press(item)}
                    >
                        <Text style={styles.name}>{item.userName}</Text>
                    </TouchableOpacity>
                ))
            }
            </GestureHandlerRootView>
        );
    };

    return (
        <GestureHandlerRootView>
            <SafeAreaView>
                <TopTitle name={"친구목록"}/>
                <ScrollView style={styles.tabContainer}>
                    <RenderPerson/>
                </ScrollView>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonLabel}>+</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    tabContainer:{
        height: '100%'
    },
    container: {
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 20,
        color: "black",
        backgroundColor: "white",
    },
    name: {
        color: "black",
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        backgroundColor: '#007bff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    addButtonLabel: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
    },
})
    
export default TabHomeScreen;
