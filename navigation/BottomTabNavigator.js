import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AddPost from '../screens/AddPost';
import SettingsScreen from '../screens/SettingsScreen';
import UserScreen from '../screens/UserScreen';
import Colors from '../constants/Colors.js';
import Fonts from '../constants/Fonts.js';
import { useSelector } from 'react-redux';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  const user = useSelector(state => state.auth.user)
  navigation.setOptions({ headerTitle: getHeaderTitle(route, user), headerStyle: {backgroundColor: '#000000'}, 
  headerTitleStyle: { color: Colors.content, fontFamily: Fonts.logo, fontSize: 25 }, 
  headerTintColor: Colors.content, headerLeft: null});
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} lazy={true} tabBarOptions={{showLabel: false, style:{backgroundColor: '#000000', borderTopColor: '#000000'}}} >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-search" />,
        }}
      />
      <BottomTab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-add" />,
        }}
      />
      <BottomTab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-settings" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route, user) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'CM';
    case 'Explore':
      return 'EXPLORE';
    case 'AddPost':
      return 'NEW POST';
    case 'User':
      return user ? user.name.toUpperCase().split(' ').map(i => i.charAt(0)) : "Hi";
    case 'Settings':
      return 'OPTIONS';
  }
}
