import React from "react";
import {BottomSheetComponent} from "@/shared/components/BottomSheetComponent";
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useCartStore} from "@/shared/store/cartStore";
import {OrderRequest} from "@/types/OrderRequest";

interface CartSheetComponentProps {
    visible: boolean;
    onClose: () => void;
    onCreateOrder: (order: OrderRequest) => void;
}

export function ShopCartSheetComponent({
                                           visible,
                                           onClose,
                                           onCreateOrder,
                                       }: Readonly<CartSheetComponentProps>) {
    const {height} = Dimensions.get('window');
    const {items, total} = useCartStore();

    const itemsList = Object.values(items);

    const grouped = itemsList.reduce<Record<number, typeof itemsList>>((acc, item) => {
        if (!acc[item.mecaParentId]) acc[item.mecaParentId] = [];
        acc[item.mecaParentId].push(item);
        return acc;
    }, {});

    const categoryName: Record<number, string> = {
        1: 'Platos',
        2: 'Bebidas',
    };

    const buildOrderRequest = (): OrderRequest => ({
        observacion: '',
        items: Object.values(items).map(cartItem => ({
            meitId: cartItem.meitId,
            cantidad: cartItem.cantidad,
            observacion: '',
        })),
    });

    return (
        <BottomSheetComponent
            visible={visible}
            onClose={onClose}
            minHeight={height * 0.6}
        >
            <View style={{flex: 1}}>
                <Text className="text-lg font-bold mb-4">
                    Tu pedido
                </Text>

                <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                >
                    {Object.entries(grouped).map(([parentId, groupItems]) => (
                        <View key={parentId} className="mb-4">

                            <Text className="text-sm font-semibold text-stone-400 mb-2 uppercase tracking-wide">
                                {categoryName[Number(parentId)] ?? 'Otros'}
                            </Text>

                            {groupItems.map(item => (
                                <View
                                    key={item.meitId}
                                    className="flex-row items-center mb-3"
                                >
                                    <View className="flex-row flex-1">
                                        <Text className="font-medium text-sm"
                                        style={{flex: 6}}>
                                            {item.meitNombre}
                                        </Text>
                                        <Text className="text-stone-400 text-sm"
                                              style={{flex: 1, textAlign: 'left'}}>
                                            x{item.cantidad}
                                        </Text>
                                        <Text className="font-semibold text-sm"
                                              style={{flex: 2, textAlign: 'right'}}>
                                            ${(item.meitPrecio * item.cantidad).toLocaleString('es-CO')}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ))}
                </ScrollView>
                <View
                    style={{borderTopWidth: 1, borderTopColor: '#e7e5e4'}}
                    className="pt-4 mt-2"
                >
                    <View className="flex-row justify-between mb-4">
                        <Text className="font-bold text-base">Total</Text>
                        <Text className="font-bold text-base">
                            ${total().toLocaleString('es-CO')}
                        </Text>
                    </View>

                    <TouchableOpacity
                        className="w-full rounded-xl bg-black p-4 items-center justify-center"
                        onPress={() => onCreateOrder(buildOrderRequest())}
                    >
                        <Text className="font-medium text-center text-amber-50">
                            Realizar pedido
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheetComponent>
    );
}
