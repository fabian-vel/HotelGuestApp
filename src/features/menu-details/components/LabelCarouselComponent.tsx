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
    defaultSelectedId?: number;
    onSelectEtiqueta?: (etiqId: number) => void;
}

const TODOS_ID = 0;

export default function LabelCarouselComponent({
                                                   etiqueta,
                                                   defaultSelectedId,
                                                   onSelectEtiqueta,
                                               }: Readonly<LabelProps>) {

    const [selectedId, setSelectedId] = useState(defaultSelectedId ?? TODOS_ID);

    const handlePress = (id: number) => {
        setSelectedId(id);
        onSelectEtiqueta?.(id);
    };

    const todas = [{etiqId: TODOS_ID, etiqNombre: 'Todos'}];
    const lista = [...todas, ...etiqueta];

    return (
        <View className="my-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-2"
            >
                {lista.map((e) => {
                    const selected = e.etiqId === selectedId;
                    return (
                        <Pressable
                            key={e.etiqId}
                            onPress={() => handlePress(e.etiqId)}
                            className={`px-4 py-2 rounded-full ${selected ? 'bg-black' : 'bg-gray-300'}`}
                        >
                            <Text className={selected ? 'text-white' : 'text-black'}>
                                {e.etiqNombre}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}
