import React, {useState} from "react";
import {SafeAreaView, ScrollView, View} from "react-native";
import ToolbarComponent from "@/shared/components/ToolbarComponent";
import {menuData} from "@/features/menu/screen/data";
import CarouselComponent from "@/features/menu-details/components/CarouselComponent";
import {Dish} from "@/types/domain";
import {RouteProp} from "@react-navigation/core";
import {RootStackParamList} from "@/types/navigation";
import CardComponent from "@/shared/components/CardComponent";

type MenuDetailRouteProp = RouteProp<RootStackParamList, 'MenuDetail'>;

interface Props {
    route: MenuDetailRouteProp;
}

export const MenuDetailsScreen = ({ route }: Props) => {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const { submenuId, submenuName } = route.params;

    console.log(submenuId);
    console.log(submenuName);

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
            <CarouselComponent
                title={'Recomendaciones'}
                data={menuData}
            />
            <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                decelerationRate="normal"
                contentContainerClassName="pr-4"
                scrollEventThrottle={16}
            >
                {menuData.map((item: Dish) => {
                    return (
                        <View key={item.id} className="mr-4">
                            <CardComponent dish={item} hideDescription={false}/>
                        </View>
                    );
                })}
            </ScrollView>

        </View>
    </SafeAreaView>
)
    ;
};
