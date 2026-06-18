import React, {useEffect, useState} from "react";
import {Modal, SafeAreaView, TouchableOpacity, View, Text, Pressable} from "react-native";
import {Dish} from "@/types/domain";
import {ChevronDown} from "lucide-react-native";
import {ImageComponent} from "@/shared/components/ImageComponent";
import QuantitySelectorComponent from "@/features/menu-details/components/QuantitySelectorComponent";

type Label = {
    id: number;
    name: string;
};

interface BottomSheetComponentProps {
    visible: boolean;
    dish: Dish | null;
    onClose: () => void;
    labels?: Label[];
    onQuantityChange?: (quantity: number) => void;
}

export function BottomSheetComponent({
                                         visible,
                                         dish,
                                         onClose,
                                         labels,
                                         onQuantityChange
                                     }: Readonly<BottomSheetComponentProps>) {

    const [quantity, setQuantity] = useState(1);

    // Al abrir, usa la cantidad del cart (dish.quantity) o 1 si es 0.
    useEffect(() => {
        if (visible) {
            const initialQty = (dish?.quantity && dish.quantity > 0) ? dish.quantity : 1;
            setQuantity(initialQty);
            onQuantityChange?.(initialQty);
        }
    }, [visible, dish?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end">
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
                                style={{width: '100%', height: 180}}
                                className={"rounded-xl"}
                            />
                            <Text className="text-2xl font-bold">
                                {dish?.title}
                            </Text>
                            <Text className="text-2xl">
                                ${dish?.price}
                            </Text>
                            <Text  className="text-[17px]">
                                {dish?.description}
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
                                    Agregar al pedido    ·    ${quantity * (dish?.price ?? 0)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
