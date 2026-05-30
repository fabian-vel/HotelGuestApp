import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from "@/types/navigation";
import LoginScreen from '../features/auth/screen/LoginScreen';
import MenuScreen from '../features/menu/screen/MenuScreen';
import MenuDishesScreen from "@/features/menu-dishes/screen/MenuDishesScreen";
import MenuDrinksScreen from "@/features/menu-drinks/screen/MenuDrinksScreen";

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
            <Stack.Screen name="MenuDishes" component={MenuDishesScreen}/>
            <Stack.Screen name="MenuDrinks" component={MenuDrinksScreen}/>
        </Stack.Navigator>
    );
}

