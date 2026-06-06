import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Dish} from '@/types/domain';
import {ImageComponent} from "@/shared/components/ImageComponent";
import QuantitySelectorComponent from "@/features/menu-details/components/QuantitySelectorComponent";

interface CardComponentProps {
    dish: Dish;
    hideDescription?: boolean;

    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;

    onPress: () => void;
}

export default function CardComponent({
                                          dish,
                                          hideDescription = false,
                                          quantity,
                                          onIncrease,
                                          onDecrease,
                                          onPress,
                                      }: Readonly<CardComponentProps>) {

    const {title, image, description, price} = dish;

    return (
        <View className="flex-row bg-white rounded-xl border border-gray-300 w-full max-w-sm overflow-hidden h-32">

            <TouchableOpacity
                className="flex-1"
                onPress={onPress}
                activeOpacity={0.8}
            >
                <View className="flex-1 p-3 justify-between m-1">

                    <View>
                        <Text className="font-bold text-stone-900 text-[14px] leading-tight">
                            {title}
                        </Text>

                        {!hideDescription && (
                            <Text
                                numberOfLines={2}
                                className="text-stone-500 text-xs mt-1"
                            >
                                {description}
                            </Text>
                        )}
                    </View>

                    <View className="flex-row items-center justify-between mt-2 w-full">

                        <Text className="text-stone-900 font-bold text-[14px]">
                            ${price}
                        </Text>

                    </View>

                </View>
            </TouchableOpacity>

            <View className="absolute bottom-3 left-3">
                <QuantitySelectorComponent
                    quantity={quantity}
                    onIncrease={onIncrease}
                    onDecrease={onDecrease}
                />
            </View>

            <TouchableOpacity
                className="w-32 h-full"
                onPress={onPress}
                activeOpacity={0.8}
            >
                <ImageComponent
                    image={image}
                    className="w-32 h-full"
                />
            </TouchableOpacity>

        </View>
    );
}
