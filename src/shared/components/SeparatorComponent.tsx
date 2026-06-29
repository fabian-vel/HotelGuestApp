import React from 'react';
import {View} from "react-native";

export function SeparatorComponent() {
    return (
        <View className="w-full bg-white border-x border-gray-300 items-center justify-center h-[1px]">
            <View style={{width: '80%', height: 1, backgroundColor: '#d1d5db'}}/>
        </View>
    );
}
