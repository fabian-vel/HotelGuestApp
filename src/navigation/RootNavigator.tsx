import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "@/types/Navigation";
import LoginScreen from '../features/auth/screen/LoginScreen';
import {MenuDetailsScreen} from "@/features/menu-details/screen/MenuDetailsScreen";
import {MainNavigator} from "@/navigation/MainNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}
            id="MainStack"
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Main" component={MainNavigator}/>
        </Stack.Navigator>
    );
}

