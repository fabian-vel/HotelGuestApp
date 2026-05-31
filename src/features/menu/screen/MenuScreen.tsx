import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import ToolbarComponent from '../../../shared/components/ToolbarComponent';
import AccordionComponent from "@/features/menu/components/AccordionComponent";
import {RootStackParamList} from "@/types/navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";

type MenuNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);

    const navigation = useNavigation<MenuNavigationProp>();
    const handleSelectSubmenu = (
        submenuId: number,
        submenuName: string
    ) => {
        navigation.replace('MenuDetail', {
            submenuId,
            submenuName,
        });
    };

    return (
        <SafeAreaView>
            <View className="flex-1">
                <ToolbarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => {
                        setNotifications(0);
                    }}
                    showBackButton={false}
                />

                <AccordionComponent
                    title="Platos"
                    LocalImageTitle={require('../../../../assets/img/9.png')}
                    onSelectSubmenu={handleSelectSubmenu}
                    list={[
                        {id: 1, label: 'Entradas', localImage: require('../../../../assets/img/1.png')},
                        {id: 2, label: 'Platos Fuertes', localImage: require('../../../../assets/img/5.png')},
                        {id: 3, label: 'Postres', localImage: require('../../../../assets/img/7.png')}
                    ]}
                />

                <AccordionComponent
                    title="Bebidas"
                    LocalImageTitle={require('../../../../assets/img/10.png')}
                    onSelectSubmenu={handleSelectSubmenu}
                    list={[
                        {id: 4, label: 'Jugos', localImage: require('../../../../assets/img/6.png')},
                        {id: 5, label: 'Cervezas', localImage: require('../../../../assets/img/4.png')},
                        {id: 6, label: 'Cócteles', localImage: require('../../../../assets/img/2.png')},
                        {id: 7, label: 'Gaseosas', localImage: require('../../../../assets/img/8.png')}
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}
