import React, {useState} from 'react';
import {Alert, Text, SafeAreaView, View} from "react-native";
import ToolbarComponent from "@/shared/components/ToolbarComponent";
import MenuDishesComponent from "@/features/menu-dishes/components/MenuDishesComponent";
import {menuData} from "@/features/menu/screen/data";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/types/navigation";
import {useNavigation} from "@react-navigation/native";
import CarouselComponent from "@/features/menu/components/CarouselComponent";

type menuDishesNavigationProp = StackNavigationProp<RootStackParamList, 'MenuDishes'>;

export default function MenuDishesScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(5);
    const navigation = useNavigation<menuDishesNavigationProp>();
    const handOnBackPress = () => {
        navigation.replace('Menu');
    }

    return (
        <SafeAreaView className="flex-1 bg-stone-100">
            <View className="flex-1">
                <ToolbarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => {
                        Alert.alert('Notificaciones', 'Abriendo panel de estado de tus pedidos...');
                        setNotifications(0);
                    }}
                    showBackButton={true}
                    onBackPress={() => handOnBackPress()}
                />
                <View className="h-[15%] bg-emerald-600 justify-center items-center rounded-b-3xl">
                    <Text className="text-white text-lg font-bold">
                        Menú de bebidas
                    </Text>
                </View>
                <CarouselComponent
                    title="Recomendaciones del diá"
                    data={menuData}
                />
                <MenuDishesComponent
                    menuData={menuData}
                />
            </View>
        </SafeAreaView>
    );
}
