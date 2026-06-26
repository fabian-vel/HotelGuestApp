import React, {useEffect, useState} from "react";
import {Modal, SafeAreaView, TouchableOpacity, View, Text, Pressable} from "react-native";
import {Item} from "@/types/Item";
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

    // Al abrir, usa la cantidad del cart (dish.quantity) o 1 si es 0.
    useEffect(() => {
        if (visible) {
            const initialQty = (item?.quantity && item.quantity > 0) ? item.quantity : 1;
            setQuantity(initialQty);
            onQuantityChange?.(initialQty);
        }
    }, [visible, item?.meitId]); // eslint-disable-line react-hooks/exhaustive-deps

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
                            <Text  className="text-[17px]">
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
                                    Agregar al pedido    ·    ${quantity * (item?.meitPrecio ?? 0)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
