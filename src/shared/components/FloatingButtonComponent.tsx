import React, {useMemo, useState} from "react";
import {useCartStore} from "@/shared/store/cartStore";
import {Text, TouchableOpacity, View} from "react-native";
import {ShoppingCart} from "lucide-react-native";

interface FloatingButtonComponentProps {
    onPress: () => void;
    bottom?: number
    left?: number,
    right?: number,
    top?: number,
    color?: string
}

export function FloatingButtonComponent({
                                            onPress,
                                            bottom,
                                            left,
                                            top,
                                            right,
                                            color
                                        }: Readonly<FloatingButtonComponentProps>) {
    const {items} = useCartStore();

    const numItems = useMemo(
        () => Object.values(items).reduce((total, item) => total + item.cantidad, 0),
        [items]
    );

    return (
        <>
            {numItems > 0 && (
                <TouchableOpacity className="rounded-full justify-center items-center"
                                  onPress={onPress}
                                  style={{
                                      backgroundColor: color,
                                      position: 'absolute',
                                      bottom: bottom,
                                      right: right,
                                      width: 55,
                                      height: 55
                                  }}>
                    <ShoppingCart size={24} color="#ffffff" strokeWidth={2}/>
                    <View
                        className="absolute right-[1px] top-[1px] bg-yellow-500 min-w-[18px] h-[18px] rounded-full items-center justify-center px-1">
                        <Text className="text-white text-[10px] font-bold text-center">
                            {numItems > 9 ? '9+' : numItems}
                        </Text>
                    </View>

                </TouchableOpacity>
            )}
        </>
    );
}
