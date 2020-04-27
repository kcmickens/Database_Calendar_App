import React, {useState} from 'react';
import { ScrollView, TextInput, Button, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
//import {db} from '../components/insert_data.js';
export default function AddEvent(props){
    const [startDate, setStartDate] = useState(new Date());
    const [minDate,setMinDate] = useState(startDate)
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [name, setName] = useState('Name');
    const [description, setDescription] = useState('Description');
    const [location, setLocation] = useState('Location');
    const [endDate,setEndDate]=useState(new Date());
    const [mode1,setMode1] = useState('date');
    const db = props.db;
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShow(Platform.OS === 'ios');
        setStartDate(currentDate);
        setMinDate(startDate);
    };
    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };
    const showDatepicker = () => {
        showMode('date');
    };
    const showTimepicker = () => {
        showMode('time');
    };

    const onChange1 = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShow1(Platform.OS === 'ios');
        setEndDate(currentDate);
    };
    const showMode1 = currentMode => {
        setShow1(true);
        setMode1(currentMode);
    };
    const showDatepicker1 = () => {
        showMode1('date');
    };

    const showTimepicker1 = () => {
        showMode1('time');
    };
    function save(){
        let sql = "INSERT INTO Events (EventId,event_name,description,start_time,end_time,location) VALUES (?,?,?,?,?,?)";
        let params = [null,name,description,startDate.toISOString(),endDate.toISOString(),location]
        db.transaction(tx =>{
            tx.executeSql(sql,params,(tx,results)=>{
            },(tx,results) => {
              },function(tx,err){
                console.log(err);
              });
        })
    }
    return(
        <ScrollView style={styles.description}>
            <TextInput style={{ height:40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                onChangeText={text => setName(text)}
                placeholder={'Event Name'}/>
            <TextInput style={{ height:40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                onChangeText={text => setDescription(text)} 
                placeholder={'Event Description'}/>
            <TextInput style={{ height:40, borderColor: 'gray', borderWidth: 1, padding: 10}}
                onChangeText={text => setLocation(text)} 
                placeholder={'Event Location'}/>
            <View>
            <View>
                <Button onPress={showDatepicker} title="Select the Start Date" />
            </View>
            <View>
                <Button onPress={showTimepicker} title="Select the Start Time" />
            </View>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={startDate}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                    />
                )}
            </View>
            <View>
            <View>
                <Button onPress={showDatepicker1} title="Select the End Date" />
            </View>
            <View>
                <Button onPress={showTimepicker1} title="Select the End Time" />
            </View>
                {show1 && (
                    <DateTimePicker
                    testID="dateTimePicker1"
                    timeZoneOffsetInMinutes={0}
                    value={endDate}
                    mode={mode1}
                    minimumDate={minDate}
                    is24Hour={false}
                    display="default"
                    onChange={onChange1}
                    />
                )}
            </View>
            <View>
                <Button onPress={save}
                title='Save'/>
            </View>
        </ScrollView>
    )
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