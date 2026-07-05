import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecialDishCardComponent} from "@/features/home/components/SpecialDishCardComponent";
import {Wine, HandPlatter, ChevronRight} from "lucide-react-native";
import {useCategoriesStore} from "@/shared/store/categoryStore";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {useOrderStore} from "@/shared/store/orderStore";
import {getOrderStatusStyle} from "@/shared/util/orderStatusUtil";

interface HomeScreenProps {
    onNavigateMenu?: (categoriaId?: number) => void;
}

export function HomeScreen({onNavigateMenu}: Readonly<HomeScreenProps>) {
    const ESTADOS_ACTIVOS = new Set([1, 2]); // 1: Pendiente, 2: En preparación
    const {categories, loading, fetchCategories, error} = useCategoriesStore();
    const {orders, loadingOrder, fetchOrders, errorOrder} = useOrderStore();

    useEffect(() => {
        fetchCategories();
        fetchOrders();
    }, []);

    if (loading || loadingOrder) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    const activeError = error ?? errorOrder;
    const clearError = () => {
        if (error) useCategoriesStore.setState({error: null});
        if (errorOrder) useOrderStore.setState({errorOrder: null});
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
                <SpecialDishCardComponent/>
                <Text className="mt-6"
                      style={{marginBottom: 20, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                    Explorar
                </Text>
                <View className="flex-row items-center justify-evenly">
                    {categories.map(category => (
                        <TouchableOpacity
                            key={category.mecaId}
                            className="flex-col items-center justify-center bg-white rounded-lg p-4 w-32 h-32"
                            onPress={() => onNavigateMenu?.(category.mecaId)}
                        >
                            {category.mecaId === 1
                                ? <HandPlatter size={35} color="#75624a"/>
                                : <Wine size={35} color="#75624a"/>
                            }
                            <Text className="mt-4 font-bold">{category.mecaNombre}</Text>
                            <Text className="mt-1 text-[#75624a]">Ver menú</Text>
                        </TouchableOpacity>
                    ))}
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
                visible={!!activeError}
                alertType="error"
                title="Error"
                message={activeError ?? 'Error inesperado'}
                onAccept={clearError}
            />
        </SafeAreaView>
    );
}
