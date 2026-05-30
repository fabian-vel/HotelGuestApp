import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Bell} from 'lucide-react-native';

interface NotificationBellComponentProps {
    count?: number;
    onPress?: () => void;
}

export default function NotificationBellComponent({count = 0, onPress}: Readonly<NotificationBellComponentProps>) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}
                          className="relative p-2 rounded-full active:bg-stone-200">
            <Bell size={24} color="#ffffff" strokeWidth={2}/>
            {count > 0 && (
                <View
                    className="absolute right-1 top-1 bg-red-500 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1 border border-stone-100">
                    <Text className="text-white text-[10px] font-bold text-center">
                        {count > 9 ? '9+' : count}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

