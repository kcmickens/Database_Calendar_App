import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { RectButton, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
export default function Events({name,description,date,id,dbProp}){
    const db = dbProp;
    const [update, forceUpdated] = React.useState(false);
    function deleteItem(eventId,db){
        let sql = "DELETE FROM Events WHERE eventId = ?;";
        let result2 = [];
        let params = [eventId];
        console.log(eventId)
        db.transaction( tx => 
          tx.executeSql(sql, params,
            (tx,results) => {
              console.log("Successfully Delete Event")
            },function(tx,err){
              console.log(err);
            })
        );
        forceUpdated(!update);
      }
    return(
        <TouchableOpacity style={styles.description}
        onLongPress={() => deleteItem(id,db)}>
            <Text style={styles.name}>
                {name}
            </Text>
            <Text style={styles.date}>
                {date}
            </Text>
            <Text style={styles.date} >
                {description}
            </Text>
        </TouchableOpacity>
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