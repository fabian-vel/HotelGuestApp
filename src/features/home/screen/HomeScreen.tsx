import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {RecommendedItemCardComponent} from "@/features/home/components/RecommendationComponent";
import {ChevronRight, ChevronLeft, ArrowRight} from "lucide-react-native";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {useOrderStore} from "@/shared/store/orderStore";
import {getOrderStatusStyle} from "@/shared/util/orderStatusUtil";
import {SpecialItemCardComponent} from "@/features/home/components/SpecialItemCardComponent";
import {SpecialItem} from "@/types/SpecialItem";
import {getSpecialItems} from "@/features/home/service/SpecialItemsService";
import {AlertState} from "@/types/AlertState";
import {CarouselComponent} from "@/features/home/components/CarouselComponent";

export function HomeScreen() {
    const ESTADOS_ACTIVOS = new Set([1, 2]); // 1: Pendiente, 2: En preparación
    const {orders, loadingOrder, fetchOrders, errorOrder} = useOrderStore();
    const [mostRequestedItems, setMostRequestedItems] = useState<SpecialItem[]>([]);
    const [mostRecentItems, setMostRecentItems] = useState<SpecialItem[]>([]);
    const [alert, setAlert] = useState<AlertState>({visible: false});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
        loadSpecialItems();
    }, []);

    const loadSpecialItems = async () => {
        try {
            const specialItems = await getSpecialItems();
            setMostRequestedItems(specialItems?.itemsMasPedidos);
            setMostRecentItems(specialItems?.itemsMasRecientes);
        } catch (error: any) {
            setAlert({
                visible: true,
                alertType: 'error',
                title: 'Error',
                message: error?.message ?? 'Error inesperado',
                onAccept: () => {
                    setAlert({visible: false});
                }
            });
        } finally {
            setLoading(false);
        }
    }

    if (loadingOrder || loading) {
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
                    <RecommendedItemCardComponent/>
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

                <Text className="mt-4"
                      style={{marginBottom: 16, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                    Más pedidos
                </Text>
                <CarouselComponent
                    data={mostRequestedItems}
                    keyExtractor={(item: SpecialItem) => item.meitId.toString()}
                    renderItem={(item) => (
                        <SpecialItemCardComponent
                            item={item}
                        />
                    )}
                />

                <Text className="mt-4"
                      style={{marginBottom: 16, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                    Nuevos en el menú
                </Text>
                <CarouselComponent
                    data={mostRecentItems}
                    keyExtractor={(item: SpecialItem) => item.meitId.toString()}
                    renderItem={(item) => (
                        <SpecialItemCardComponent
                            item={item}
                        />
                    )}
                />

                {currentOrder !== null && (
                    <>
                        <Text className="mt-4"
                              style={{marginBottom: 16, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                            Tu pedido actual
                        </Text>

                        <View
                            className="flex-row items-center justify-between bg-white h-[50px] w-full pl-4 pr-4 rounded-lg"
                        style={{elevation: 2}}>
                            <Text>{currentOrder?.detallePedidoList.length} productos</Text>
                            <Text style={{backgroundColor, color}} className="p-2 rounded-lg w-36 text-center">
                                {currentOrder?.espeNombre}
                            </Text>
                            <TouchableOpacity>
                                <ArrowRight/>
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
