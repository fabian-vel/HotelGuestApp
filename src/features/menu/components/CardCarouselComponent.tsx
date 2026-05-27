import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

interface CardCarouselComponentProps {
    title: string;
    image: string | number;
    price: number;
}

export default function CardCarouselComponent({ title, image, price }: CardCarouselComponentProps) {
    const imageSource: ImageSourcePropType = typeof image === 'string' ? { uri: image } : image;

    return (
        <View className="flex-col bg-transparent overflow-hidden h-40 w-full">
            <Image source={imageSource} className="w-full h-20 rounded-lg" resizeMode="cover" />
            <View className="flex-1 p-2 justify-start">
                <Text numberOfLines={2} className="font-bold text-stone-900 text-[10px]">
                    {title}
                </Text>
                <Text className="text-emerald-700 font-bold text-[12px] mt-1">
                    ${price}
                </Text>
            </View>
        </View>
    );
}

