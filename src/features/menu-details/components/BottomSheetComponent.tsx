import React, {useEffect, useRef, useState} from "react";
import {Modal, TouchableOpacity, View, Text, Pressable, Animated} from "react-native";
import {ChevronDown} from "lucide-react-native";
import {ImageComponent} from "@/shared/components/ImageComponent";
import QuantitySelectorComponent from "@/features/menu-details/components/QuantitySelectorComponent";
import {MenuItem} from "@/types/MenuItem";

type Label = {
    id: number;
    name: string;
};

interface BottomSheetComponentProps {
    visible: boolean;
    item: MenuItem | null;
    onClose: () => void;
    labels?: Label[];
    onQuantityChange?: (quantity: number) => void;
}

export function BottomSheetComponent({
                                         visible,
                                         item,
                                         onClose,
                                         labels,
                                         onQuantityChange
                                     }: Readonly<BottomSheetComponentProps>) {
    const [quantity, setQuantity] = useState(1);
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(overlayOpacity, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    useEffect(() => {
        if (visible) {
            const initialQty = (item?.quantity && item.quantity > 0) ? item.quantity : 1;
            setQuantity(initialQty);
            onQuantityChange?.(initialQty);
        }
    }, [visible, item?.meitId]);

    const etiquetas = labels ?? [
        {id: 1, name: "Carne"},
        {id: 2, name: "Ensalada"},
        {id: 7, name: "Comida de mar"}
    ];

    const handleIncrease = () => {
        setQuantity((prev) => {
            const next = prev + 1;
            onQuantityChange?.(next);
            return next;
        });
    };

    const handleDecrease = () => {
        setQuantity((prev) => {
            const next = prev > 1 ? prev - 1 : 1;
            onQuantityChange?.(next);
            return next;
        });
    };

    return (
        <>
            {visible && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        opacity: overlayOpacity,
                        zIndex: 10,
                    }}
                    pointerEvents="none"
                />
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View className="bg-white w-full rounded-t-3xl pb-5 pl-5 pr-5 min-h-[60%] max-h-[80%] shadow-2xl">
                        <View className="w-full flex-row justify-center items-center">
                            <TouchableOpacity
                                onPress={onClose}
                                className="p-[3px]"
                            >
                                <ChevronDown/>
                            </TouchableOpacity>
                        </View>
                        <View className="w-full flex-1 flex-col rounded-xl justify-between">
                            <ImageComponent
                                image={item?.meitImagenUrl}
                                style={{width: '100%', height: 180}}
                                className={"rounded-xl"}
                            />
                            <Text className="text-2xl font-bold">
                                {item?.meitNombre}
                            </Text>
                            <Text className="text-2xl">
                                ${item?.meitPrecio}
                            </Text>
                            <Text className="text-[17px]">
                                {item?.meitDescripcion}
                            </Text>
                            <View className="flex-row flex-wrap gap-2 w-full">
                                {etiquetas.map((label) => {
                                    return (
                                        <Pressable
                                            key={label.id}
                                            className="px-4 py-2 rounded-full bg-gray-300"
                                        >
                                            <Text className="text-black">
                                                {label.name}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </View>
                            <View className="items-center w-full">
                                <QuantitySelectorComponent
                                    quantity={quantity}
                                    onIncrease={handleIncrease}
                                    onDecrease={handleDecrease}
                                />
                            </View>
                            <TouchableOpacity
                                className="items-center rounded-full bg-black w-full h-10 justify-center"
                                onPress={onClose}
                            >
                                <Text className="text-white">
                                    Agregar al pedido · ${quantity * (item?.meitPrecio ?? 0)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}
