import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {ArrowRight, ChevronRight} from "lucide-react-native";
import {useOrderStore} from "@/shared/store/orderStore";
import {getOrderStatusStyle} from "@/shared/util/orderStatusUtil";
import {getFormatFecha} from "@/shared/util/formatFechaUtil";
import {Order} from "@/types/Order";

interface OrderCardComponentProps {
    onPress?: (order: Order) => void;
}

export function OrderCardComponent({onPress}: Readonly<OrderCardComponentProps>) {
    const {orders} = useOrderStore();

    return (
        <View>
            {orders.map(order => {
                const {backgroundColor, color} = getOrderStatusStyle(order?.espeId ?? 0);

                const items = order.detallePedidoList
                    .map(d => `${d.meitNombre} x${d.pedeCantidad}`)
                    .join(', ');

                const date = getFormatFecha(order.pediFechaCreacion);

                return (
                    <View key={order.pediId}
                          className="flex-col w-full h-36 bg-white rounded-lg p-6 justify-between mb-3"
                          style={{elevation: 2}}>
                        <View className="w-full flex-row justify-end">
                            <Text style={{backgroundColor, color}}
                                  className="p-2 rounded-xl w-36 text-center">
                                {order.espeNombre}
                            </Text>
                        </View>
                        <Text className="mt-2" numberOfLines={1}>
                            {items}
                        </Text>
                        <View className="flex-row mt-2 justify-between items-center">
                            <Text className="color-zinc-500">
                                {date}
                            </Text>
                            <View className="flex-row items-center">
                                <Text className="mr-3 font-bold">
                                    ${order.pediTotal.toLocaleString('es-CO')}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => onPress?.(order)}
                                >
                                    <ArrowRight color={'#000'}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                );
            })}
        </View>
    );
}
