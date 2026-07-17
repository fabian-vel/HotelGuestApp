import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowRight} from "lucide-react-native";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {useOrderStore} from "@/shared/store/orderStore";
import {getOrderStatusStyle} from "@/shared/util/orderStatusUtil";
import {SpecialItemCardComponent} from "@/features/home/components/SpecialItemCardComponent";
import {SpecialItem} from "@/types/SpecialItem";
import {getSpecialItems} from "@/features/home/service/SpecialItemsService";
import {AlertState} from "@/types/AlertState";
import {CarouselComponent} from "@/features/home/components/CarouselComponent";

interface SpecialItemList {
    key: number;
    title: string;
    list: SpecialItem[];
}

export function HomeScreen() {
    const ESTADOS_ACTIVOS = new Set([1, 2]);
    const {orders, loadingOrder, fetchOrders, errorOrder} = useOrderStore();
    const [alert, setAlert] = useState<AlertState>({visible: false});
    const [loading, setLoading] = useState(true);
    const [listItem, setListItem] = useState<SpecialItemList[]>([]);

    useEffect(() => {
        fetchOrders();
        loadSpecialItems();
    }, []);

    const loadSpecialItems = async () => {
        try {
            const specialItems = await getSpecialItems();
            setListItem([
                {
                    key: 0,
                    title: 'Recomendados por el chef',
                    list: specialItems?.itemsRecomendadosChef
                },
                {
                    key: 1,
                    title: 'Más pedidos',
                    list: specialItems?.itemsMasRecientes
                },
                {
                    key: 2,
                    title: ' Nuevos en el menú',
                    list: specialItems?.itemsMasRecientes
                }
            ]);
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
                      style={{marginBottom: 15, fontSize: 16, lineHeight: 18}}>
                    Habitación 302
                </Text>
                {listItem.map((list: SpecialItemList) => (
                    <React.Fragment key={list.key}>
                        <Text
                            className="mt-4"
                            style={{marginBottom: 16, fontSize: 16, lineHeight: 18, color: '#75624a'}}>
                            {list.title}
                        </Text>
                        <CarouselComponent
                            data={list.list}
                            keyExtractor={(item: SpecialItem) => item.meitId.toString()}
                            renderItem={(item) => (
                                <SpecialItemCardComponent item={item}/>
                            )}
                        />
                    </React.Fragment>
                ))}
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
