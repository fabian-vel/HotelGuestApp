import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {House, NotebookPen, ShoppingCart, User} from "lucide-react-native";

export type BottomBarTab = 'Inicio' | 'Menu' | 'Pedidos' | 'Perfil';

interface BottomBarProps {
    activeTab?: BottomBarTab;
    onTabPress: (tab: BottomBarTab) => void;
}

export function BottomBarComponent({ activeTab, onTabPress }: Readonly<BottomBarProps>) {
    return (
        <View className="flex-row items-center justify-between h-14 px-4 bg-white border-t border-t-gray-300">
            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Inicio')}
            >
                <House color={activeTab === 'Inicio' ? '#047857' : '#000'} />
                <Text>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Menu')}
            >
                <NotebookPen color={activeTab === 'Menu' ? '#047857' : '#000'} />
                <Text>Menú</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Pedidos')}
            >
                <ShoppingCart color={activeTab === 'Pedidos' ? '#047857' : '#000'} />
                <Text>Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Perfil')}
            >
                <User color={activeTab === 'Perfil' ? '#047857' : '#000'} />
                <Text>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}
