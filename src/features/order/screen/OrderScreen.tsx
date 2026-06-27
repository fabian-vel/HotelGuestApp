import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from "react-native";
import {OrderCardComponent} from "@/features/order/components/OrderCardComponent";

export function OrderScreen() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}} edges={['top', 'left', 'right']}>
            <View className="flex-1 p-6">
                <Text className="text-2xl font-medium text-stone-900 tracking-wide mb-4">
                    Tus pedidos
                </Text>
                <OrderCardComponent />
            </View>
        </SafeAreaView>
    );
}
