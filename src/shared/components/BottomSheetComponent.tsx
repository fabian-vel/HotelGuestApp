import React, {useEffect, useRef} from "react";
import {Animated, Modal, TouchableOpacity, View} from "react-native";
import {ChevronDown, CircleX} from "lucide-react-native";
import {SeparatorComponent} from "@/shared/components/SeparatorComponent";

interface BottomSheetComponentProps {
    visible: boolean;
    onClose: () => void;
    minHeight?: number; // ← número en dp, ej: 400
    children: React.ReactNode;
}

export function BottomSheetComponent({
                                         visible,
                                         onClose,
                                         minHeight,
                                         children,
                                     }: Readonly<BottomSheetComponentProps>) {
    const overlayOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(overlayOpacity, {
            toValue: visible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [visible]);

    return (
        <>
            {visible && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        opacity: overlayOpacity,
                        zIndex: 10,
                    }}
                    pointerEvents="none"
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <View style={{minHeight: minHeight ?? 400, maxHeight: '90%'}}
                          className="bg-white w-full rounded-t-3xl pb-5 pl-5 pr-5 shadow-2xl">
                        <View className="w-full flex-row justify-center items-center">
                            <TouchableOpacity onPress={onClose} className="p-[3px]">
                                <ChevronDown/>
                            </TouchableOpacity>
                        </View>
                        <SeparatorComponent style={{marginBottom: 10}}/>
                        {children}
                    </View>
                </View>
            </Modal>
        </>
    );
}
