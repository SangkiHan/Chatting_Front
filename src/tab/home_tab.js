/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import axios from 'axios';
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native'
import {  GestureHandlerRootView, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import TopTitle from '../component/TopTitle';
import { useUser } from '../context/UserProvider';

const press = () => {
    const { userId } = useUser();
    // axios({
    //     method: "post",
    //     url: "http://218.155.95.66:8100/v1/member/login",
    //     params: {
    //         userId: userId,
    //         other
    //     },
    //     responseType: "json"
    // })
    // .then(response => {
    //   if (response.status === 200) {
    //     console.log('Login successful');
    //     setUser(userName);
    //     props.navigation.navigate("Main")
    //   } else {
    //     console.log('Login failed');
    //     showAlert('Login failed', 'Invalid credentials or server error');
    //   }
    // })
    // .catch(error => {
    //   alert(error);
    // });
}

const RenderPerson = (props) => {



    return (
        <GestureHandlerRootView>
        {
            props.person.map((item, idx) => (
                <TouchableOpacity  
                    style={styles.container} 
                    key={idx}
                    onPress={() => press(props, item)}
                >
                    <Text style={styles.name}>{item.userName}</Text>
                </TouchableOpacity>
            ))
        }
        </GestureHandlerRootView>
    );
};

class TabHomeScreen extends React.Component{

    state = {
        person: []
    }

    componentDidMount(){
        axios({
            method: "get",
            url: "http://218.155.95.66:8100/v1/friend/findAll",
            responseType: "json"
        })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data);
            this.setState({person: response.data})
          } else {
            console.log('Login failed');
            showAlert('Login failed', 'Invalid credentials or server error');
          }
        })
        .catch(response => {
          alert(response);
        });
    }

    render() {

    return (
        <GestureHandlerRootView>
            <TopTitle name={"친구목록"}/>
            <ScrollView style={styles.tabContainer}>
                <RenderPerson person={this.state.person}/>
            </ScrollView>
        </GestureHandlerRootView>
        )
    }
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
    }
})
    
export default TabHomeScreen;
