import React, {useCallback, useState} from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import ToolbarComponent from "@/shared/components/ToolbarComponent";
import {menuData} from "@/features/menu/screen/data";
import {Dish} from "@/types/domain";
import {RouteProp} from "@react-navigation/core";
import {RootStackParamList} from "@/types/navigation";
import CardComponent from "@/features/menu-details/components/CardComponent";
import {BottomSheetComponent} from "@/features/menu-details/components/BottomSheetComponent";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import LabelCarouselComponent from "@/features/menu-details/components/LabelCarouselComponent";

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
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const {submenuId, submenuName} = route.params;
    const etiquetas = [
        {id: 0, name: "Todos"},
        {id: 1, name: "Carne"},
        {id: 2, name: "Ensalada"},
        {id: 3, name: "Pescado"},
        {id: 4, name: "Aves"},
        {id: 5, name: "Asados"},
        {id: 6, name: "Sopas"},
        {id: 7, name: "Comida de mar"}
    ]

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



    const handleOpenDish = (dish: Dish) => {
        // Pasa la cantidad actual del cart (o 1 si aún no fue agregado).
        setSelectedDish({...dish, quantity: cart[dish.id] || 0});
        setModalVisible(true);
    };

    const handleBottomSheetQuantityChange = useCallback((quantity: number) => {
        // Sincroniza selectedDish y el cart en tiempo real.
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

    return (
        <SafeAreaView className="flex-1 bg-stone-100">
            <View className="flex-1">
                <ToolbarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => setNotifications(0)}
                    showBackButton={true}
                    onBackPress={handleSelectBack}
                    title={submenuName}
                />
                <LabelCarouselComponent
                    labels={etiquetas}
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
                    {menuData.map((item: Dish) => (
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
