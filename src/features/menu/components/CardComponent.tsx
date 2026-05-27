import React from 'react';
import {View, Text, Image, ImageSourcePropType} from 'react-native';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import {Dish} from '@/types/domain';

interface CardComponentProps {
    dish: Dish;
    hideDescription?: boolean;
}

export default function CardComponent({dish, hideDescription = false}: Readonly<CardComponentProps>) {
    const {title, image, description, price} = dish;
    const imageSource: ImageSourcePropType = typeof image === 'string' ? {uri: image} : image;

    return (
        <View className="flex-row bg-white shadow-md border border-stone-200 w-full max-w-sm overflow-hidden h-28">
            <Image source={imageSource} className="w-28 h-full" resizeMode="cover"/>
            <View className="flex-1 p-3 justify-between">
                <View>
                    <Text className="font-bold text-stone-900 text-base leading-tight">{title}</Text>
                    {!hideDescription && (
                        <Text numberOfLines={2} className="text-stone-500 text-xs mt-1">
                            {description}
                        </Text>
                    )}
                </View>
                <View className="flex-row items-center justify-between mt-2">
                    <Text className="text-emerald-700 font-bold text-base">${price}</Text>
                    <View className="w-16">
                        <ButtonComponent
                            title="Pedir"
                            onPress={() => { /* Tu lógica futura */
                            }}
                            isLoading={false}
                            className="py-1.5 rounded-full"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

