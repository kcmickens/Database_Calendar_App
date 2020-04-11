import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import WeekView from '../screens/WeekView';
import MonthView from '../screens/MonthView';
import YearView from '../screens/YearView';
import SearchView from '../screens/SearchView';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'WeekView';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const[date,setDate] = React.useState(Date());
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="SearchView"
        component={SearchView}
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="WeekView"
        component={WeekView}
        options={{
          title: 'Week',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <BottomTab.Screen
        name="MonthView"
        component={MonthView}
        options={{
          title: 'Month',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-browsers" />,
        }}
      />
      <BottomTab.Screen
        name="YearView"
        component={YearView}
        options={{
          title: 'YearView',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'SearchView':
      return 'Search';
    case 'WeekView':
      return 'Week';
    case 'MonthView':
      return 'Month';
    case "YearView":
      return "Year";
  }
}
