import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
export default function Events({name,description,date}){
    return(
        <View style={styles.description}>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={styles.date}>
                {date}
            </Text>
            <Text style={styles.date} >
                {description}
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    name:{
        flex:1,
        fontWeight: "bold"
    },
    description:{
        flex:1,
        padding: 15
    },
    date:{
        flex:1,
    }
});