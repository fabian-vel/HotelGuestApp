import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecialDishCardComponent} from "@/features/home/components/SpecialDishCardComponent";
import {ChevronRight, ChevronLeft} from "lucide-react-native";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {useOrderStore} from "@/shared/store/orderStore";
import {getOrderStatusStyle} from "@/shared/util/orderStatusUtil";

export function HomeScreen() {
    const ESTADOS_ACTIVOS = new Set([1, 2]); // 1: Pendiente, 2: En preparación
    const {orders, loadingOrder, fetchOrders, errorOrder} = useOrderStore();

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loadingOrder) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    const clearError = () => {
        useOrderStore.setState({errorOrder: null});
    };

    const currentOrder = orders
        .filter(order => ESTADOS_ACTIVOS.has(order.espeId))
        .sort((a, b) => new Date(b.pediFechaCreacion).getTime() - new Date(a.pediFechaCreacion).getTime())
        .at(0) ?? null

    const {backgroundColor, color} = getOrderStatusStyle(currentOrder?.espeId ?? 0);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}} edges={['top', 'left', 'right']}>
            <View style={{flex: 1}} className="p-6">
                <Text className="text-2xl font-serif font-bold text-stone-900 tracking-wide">
                    Hola Juan
                </Text>
                <Text className="tracking-wide text-sm text-[#75624a]"
                      style={{marginBottom: 24, fontSize: 16, lineHeight: 18}}>
                    Habitación 302
                </Text>
                <View style={{position: 'relative', paddingHorizontal: 16}}>
                    <TouchableOpacity
                        style={{
                            width: 32, height: 32, position: 'absolute', zIndex: 1, left: 0,
                            top: '50%', transform: [{translateY: -16}]
                        }}
                        className="rounded-full bg-white justify-center items-center border border-gray-200"
                    >
                        <ChevronLeft color='#000000' size={20}/>
                    </TouchableOpacity>
                    <SpecialDishCardComponent/>
                    <TouchableOpacity
                        style={{
                            width: 32, height: 32, position: 'absolute', zIndex: 1, right: 0,
                            top: '50%', transform: [{translateY: -16}]
                        }}
                        className="rounded-full bg-white justify-center items-center border border-gray-200"
                    >
                        <ChevronRight color='#000000' size={20}/>
                    </TouchableOpacity>
                </View>

                {currentOrder !== null && (
                    <>
                        <Text className="mt-6"
                              style={{marginBottom: 20, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                            Tu pedido actual
                        </Text>

                        <View
                            className="flex-row items-center justify-between bg-white h-[70px] w-full pl-4 pr-4 rounded-lg">
                            <Text>{currentOrder?.detallePedidoList.length} productos</Text>
                            <Text style={{backgroundColor, color}} className="p-2 rounded-lg w-36 text-center">
                                {currentOrder?.espeNombre}
                            </Text>
                            <TouchableOpacity>
                                <ChevronRight/>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
            <AlertComponent
                visible={!!errorOrder}
                alertType="error"
                title="Error"
                message={errorOrder ?? 'Error inesperado'}
                onAccept={clearError}
            />
        </SafeAreaView>
    );
}
