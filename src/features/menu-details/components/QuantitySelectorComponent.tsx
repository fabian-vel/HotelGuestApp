import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';

interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default function QuantitySelectorComponent({
                                             quantity = 0,
                                             onIncrease,
                                             onDecrease,
                                         }:  Readonly<QuantitySelectorProps>) {

    if (quantity === 0) {
        return (
            <View className="flex-row justify-center w-20">
                <TouchableOpacity
                    onPress={onIncrease}
                    className="w-10 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#d1d5db' }}
                >
                    <Plus size={16} color="#000" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-row justify-center w-20">

            <TouchableOpacity
                onPress={onDecrease}
                className="w-7 h-8 border border-gray-300 border-r-0 rounded-l-full items-center justify-center"
            >
                <Minus size={14} color="#000" />
            </TouchableOpacity>

            <View className="w-6 h-8 border-y border-gray-300 items-center justify-center">
                <Text className="font-semibold">
                    {quantity}
                </Text>
            </View>

            <TouchableOpacity
                onPress={onIncrease}
                className="w-7 h-8 border border-gray-300 border-l-0 rounded-r-full items-center justify-center"
            >
                <Plus size={14} color="#000" />
            </TouchableOpacity>

        </View>
    );
}
