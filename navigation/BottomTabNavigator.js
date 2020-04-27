import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import * as SQLite from 'expo-sqlite';
import TabBarIcon from '../components/TabBarIcon';
import WeekView from '../screens/WeekView';
import YearView from '../screens/YearView';
import SearchView from '../screens/SearchView';
import AddEvent from '../screens/AddEvent';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'WeekView';
let db = new SQLite.openDatabase('cal_db.db')
db.transaction(tx =>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS Events (EventId INTEGER PRIMARY KEY, event_name TEXT NOT NULL, description TEXT, start_time TIME NOT NULL, end_time TIME NOT NULL, Location TEXT);',
  [],(tx,results) => {
  },function(tx,err){
    console.log(err);
  });
  tx.executeSql('CREATE TABLE IF NOT EXISTS Users (UserId INTEGER PRIMARY KEY, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL UNIQUE);'
  ,[],(tx,results) => {
  },function(tx,err){
    console.log(err);
  });
});
db.transaction(tx=>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS Participants (EventId INTEGER, UserId INTEGER, PRIMARY KEY(EventId, UserId));'
  ,[],(tx,results) => {
  },function(tx,err){
    console.log(err);
  });
});
export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const [day,setDay] = React.useState(new Date());
  const YearViewComponent = props => (<YearView day={day}setDay={setDay}/>);
  const WeekViewComponent = props => (<WeekView day={day} db={db}/>);
  const SearchViewComponent = props => (<SearchView db={db}/>);
  const AddEventComponent = props => (<AddEvent db={db}day={day}/>);
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="AddEventView"
        component={AddEventComponent}
        options={{
          title: 'Add Event',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-add" />,
        }}
      />
      <BottomTab.Screen
        name="SearchView"
        component={SearchViewComponent}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="WeekView"
        component={WeekViewComponent}
        options={{
          title: 'Week',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="YearView"
        component={YearViewComponent}
        options={{
          title: 'Month',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'AddEventView':
      return 'Add Event'
    case 'SearchView':
      return 'Search';
    case 'WeekView':
      return 'Weekly Agenda View';
    case "YearView":
      return "Monthly Scroll View";
  }
}
