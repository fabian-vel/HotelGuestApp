import React from 'react';
import {Dimensions, FlatList, View} from 'react-native';

interface CarouselComponentProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactElement;
    keyExtractor: (item: T) => string;
}

const {width} = Dimensions.get('window');
const PADDING_CONTAINER = 24; // p-6 = 24px cada lado
const CARD_WIDTH = 100;
const CARDS_VISIBLE = 3;
const GAP = ((width - (PADDING_CONTAINER * 2)) - (CARD_WIDTH * CARDS_VISIBLE)) / 2;

export function CarouselComponent<T>({
                                         data,
                                         renderItem,
                                         keyExtractor,
                                     }: Readonly<CarouselComponentProps<T>>) {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            contentContainerStyle={{gap: GAP}}
            style={{flexGrow: 0}}
            renderItem={({item}) => (
                <View style={{width: CARD_WIDTH, height: 140}}>
                    {renderItem(item)}
                </View>
            )}
        />
    );
}
