import React, {useState} from 'react';
import {View, SafeAreaView} from 'react-native';
import ToolbarComponent from '../../../shared/components/ToolbarComponent';
import AccordionComponent from "@/features/menu/components/AccordionComponent";
import {CupSoda, Utensils} from "lucide-react-native";

export default function MenuScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);

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
                    TitleIcon={Utensils}
                    list={[
                        {label: 'Entradas', localImage: require('../../../../assets/img/1.png')},
                        {label: 'Platos Fuertes', localImage: require('../../../../assets/img/5.png')},
                        {label: 'Postres', localImage: require('../../../../assets/img/7.png')}
                    ]}
                />

                <AccordionComponent
                    title="Bebidas"
                    TitleIcon={CupSoda}
                    list={[
                        { label: 'Jugos', localImage: require('../../../../assets/img/6.png')},
                        { label: 'Cervezas', localImage: require('../../../../assets/img/4.png')},
                        { label: 'Cócteles', localImage: require('../../../../assets/img/2.png')},
                        { label: 'Gaseosas', localImage: require('../../../../assets/img/8.png')}
                    ]}
                />
            </View>
        </SafeAreaView>
    );
}
