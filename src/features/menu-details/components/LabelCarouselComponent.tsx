import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';
import {Tag} from "@/types/Tag";

interface LabelProps {
    tags: Tag[];
    defaultSelectedId?: number;
    onSelectEtiqueta?: (etiqId: number) => void;
}

const ALL_ID = 0;

export default function LabelCarouselComponent({
                                                   tags,
                                                   defaultSelectedId,
                                                   onSelectEtiqueta,
                                               }: Readonly<LabelProps>) {

    const [selectedId, setSelectedId] = useState(defaultSelectedId ?? ALL_ID);

    const handlePress = (id: number) => {
        setSelectedId(id);
        onSelectEtiqueta?.(id);
    };

    const all = [{etiqId: ALL_ID, etiqNombre: 'Todos'}];
    const listTags = [...all, ...tags];

    return (
        <View className="my-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-2"
            >
                {listTags.map((e) => {
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
