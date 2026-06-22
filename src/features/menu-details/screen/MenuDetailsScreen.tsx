import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, View} from "react-native";
import ToolBarComponent from "@/shared/components/ToolBarComponent";
import {menuData} from "@/features/menu/screen/data";
import {Item} from "@/types/Item";
import {RouteProp} from "@react-navigation/core";
import {RootStackParamList} from "@/types/Navigation";
import CardComponent from "@/features/menu-details/components/CardComponent";
import {BottomSheetComponent} from "@/features/menu-details/components/BottomSheetComponent";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import LabelCarouselComponent from "@/features/menu-details/components/LabelCarouselComponent";
import {getMenuItem} from "@/features/menu-details/service/MenuItemService";
import {getEtiquetas} from "@/features/menu-details/service/EtiquetaService";
import {MenuItem} from "@/types/MenuItem";
import {Etiqueta} from "@/types/Etiqueta";

type MenuDetailRouteProp = RouteProp<RootStackParamList, 'MenuDetail'>;
type MenuDetailNavigationProp = StackNavigationProp<RootStackParamList, 'MenuDetail'>;

interface Props {
    route: MenuDetailRouteProp;
}

export const MenuDetailsScreen = ({route}: Props) => {

    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const [cart, setCart] = useState<Record<string, number>>({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDish, setSelectedDish] = useState<Item | null>(null);
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
    const {submenuId, submenuName} = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [items, etiquetas] = await Promise.all([
                    getMenuItem({ mecaId: submenuId }),
                    getEtiquetas({ mecaId: submenuId, consultaPorCategoria: true}),
                ]);
                setItems(items);
                setEtiquetas(etiquetas);
            } catch (error) {
                console.error('Error al cargar datos del menú', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleIncrease = (dishId: string) => {
        setCart(prev => ({
            ...prev,
            [dishId]: (prev[dishId] || 0) + 1,
        }));
    };

    const navigation = useNavigation<MenuDetailNavigationProp>();

    const handleDecrease = (dishId: string) => {
        setCart(prev => {
            const currentQuantity = prev[dishId] || 0;
            if (currentQuantity <= 1) {
                const updatedCart = {...prev};
                delete updatedCart[dishId];
                return updatedCart;
            }
            return {
                ...prev,
                [dishId]: currentQuantity - 1,
            };
        });
    };



    const handleOpenDish = (dish: Item) => {
        setSelectedDish({...dish, quantity: cart[dish.id] || 0});
        setModalVisible(true);
    };

    const handleBottomSheetQuantityChange = useCallback((quantity: number) => {
        setSelectedDish((prev) => {
            if (prev) {
                setCart(cartPrev => ({
                    ...cartPrev,
                    [prev.id]: quantity,
                }));
                return {...prev, quantity};
            }
            return prev;
        });
    }, []);

    const handleSelectBack = () => {
        navigation.replace('Menu');
    };

    console.log("submenuId ", submenuId);
    console.log("submenuName ", submenuName);
    console.log("cart", cart);
    console.log("items ", items);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-stone-100">
            <View className="flex-1">
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
                    etiqueta={etiquetas}
                    defaultSelectedId={0}
                />
                <ScrollView
                    className="flex-1 h-full"
                    showsVerticalScrollIndicator={true}
                    decelerationRate="normal"
                    contentContainerStyle={{
                        padding: 16,
                        overflow: 'scroll'
                    }}
                    scrollEventThrottle={16}
                >
                    {menuData.map((item: Item) => (
                        <View
                            key={item.id}
                            className="mb-4"
                        >
                            <CardComponent
                                dish={item}
                                hideDescription={false}
                                quantity={cart[item.id] || 0}
                                onIncrease={() =>
                                    handleIncrease(item.id)
                                }
                                onDecrease={() =>
                                    handleDecrease(item.id)
                                }
                                onPress={() =>
                                    handleOpenDish(item)
                                }
                            />
                        </View>
                    ))}
                </ScrollView>

                <BottomSheetComponent
                    visible={modalVisible}
                    dish={selectedDish}
                    onClose={() => setModalVisible(false)}
                    onQuantityChange={handleBottomSheetQuantityChange}
                />
            </View>
        </SafeAreaView>
    );
};
