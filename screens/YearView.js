import * as React from 'react';
import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
export default function YearView(props){
    const setDay = props.setDay;
    const day = props.day;
    return (
        <View>
            <CalendarList current={new Date()}
            onDayPress={(day)=>{setDay(new Date(day.timestamp))}}
            selected={day}
            />
        </View>
    );
}