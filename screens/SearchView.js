
import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import Events from '../components/Events';
export default function SearchView() {
  const[isShow,setIsShow] = React.useState(false);
  const[result,setResult] = React.useState([]);
  function performSearch(search){
    Keyboard.dismiss;
    //insert search into SQL
    setResult([["Name",Date(),"This is the description"],["Name2",Date(),"Description two"]]);
    setIsShow(true);
  }
  function results(){
    let items = [];
    result.forEach(function(group){
      console.log(group);
      items.push(<Events name={group[0]} description={group[2]} date={group[1]}/>);
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
