import React, {useCallback, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {ChevronRight} from "lucide-react-native";

export function OrderCardComponent() {
    return (

        <View className="flex-col w-full h-36 bg-white rounded-lg p-6 justify-between">
            <Text style={{backgroundColor: '#4c3f08', color: '#efd444'}}
                  className="p-2 rounded-lg w-36 text-center">
                En preparación
            </Text>
            <Text className="mt-2">
                Lomo a la parrilla x1, Mojito x2
            </Text>
            <View className="flex-row mt-2 justify-between items-center h-4">
                <Text className="color-zinc-500">
                    Hoy 8:12 pm
                </Text>
                <View className="flex-row items-center">
                    <Text className="mr-3 font-bold">
                        $120.000
                    </Text>
                    <TouchableOpacity>
                        <ChevronRight color={'#000'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
