import React from 'react';
import {View, Text} from "react-native";
import {ImageComponent} from "@/shared/components/ImageComponent";
import {Bookmark} from "lucide-react-native";

export function SpecialDishCardComponent() {
    return (
        <View
            className="rounded-2xl w-full h-40 flex-row p-4"
            style={{backgroundColor: '#14532d'}}
        >
            <View style={{position: 'absolute', top: -4, right: 5, zIndex: 10}}>
                <Bookmark color="yellow" fill="yellow" size={40}/>
            </View>
            <View style={{flex: 1.6}} className="">
                <Text className="text-white font-semibold tracking-wide"
                      style={{fontSize: 13, lineHeight: 16, marginBottom: 10}}>
                    RECOMENDACIÓN DEL CHEF
                </Text>
                <Text className="text-white font-bold"
                      style={{fontSize: 18, lineHeight: 20, marginBottom: 10}}>
                    Punta de anca en salsa de vino tinto
                </Text>
                <Text className="text-white"
                      style={{fontSize: 18, lineHeight: 20}}>
                    $56.500
                </Text>
            </View>
            <View
                style={{flex: 1, overflow: 'hidden'}}
                className="items-center justify-end"
            >
                <ImageComponent
                    style={{width: 110, height: 110, borderRadius: 55}}
                />
            </View>
        </View>
    );
}
