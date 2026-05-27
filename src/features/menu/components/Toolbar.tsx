import React from 'react';
import {View, TextInput, SafeAreaView} from 'react-native';
import {Search} from 'lucide-react-native';
import NotificationBellComponent from './NotificationBellComponent';

interface ToolbarProps {
    searchValue: string;
    onChangeSearch: (text: string) => void;
    notificationCount: number;
    onBellPress: () => void;
}

export default function Toolbar({searchValue, onChangeSearch, notificationCount, onBellPress}: Readonly<ToolbarProps>) {
    return (
        <SafeAreaView className="bg-stone-50 border-b border-stone-200 shadow-sm">
            <View className="flex-row items-center justify-between px-4 py-3 gap-3">
                <View
                    className="flex-1 flex-row items-center bg-stone-100 rounded-xl px-3 py-2 border border-stone-200">
                    <Search size={18} color="#a8a29e" className="mr-2"/>
                    <TextInput
                        className="flex-1 text-stone-800 text-base p-0"
                        placeholder="Buscar platillos, bebidas..."
                        placeholderTextColor="#a8a29e"
                        value={searchValue}
                        onChangeText={onChangeSearch}
                        returnKeyType="search"
                    />
                </View>
                <NotificationBellComponent count={notificationCount} onPress={onBellPress}/>
            </View>
        </SafeAreaView>
    );
}

