import React, {useState} from "react";
import {Modal, SafeAreaView, TouchableOpacity, View, Text} from "react-native";
import {Dish} from "@/types/domain";
import {ChevronDown} from "lucide-react-native";

interface BottomSheetComponentProps {
    visible: boolean;
    dish: Dish | null;
    onClose: () => void;
}

function SvgComponent() {
    return null;
}

export function BottomSheetComponent({
                                         visible,
                                         dish,
                                         onClose,
                                     }: Readonly<BottomSheetComponentProps>) {

    return (
        <SafeAreaView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end">
                    <View className="bg-white w-full rounded-t-3xl pb-5 pl-5 pr-5 min-h-[50%] max-h-[80%] shadow-2xl">
                        <View className="w-full flex-row justify-center items-center">
                            <TouchableOpacity
                                onPress={onClose}
                                className="p-[3px]"
                            >
                                <ChevronDown/>
                            </TouchableOpacity>
                        </View>
                        <View className="w-full flex-1 rounded-xl">
                            <Text>
                                {dish?.description ? dish?.description : ''}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
