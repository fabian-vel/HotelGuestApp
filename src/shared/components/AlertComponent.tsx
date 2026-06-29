import React from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {CircleCheck, CircleAlert, CircleX, Info} from 'lucide-react-native';
import {AlertState} from "@/types/AlertState";

export function AlertComponent({
                                   visible,
                                   alertType = 'info',
                                   title,
                                   message,
                                   onAccept,
                                   onCancel,
                                   acceptText = 'Aceptar',
                                   cancelText = 'Cancelar',
                               }: Readonly<AlertState>) {
    const SIZE_ICON = 70;
    const COLOR_ICON = '#ffffff';

    const icon = {
        success: <CircleCheck size={SIZE_ICON} color={COLOR_ICON} fill="#22C55E"/>,
        error:   <CircleX     size={SIZE_ICON} color={COLOR_ICON} fill="#EF4444"/>,
        warning: <CircleAlert size={SIZE_ICON} color={COLOR_ICON} fill="#F59E0B"/>,
        info:    <Info        size={SIZE_ICON} color={COLOR_ICON} fill="#3B82F6"/>,
    }[alertType];

    return (
        <Modal animationType="fade" transparent visible={visible}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
                <View className="bg-white rounded-2xl px-6 pt-2 pb-6 mx-6 items-center" style={{width: '80%'}}>
                    {icon}
                    {title !== undefined && (
                        <Text className="text-lg font-bold mt-1 text-center">
                            {title}
                        </Text>
                    )}
                    {message !== undefined && (
                        <Text className="text-sm text-gray-500 mt-2 text-center">
                            {message}
                        </Text>
                    )}
                    <View className="flex-row gap-3 mt-6 w-full">
                        {onCancel && (
                            <TouchableOpacity
                                className="flex-1 border border-gray-300 rounded-full py-3 items-center"
                                onPress={onCancel}
                            >
                                <Text className="font-medium">{cancelText}</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            className="flex-1 bg-black rounded-full py-3 items-center"
                            onPress={onAccept}
                        >
                            <Text className="text-white font-medium">{acceptText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
