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

let person = [
    {
        "name": "한상기",
        "age": 15,
        "phone": "010-6409-1048"
    },
    {
        "name": "김지은",
        "age": 20,
        "phone": "01067330977"
    },
    {
        "name": "May",
        "age": 19,
        "phone": "010-6409-1048"
    },
    {
        "name": "Julia",
        "age": 29,
        "phone": "010-6409-1048"
    },
    {
        "name": "Hunter",
        "age": 18,
        "phone": "010-6409-1048"
    },
    {
        "name": "Jane",
        "age": 28,
        "gender": "010-6409-1048"
    },
    {
        "name": "Kendrick",
        "age": 34,
        "phone": "010-6409-1048"
    },
    {
        "name": "Kali",
        "age": 25,
        "phone": "010-6409-1048"
    },
    {
        "name": "Jay",
        "age": 37,
        "phone": "010-6409-1048"
    },
    {
        "name": "Mac",
        "age": 31,
        "phone": "010-6409-1048"
    }
];

const press = (props, item) => {
    props.navigation.navigate("ContactDetailScreen",{
        name: item.name,
        age: item.age,
        phone: item.phone
    })
}

const RenderPerson = (props) => {
    return (
        <GestureHandlerRootView>
        {
            person.map((item, idx) => (
                <TouchableOpacity  
                    style={styles.container} 
                    key={idx}
                    onPress={() => press(props, item)}
                >
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.age}>{item.age}</Text>
                    <Text style={styles.gender}>
                        {item.phone == null ? "번호없음" : item.phone}
                    </Text>
                </TouchableOpacity>
            ))
        }
        </GestureHandlerRootView>
    );
};
 
class TabContactScreen extends React.Component{
    render() {
        return (
            <ScrollView style={styles.tabContainer}>
                <RenderPerson navigation={this.props.navigation}/>
            </ScrollView>
        ) 
    }
}

const styles = StyleSheet.create({
    tabContainer:{
        marginTop:60
    },
    container: {
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 1,
        margin: 10,
        padding: 10,
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
        
 export default TabContactScreen;