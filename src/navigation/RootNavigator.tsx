import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "@/types/navigation";
import LoginScreen from '../features/auth/screen/LoginScreen';
import MenuScreen from '../features/menu/screen/MenuScreen';
import {MenuDetailsScreen} from "@/features/menu-details/screen/MenuDetailsScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{headerShown: false}}
            id="MainStack"
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Menu" component={MenuScreen}/>
            <Stack.Screen name="MenuDetail" component={MenuDetailsScreen}
            />
        </Stack.Navigator>
    );
}

