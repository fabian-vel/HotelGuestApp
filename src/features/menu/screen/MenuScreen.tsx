import React, {useState} from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import ToolbarComponent from '../../../shared/components/ToolbarComponent';
import CarouselComponent from '../components/CarouselComponent';
import {menuData} from "@/features/menu/screen/data";
import {ButtonComponent} from "@/shared/components";
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/types/navigation";

type menuDishesNavigationProp = StackNavigationProp<RootStackParamList, 'MenuDishes'>;


export default function MenuScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const navigation = useNavigation<menuDishesNavigationProp>();

    const handMenuDishesSubmit = () => {
        navigation.replace('MenuDishes');
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
                />
                <CarouselComponent
                    title="Menú de comidas"
                    data={menuData}
                />
                <View className="flex-1 flex-row px-4">
                    <ButtonComponent
                        title={"Ver menu de platos"}
                        onPress={() => handMenuDishesSubmit()}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

