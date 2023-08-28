/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Button, KeyboardAvoidingView, NativeModules} from 'react-native'
import { Gesture, GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { useUser } from '../context/UserProvider';

const LoginScreen = (props) => {

const { setUser } = useUser();
const { StatusBarManager } = NativeModules;
const [userName, setUserName] = useState('');
const [statusBarHeight, setStatusBarHeight] = useState(0);

useEffect(()=> {
    Platform.OS == 'ios' ? StatusBarManager.getHeight((statusBarFrameData) => {
        setStatusBarHeight(statusBarFrameData.height)
    }) : null
})

const onPress = () => {
    axios({
        method: "post",
        url: "http://218.155.95.66:8100/v1/member/login",
        params: {
            memberName: userName
        },
        responseType: "json"
    })
    .then(response => {
      if (response.status === 200) {
        console.log('Login successful');
        setUser(userName);
        props.navigation.navigate("Main")
      } else {
        console.log('Login failed');
        showAlert('Login failed', 'Invalid credentials or server error');
      }
    })
    .catch(error => {
      alert(error);
    });
}

return (
    <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.rootContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? statusBarHeight : 0}
    >
        <GestureHandlerRootView style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="사용자명"
                value={userName}
                onChangeText={setUserName}
            />
            <Button 
                title="Login"
                onPress={onPress}
            />
        </GestureHandlerRootView>
    </KeyboardAvoidingView>
    )
}

 const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        paddingLeft: 10,
      },
 })
        
 export default LoginScreen;
