import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from "react-native";
import {OrderCardComponent} from "@/features/order/components/OrderCardComponent";
import {OrderDetailSheetComponent} from "@/features/order/components/OrderDetailSheetComponent";
import {Order} from "@/types/Order";

export function OrderScreen() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}} edges={['top', 'left', 'right']}>
            <View className="flex-1 p-6">
                <Text className="text-2xl font-medium text-stone-900 tracking-wide mb-4">
                    Tus pedidos
                </Text>
                <OrderCardComponent onPress={(order) => setSelectedOrder(order)} />
            </View>
            <OrderDetailSheetComponent
                visible={selectedOrder !== null}
                onClose={() => setSelectedOrder(null)}
                order={selectedOrder}
            />
        </SafeAreaView>
    );
}
