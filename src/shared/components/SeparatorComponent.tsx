import React from 'react';
import {StyleProp, View, ViewStyle} from "react-native";

interface Props {
    style?: StyleProp<ViewStyle>;
}

export function SeparatorComponent({style}: Readonly<Props>) {
    return (
        <View className="w-full bg-white border-x border-gray-300 items-center justify-center h-[1px]"
        style={style}
        >
            <View style={{width: '80%', height: 1, backgroundColor: '#d1d5db'}}/>
        </View>
    );
}
