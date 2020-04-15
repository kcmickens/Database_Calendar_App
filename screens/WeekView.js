import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {Agenda} from 'react-native-calendars';
export default function WeekView() {
  const [currentDate, setCurrentDate] = React.useState(null);
  const [items, setItems] = React.useState({});
  function loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
              items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {newItems[key] = items[key];});
      setItems(newItems)
    }, 1000);
  }
  function renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]} 
        onPress={() => console.log('Item clicked!')}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
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
        />
  );
}