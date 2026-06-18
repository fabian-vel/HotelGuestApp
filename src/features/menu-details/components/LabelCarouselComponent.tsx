import React, {useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
} from 'react-native';

type Label = {
    id: number;
    name: string;
};

interface LabelProps {
    labels: Label[];
    defaultSelectedId: number;
}

export default function LabelCarouselComponent({
                                                   labels,
                                                   defaultSelectedId,
                                               }: Readonly<LabelProps>) {

    const [selectedId, setSelectedId] = useState(defaultSelectedId);

    const handlePress = (label: Label) => {
        setSelectedId(label.id);
        console.log('Label seleccionado:', label);
    };

    return (
        <View className="my-4">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="px-4 gap-2"
            >
                {labels.map((label) => {
                    const selected = label.id === selectedId;

                    return (
                        <Pressable
                            key={label.id}
                            onPress={() => handlePress(label)}
                            className={`px-4 py-2 rounded-full ${selected ? 'bg-black' : 'bg-gray-300'}`}
                        >
                            <Text className={selected ? 'text-white' : 'text-black'}>
                                {label.name}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}
