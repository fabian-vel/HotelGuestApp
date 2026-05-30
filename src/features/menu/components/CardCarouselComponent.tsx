import React from 'react';
import { View, Text } from 'react-native';
import {ImageComponent} from "@/shared/components/ImageComponent";

interface CardCarouselComponentProps {
    title: string;
    image: string;
    price: number;
}

export default function CardCarouselComponent({ title, image, price }: Readonly<CardCarouselComponentProps>) {

    return (
        <View className="flex-col bg-transparent overflow-hidden h-40 w-full">
            <ImageComponent
                image={image}
                className="w-full h-20 rounded-lg"
            />
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

