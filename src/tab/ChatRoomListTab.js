/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React from 'react';
 import {StyleSheet, View, Text, Button, ScrollView} from 'react-native'
 import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import TopTitle from '../component/TopTitle';
 
 const press = (props, item) => {
     props.navigation.navigate("ChattingRoom",{
         name: item.memberName[0],
         roomId : item.roomId,
     })
 }
 
 const RenderPerson = (props) => {
     return (
         <GestureHandlerRootView>
         {
             props.persion.map((item, idx) => (
                 <TouchableOpacity  
                     style={styles.container} 
                     key={idx}
                     onPress={() => press(props, item)}
                 >
                     <Text style={styles.name}>{item.memberName[0]}님과의 채팅방</Text>
                 </TouchableOpacity>
             ))
         }
         </GestureHandlerRootView>
     );
 };
  
 class ChatRoomListTab extends React.Component{

    state = {
        chatRoom: []
    }

    componentDidMount(){
        axios({
            method: "get",
            url: "http://218.155.95.66:8100/v1/chatRoomMember/findAll",
            responseType: "json"
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.setState({chatRoom: response.data})
          } else {
            console.log('API failed');
          }
        })
        .catch(error => {
          alert(error);
        });
    }


     render() {
         return (
             <GestureHandlerRootView>
                 <TopTitle name={"채팅방"}/>
                 <ScrollView>
                    <RenderPerson navigation={this.props.navigation} chatRoom={this.state.chatRoom}/>
                </ScrollView>
             </GestureHandlerRootView>
         ) 
     }
 }
 
 const styles = StyleSheet.create({
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
     gender: {
         color: "black",
         fontSize: 15,
     },
     age: {
         color: "black",
         fontSize: 15,
     },
 })
         
  export default ChatRoomListTab;