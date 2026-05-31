import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import CardCarouselComponent from './CardCarouselComponent';
import {Dish} from "@/types/domain";

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CAROUSEL_PADDING = 16;
const AVAILABLE_WIDTH = SCREEN_WIDTH - CAROUSEL_PADDING * 2;
const CARD_MARGIN = 16;
const CARD_WIDTH = (AVAILABLE_WIDTH - CARD_MARGIN * 2) / 3;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

interface CarouselComponentProps {
    title: string;
    data: Dish[];
}

export default function CarouselComponent({title, data}: Readonly<CarouselComponentProps>) {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SNAP_INTERVAL);
        if (index !== currentIndex && index >= 0 && index < data.length) {
            setCurrentIndex(index);
        }
    };

    return (
        <View className="my-4 w-full px-4">
            <Text className="text-xl font-bold text-stone-900 mb-3">{title}</Text>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={SNAP_INTERVAL}
                contentContainerClassName="pr-4"
                onMomentumScrollEnd={handleScroll}
                scrollEventThrottle={16}
            >
                {data.map((dish, index) => {
                    const isLast = index === data.length - 1;
                    return (
                        <View key={dish.id} style={{width: CARD_WIDTH}} className={isLast ? 'mr-0' : 'mr-4'}>
                            <CardCarouselComponent title={dish.title} image={dish.image} price={dish.price}/>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

