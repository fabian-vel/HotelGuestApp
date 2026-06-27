import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated, ImageSourcePropType} from 'react-native';
import {ChevronDown} from "lucide-react-native";
import {ImageComponent} from "@/shared/components/ImageComponent";
import {Submenu} from "@/types/Submenu";

interface AccordionItem {
    id: number;
    label?: string;
    localImage?: ImageSourcePropType;
}

interface AccordionProps {
    title?: string;
    LocalImageTitle?: ImageSourcePropType;
    list: AccordionItem[];
    onSelectSubmenu?: (submenu: Submenu) => void; // ← objeto en vez de parámetros sueltos
}

export default function AccordionComponent({
                                               title,
                                               LocalImageTitle,
                                               list,
                                               onSelectSubmenu,
                                           }: Readonly<AccordionProps>) {
    const [expanded, setExpanded] = useState(false);

    const animatedController = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedController, {
            toValue: expanded ? 1 : 0,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [expanded]);

    const rotateSign = animatedController.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View className="mt-2">
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                className={`border border-gray-300 p-4 ml-2 mr-2 bg-white ${
                    expanded ? 'rounded-t-xl' : 'rounded-xl'}`}>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <ImageComponent
                            localImage={LocalImageTitle}
                            style={{width: 40, height: 40}}
                            className={"mr-4"}
                        />
                        <Text className="text-lg font-bold text-gray-800">
                            {title}
                        </Text>
                    </View>
                    <Animated.View style={{transform: [{rotate: rotateSign}]}}>
                        <ChevronDown size={20} className="text-gray-500"/>
                    </Animated.View>
                </View>
            </TouchableOpacity>

            {expanded && (
                <View>
                    {list.map((item, index) => {
                        const isLastItem = index === list.length - 1;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    onSelectSubmenu?.({  // ← objeto Submenu
                                        submenuId: item.id,
                                        submenuName: item.label ?? ''
                                    })
                                }
                                className={`border-x border-b border-gray-300 p-2 ml-2 mr-2 bg-gray-50 ${
                                    isLastItem ? 'rounded-b-xl' : ''}`}>
                                <View className="flex-row items-center">
                                    <ImageComponent
                                        localImage={item?.localImage}
                                        style={{width: 40, height: 40}}
                                        className={"mr-4"}
                                    />
                                    <Text className="text-base text-gray-700">
                                        {item.label}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}
        </View>
    );
}
