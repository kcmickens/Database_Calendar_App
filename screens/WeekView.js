import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {Agenda} from 'react-native-calendars';
export default function WeekView() {
  const [currentDate, setCurrentDate] = React.useState(null);
  return (
    <Agenda renderEmptyDate={() => {return (<View />);}}>
            
    </Agenda>
  );
}