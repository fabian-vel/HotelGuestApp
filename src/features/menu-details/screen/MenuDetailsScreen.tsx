import React, {useState} from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import ToolbarComponent from "@/shared/components/ToolbarComponent";
import {menuData} from "@/features/menu/screen/data";
import {Dish} from "@/types/domain";
import {RouteProp} from "@react-navigation/core";
import {RootStackParamList} from "@/types/navigation";
import CardComponent from "@/features/menu-details/components/CardComponent";
import {BottomSheetComponent} from "@/features/menu-details/components/BottomSheetComponent";

type MenuDetailRouteProp = RouteProp<RootStackParamList, 'MenuDetail'>;

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

    const handleIncrease = (dishId: string) => {
        setCart(prev => ({
            ...prev,
            [dishId]: (prev[dishId] || 0) + 1,
        }));
    };

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
        setSelectedDish(dish);
        setModalVisible(true);
    };

    console.log("submenuId ",submenuId);
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
                    title={submenuName}
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
                />
            </View>
        </SafeAreaView>
    );
};
