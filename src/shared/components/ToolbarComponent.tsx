import React, {useState} from 'react';
import {View, TextInput, SafeAreaView, TouchableOpacity, Text} from 'react-native';
import {Search, ArrowLeft, X} from 'lucide-react-native';

interface ToolbarProps {
    searchValue: string;
    onChangeSearch: (text: string) => void;
    notificationCount: number;
    onBellPress: () => void;
    showBackButton?: boolean;
    onBackPress?: () => void;
    title?: string;
}

export default function ToolbarComponent({
                                             searchValue,
                                             onChangeSearch,
                                             showBackButton = false,
                                             onBackPress,
                                             title = '',
                                         }: Readonly<ToolbarProps>) {
    const [isSearching, setIsSearching] = useState(false);

    return (
        <SafeAreaView>
            <View className="flex-row items-center justify-between h-14 px-4 bg-white relative border-b border-b-gray-300">

                {isSearching ? (
                    <View className="flex-1 flex-row items-center bg-stone-100 rounded-xl px-3 py-1.5 border
                     border-stone-200 z-10 animate-fade-in">
                        <Search size={18} color="#a8a29e" className="mr-2"/>
                        <TextInput
                            className="flex-1 text-stone-800 text-base p-0"
                            placeholder="Buscar platillos, bebidas..."
                            placeholderTextColor="#a8a29e"
                            value={searchValue}
                            onChangeText={onChangeSearch}
                            returnKeyType="search"
                            autoFocus={false}
                        />
                        <TouchableOpacity onPress={() => {
                            setIsSearching(false);
                            onChangeSearch('');
                        }}>
                            <X size={18} color="#a8a29e" className="ml-2" />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <View className="w-10 justify-center z-10">
                            {showBackButton && (
                                <TouchableOpacity
                                    onPress={onBackPress}
                                    activeOpacity={0.7}
                                >
                                    <ArrowLeft size={24} color="#000000"/>
                                </TouchableOpacity>
                            )}
                        </View>
                        <View className="absolute left-0 right-0 top-0 bottom-0 justify-center items-center z-0">
                            <Text className="text-black font-bold text-[22px]" numberOfLines={1}>
                                {title}
                            </Text>
                        </View>
                        <View className="w-10 items-end justify-center z-10">
                            <TouchableOpacity onPress={() => setIsSearching(true)}>
                                <Search size={24} color="#000000"/>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}
