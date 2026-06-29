import React, {useEffect, useState} from "react";
import {View, Text, Pressable, TouchableOpacity, Dimensions} from "react-native";
import {BottomSheetComponent} from "@/shared/components/BottomSheetComponent";
import {ImageComponent} from "@/shared/components/ImageComponent";
import QuantitySelectorComponent from "@/features/menu-details/components/QuantitySelectorComponent";
import {MenuItem} from "@/types/MenuItem";
import {useCartStore} from "@/shared/store/cartStore";

type Label = {
    id: number;
    name: string;
};

interface ItemDetailSheetComponentProps {
    visible: boolean;
    item: MenuItem | null;
    onClose: () => void;
    labels?: Label[];
}

export function ItemDetailSheetComponent({
                                             visible,
                                             item,
                                             onClose,
                                             labels,
                                         }: Readonly<ItemDetailSheetComponentProps>) {
    const { height } = Dimensions.get('window');
    const {add, items: cartItems} = useCartStore();
    const [quantity, setQuantity] = useState(0);

    const SNAP_60 = height * 0.6;  // 60%

    useEffect(() => {
        if (visible && item) {
            const current = cartItems[item.meitId]?.cantidad ?? 0;
            setQuantity(current);
        }
    }, [visible, item?.meitId]);

    const etiquetas = labels ?? item?.etiquetas?.map(e => ({
        id: e.etiqId,
        name: e.etiqNombre
    })) ?? [];

    const handleIncrease = () => setQuantity(prev => prev + 1);
    const handleDecrease = () => setQuantity(prev => prev > 0 ? prev - 1 : 0);


    return (
        <BottomSheetComponent
            visible={visible}
            onClose={onClose}
            minHeight={SNAP_60}
        >
            <View className="w-full flex-1 flex-col rounded-xl justify-between">
                <ImageComponent
                    image={item?.meitImagenUrl}
                    style={{width: '100%', height: 180}}
                    className="rounded-xl"
                />
                <Text className="text-2xl font-bold">{item?.meitNombre}</Text>
                <Text className="text-2xl">${item?.meitPrecio}</Text>
                <Text className="text-[17px]">{item?.meitDescripcion}</Text>
                <View className="flex-row flex-wrap gap-2 w-full">
                    {etiquetas.map(label => (
                        <Pressable key={label.id} className="px-4 py-2 rounded-full bg-gray-300">
                            <Text className="text-black">{label.name}</Text>
                        </Pressable>
                    ))}
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
                    onPress={() => {
                        if (item) add(item, quantity);
                        onClose();
                    }}
                >
                    <Text className="text-white">
                        Agregar al pedido · ${quantity * (item?.meitPrecio ?? 0)}
                    </Text>
                </TouchableOpacity>
            </View>
        </BottomSheetComponent>
    );
}
