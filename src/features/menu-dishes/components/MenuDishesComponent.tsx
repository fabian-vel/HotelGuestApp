import React from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import CardComponent from "@/shared/components/CardComponent";
import {Dish} from "@/types/domain";

interface Props {
    menuData: Dish[];
}

export default function MenuDishesComponent({ menuData }: Readonly<Props>) {
    const Item = ({dish}: any) => (
        <View className="w-full items-center">
            <CardComponent
                dish={dish}
                hideDescription={false}
            />
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-stone-100">
            <View className="flex-1">
                <FlatList
                    data={menuData}
                    renderItem={({item}) => (
                        <Item dish={item}/>)}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        padding: 16,
                        gap: 16,
                    }}
                />
            </View>
        </SafeAreaView>
    );
}
