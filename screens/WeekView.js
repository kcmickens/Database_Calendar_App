import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {Agenda} from 'react-native-calendars';
import { render } from 'react-dom';
export default function WeekView(props) {
  const [items, setItems] = React.useState({});
  const[update,forceUpdate] = React.useState(false);
  const db = props.db;
  function deleteItem(eventId){
    let sql = "DELETE FROM Events WHERE eventId = ?;";
    let result2 = [];
    let params = [eventId];
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
  function renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }
  function timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  function loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        items[strTime] = [];
        let sql = "SELECT * FROM Events WHERE start_time LIKE '%"+strTime+"%';";
        let result2 = [];
        db.transaction( tx => 
          tx.executeSql(sql, [],
            (tx,results) => {
              results.rows._array.forEach((row)=>{result2.push({event_name: row.event_name,start_time:row.start_time,
                description:row.description,end_time:row.end_time,location:row.Location,eventId:row.eventId}); 
                if(row.event_name!=null){
                  console.log("date: "+row.start_time+' name: '+row.event_name);
                  items[strTime]=result2;
                }});
            },function(tx,err){
              console.log(err);
            })
          );
      }
      const newItems = {};
      Object.keys(items).forEach(key => {newItems[key] = items[key];});
      setItems(newItems)
    }, 1000);
  }
  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item]} 
        onLongPress={() => deleteItem(item.eventId)}
      >
        <Text>{item.event_name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.location}</Text>
        <Text>Start Time: {item.start_time}</Text>
        <Text>End Time: {item.end_time}</Text>
      </TouchableOpacity>
    );
  }
  const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
  });
  return (
    <Agenda items={items}
    loadItemsForMonth={loadItems.bind(this)}
        renderItem={renderItem.bind(this)}
        renderEmptyDate={renderEmptyDate.bind(this)}
        selected={props.day}
        />
  );
}