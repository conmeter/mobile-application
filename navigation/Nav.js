import BottomTabNavigator from './BottomTabNavigator';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import WebScreen from '../screens/secondary/WebScreen';
import ProfileScreen from '../screens/secondary/ProfileScreen';
import { useSelector } from 'react-redux';
import ReportScreen from '../screens/secondary/ReportScreen';
import AddWeb from '../screens/secondary/AddWeb';
import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OTP from '../screens/auth/OTP';

const Nav = () => {

    const Stack = createStackNavigator() 
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    return (
        <Stack.Navigator>
        {isAuthenticated?

           ( 
             <>
             <Stack.Screen name="Root" component={BottomTabNavigator} options={{ cardStyle: {backgroundColor: 'black'}}}/> 
             <Stack.Screen name="Website" component={WebScreen} options={{ cardStyle: {backgroundColor: 'black'}}}/>
             <Stack.Screen name="Profile" component={ProfileScreen} options={{ cardStyle: {backgroundColor: 'black'}}}/>
             <Stack.Screen name="Report" component={ReportScreen} options={{ cardStyle: {backgroundColor: 'black'}}}/>
             <Stack.Screen name="New" component={AddWeb} options={{ cardStyle: {backgroundColor: 'black'}}}/>
             </>
           ):
           ( 
            <>
            <Stack.Screen name="Login" component={Login} options={{ cardStyle: {backgroundColor: 'black'}}}/>
            <Stack.Screen name="Register" component={Register} options={{ cardStyle: {backgroundColor: 'black'}}}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ cardStyle: {backgroundColor: 'black'}}}/>
            <Stack.Screen name="OTP" component={OTP} options={{ cardStyle: {backgroundColor: 'black'}}}/>
            </>
           )
        }
      </Stack.Navigator>
    )
}

export default Nav
