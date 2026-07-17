import React from 'react';
import {View, Text} from "react-native";
import {ImageComponent} from "@/shared/components/ImageComponent";
import {SpecialItem} from "@/types/SpecialItem";

interface Props {
    item: SpecialItem;
    chefRecommended?: boolean;
}

export function SpecialItemCardComponent({item, chefRecommended = false}: Readonly<Props>) {
    const {meitNombre, meitImagenUrl, meitPrecio} = item;

    return (
        <View className="bg-white justify-between"
              style={{width: 100, height: 130, borderRadius: 10, elevation: 2}}>
            {chefRecommended && (
                <ImageComponent style={{width: 25, height: 31, position: 'absolute', top: 0, right: 10, zIndex: 1000}}
                                localImage={require('../../../../assets/img/bookmark.webp')}
                />
            )}
            <ImageComponent style={{width: '100%', height: 70, borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                            image={meitImagenUrl}
            />
            <View className="flex-col flex-1 p-2 bg-white justify-between rounded-b-[9px]">
                <Text style={{fontSize: 12}}>
                    {meitNombre}
                </Text>
                <Text style={{fontSize: 12, color: '#717171', fontWeight: 600}}>
                    ${meitPrecio}
                </Text>
            </View>
        </View>
    );
}
