import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, View} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import ToolBarComponent from "@/shared/components/ToolBarComponent";
import CardComponent from "@/features/menu-details/components/CardComponent";
import {BottomSheetComponent} from "@/features/menu-details/components/BottomSheetComponent";
import LabelCarouselComponent from "@/features/menu-details/components/LabelCarouselComponent";
import {getMenuItem} from "@/features/menu-details/service/MenuItemService";
import {getTags} from "@/features/menu-details/service/EtiquetaService";
import {MenuItem} from "@/types/MenuItem";
import {Tag} from "@/types/Tag";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {AlertState} from "@/types/AlertState";

interface Props {
    submenuId: number;
    submenuName: string;
    onBack: () => void;
}

export const MenuDetailsScreen = ({submenuId, submenuName, onBack}: Props) => {
    const [selectedEtiquetaId, setSelectedEtiquetaId] = useState<number>(0);
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [alert, setAlert] = useState<AlertState>({visible: false});

    const loadData = async () => {
        try {
            const [items, tags] = await Promise.all([
                getMenuItem({ mecaId: submenuId }),
                getTags({ mecaId: submenuId, consultaPorCategoria: true }),
            ]);

            setItems(items);
            setTags(tags);
        } catch (error: any) {
            setAlert({
                visible: true,
                alertType: 'error',
                title: 'Error',
                message: error?.message ?? 'Error inesperado',
                onAccept: () => {
                    setAlert({visible: false});
                    handleSelectBack();
                }
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleIncrease = (dishId: number) => {
        setCart(prev => ({...prev, [dishId]: (prev[dishId] || 0) + 1}));
    };

    const handleDecrease = (dishId: number) => {
        setCart(prev => {
            const currentQuantity = prev[dishId] || 0;
            if (currentQuantity <= 1) {
                const updatedCart = {...prev};
                delete updatedCart[dishId];
                return updatedCart;
            }
            return {...prev, [dishId]: currentQuantity - 1};
        });
    };

    const itemsFiltrados = selectedEtiquetaId === 0
        ? items
        : items.filter(item => item.etiquetas?.some(e => e.etiqId === selectedEtiquetaId));

    const handleOpenDish = (dish: MenuItem) => {
        setSelectedItem({...dish, quantity: cart[dish.meitId] || 0});
        setModalVisible(true);
    };

    const handleBottomSheetQuantityChange = useCallback((quantity: number) => {
        setSelectedItem((prev) => {
            if (prev) {
                setCart(cartPrev => ({...cartPrev, [prev.meitId]: quantity}));
                return {...prev, quantity};
            }
            return prev;
        });
    }, []);

    const handleSelectBack = () => {
        onBack();
    };

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}}>
            <View style={{flex: 1}}>
                <ToolBarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => setNotifications(0)}
                    showBackButton={true}
                    onBackPress={handleSelectBack}
                    title={submenuName}
                />
                <LabelCarouselComponent
                    tags={tags}
                    defaultSelectedId={0}
                    onSelectEtiqueta={setSelectedEtiquetaId}
                />
                <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={true}
                    decelerationRate="normal"
                    contentContainerStyle={{padding: 16}}
                    scrollEventThrottle={16}
                >
                    {itemsFiltrados.map((item: MenuItem) => (
                        <View key={item.meitId} className="mb-4">
                            <CardComponent
                                item={item}
                                hideDescription={false}
                                quantity={cart[item.meitId] || 0}
                                onIncrease={() => handleIncrease(item.meitId)}
                                onDecrease={() => handleDecrease(item.meitId)}
                                onPress={() => handleOpenDish(item)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <BottomSheetComponent
                    visible={modalVisible}
                    item={selectedItem}
                    onClose={() => setModalVisible(false)}
                    onQuantityChange={handleBottomSheetQuantityChange}
                />
            </View>
            <AlertComponent {...alert}/>
        </SafeAreaView>
    );
};
