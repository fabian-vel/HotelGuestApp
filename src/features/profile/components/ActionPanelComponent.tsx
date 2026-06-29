import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {ChevronRight} from "lucide-react-native";

interface ActionPanelComponentProps {
    icono: React.ReactNode;
    label: string;
    onPress?: () => void;
    labelColor?: string;
    className?: string;
}

export function ActionPanelComponent({
                                         icono,
                                         label,
                                         onPress,
                                         labelColor = '#000',
                                         className = ''
                                     }: Readonly<ActionPanelComponentProps>) {

    return (
        <View className={`flex-row w-full h-20 bg-white items-center p-4 ${className}`}>
            <View className="flex-row items-center flex-1">
                {icono}
                <Text className="ml-6 text-[16px] font-medium" style={{color: labelColor}}>
                    {label}
                </Text>
            </View>
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                <ChevronRight color={'#000'}/>
            </TouchableOpacity>
        </View>
    );
}
