import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import {Etiqueta} from "@/types/Etiqueta";

interface LabelProps {
    etiqueta: Etiqueta[];
    defaultSelectedId: number;
}

export default function LabelCarouselComponent({
                                                   etiqueta,
                                                   defaultSelectedId,
                                               }: Readonly<LabelProps>) {

    const [selectedId, setSelectedId] = useState(defaultSelectedId);

    const handlePress = (etiqueta: Etiqueta) => {
        setSelectedId(etiqueta.etiqId);
        console.log('Label seleccionado:', etiqueta);
    };

    return (
        <View className="my-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-2"
            >
                {etiqueta.map((etiqueta) => {
                    const selected = etiqueta.etiqId === selectedId;

                    return (
                        <Pressable
                            key={etiqueta.etiqId}
                            onPress={() => handlePress(etiqueta)}
                            className={`px-4 py-2 rounded-full ${selected ? 'bg-black' : 'bg-gray-300'}`}
                        >
                            <Text className={selected ? 'text-white' : 'text-black'}>
                                {etiqueta.etiqNombre}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}
