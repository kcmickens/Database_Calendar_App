import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Events from '../components/Events';
// import {db} from '../components/insert_data.js';
export default function SearchView(props) {
  const[isShow,setIsShow] = React.useState(false);
  const[result,setResult] = React.useState([]);
  const db = props.db;
  function performSearch(search){
    Keyboard.dismiss;
    //insert search into SQL
    let sql = "SELECT eventId, event_name, start_time, description FROM Events WHERE event_name LIKE '%" +search+ "%';";
    let params = []
    var result2 = []
    db.transaction( tx => 
      tx.executeSql(sql, params,
        (tx,results) => {
          results.rows._array.forEach((row)=>{result2.push([row.event_name,row.start_time,row.description,row.EventId]);
            console.log(row.EventId)});
          setResult(result2);
        },function(tx,err){
          console.log(err);
        })
      );
    setIsShow(true);
  }
  function results(){
    let items = [];
    result.forEach(function(group){
      items.push(<Events dbProp={db} id={group[3]}name={group[0]} description={group[2]} date={group[1]}/>);
    })
      return(
        <View>
          {items}
        </View>
      );
  }
  return (
    <ScrollView>
      <TextInput style={{ height:40, borderColor: 'gray', borderWidth: 1, padding: 10}} 
      onSubmitEditing={event =>performSearch(event.nativeEvent.text)} 
      placeholder={'Event Name'}/>
      {isShow ? results(): null}
      </ScrollView>
  );
}
