import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Item} from '@/types/Item';
import {ImageComponent} from "@/shared/components/ImageComponent";
import QuantitySelectorComponent from "@/features/menu-details/components/QuantitySelectorComponent";
import {MenuItem} from "@/types/MenuItem";

interface CardComponentProps {
    item: MenuItem;
    hideDescription?: boolean;

    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;

    onPress: () => void;
}

export default function CardComponent({
                                          item,
                                          hideDescription = false,
                                          quantity,
                                          onIncrease,
                                          onDecrease,
                                          onPress,
                                      }: Readonly<CardComponentProps>) {

    const {meitNombre, meitImagenUrl, meitDescripcion, meitPrecio} = item;

    return (
        <View className="flex-row bg-white rounded-xl border border-gray-300 w-full max-w-sm overflow-hidden h-32">
            <TouchableOpacity className="flex-1" onPress={onPress} activeOpacity={0.8}>
                <View className="flex-1 p-3 justify-between m-1">
                    <View>
                        <Text className="font-bold text-stone-900 text-[14px] leading-tight">
                            {meitNombre}
                        </Text>
                        {!hideDescription && (
                            <Text numberOfLines={2} className="text-stone-500 text-xs mt-1">
                                {meitDescripcion}
                            </Text>
                        )}
                    </View>
                    <View className="flex-row items-center justify-between mt-2 w-full">
                        <Text className="text-stone-900 font-bold text-[14px]">
                            ${meitPrecio}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <View className="absolute bottom-3 right-32 mr-2">
                <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                    <QuantitySelectorComponent
                        quantity={quantity}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                className="w-32 h-full"
                onPress={onPress}
                activeOpacity={0.8}
            >
                <ImageComponent
                    image={meitImagenUrl}
                    style={{width: 128, height: 128}}
                />
            </TouchableOpacity>
        </View>
    );
}
