import React, {useState} from 'react';
import {Alert, SafeAreaView, View} from "react-native";
import ToolbarComponent from "@/shared/components/ToolbarComponent";
import MenuDishesComponent from "@/features/menu-dishes/components/MenuDishesComponent";
import {menuData} from "@/features/menu/screen/data";

export default function MenuDishesScreen(props: any) {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(5);

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
                <MenuDishesComponent
                   menuData={menuData}
                />
            </View>
        </SafeAreaView>
    );
}
