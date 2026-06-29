import React from 'react';
import {Text, TouchableOpacity, View} from "react-native";
import {House, NotebookPen, ShoppingBag, User} from "lucide-react-native";

export type BottomBarTab = 'Inicio' | 'Menu' | 'Pedidos' | 'Perfil';

interface BottomBarProps {
    activeTab?: BottomBarTab;
    onTabPress: (tab: BottomBarTab) => void;
}

export function BottomBarComponent({ activeTab, onTabPress }: Readonly<BottomBarProps>) {
    const activeColor = '#000000';
    const inactiveColor = '#969089';

    const getColor = (tab: BottomBarTab) => activeTab === tab ? activeColor : inactiveColor;

    return (
        <View className="flex-row items-center justify-between h-14 px-4 bg-white border-t border-t-gray-300">
            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Inicio')}
            >
                <House color={getColor('Inicio')} />
                <Text style={{ color: getColor('Inicio'), fontSize: 11 }}>Inicio</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Menu')}
            >
                <NotebookPen color={getColor('Menu')} />
                <Text style={{ color: getColor('Menu'), fontSize: 11 }}>Menú</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Pedidos')}
            >
                <ShoppingBag color={getColor('Pedidos')} />
                <Text style={{ color: getColor('Pedidos'), fontSize: 11 }}>Pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="flex-1 items-center justify-center"
                onPress={() => onTabPress('Perfil')}
            >
                <User color={getColor('Perfil')} />
                <Text style={{ color: getColor('Perfil'), fontSize: 11 }}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
}
