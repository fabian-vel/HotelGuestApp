import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {SpecialDishCardComponent} from "@/features/home/components/SpecialDishCardComponent";
import {Wine, HandPlatter, ChevronRight} from "lucide-react-native";
import {useCategoriaStore} from "@/shared/store/categoriaStore";

interface HomeScreenProps {
    onNavigateMenu?: (categoriaId?: number) => void;
}

export function HomeScreen({ onNavigateMenu }: Readonly<HomeScreenProps>) {
    const { categorias, loading, fetchCategorias } = useCategoriaStore();

    useEffect(() => {
        fetchCategorias();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fcf8f6' }} edges={['top', 'left', 'right']}>
            <View style={{ flex: 1 }} className="p-6">
                <Text className="text-2xl font-serif font-bold text-stone-900 tracking-wide">
                    Hola Juan
                </Text>
                <Text className="tracking-wide text-sm text-[#75624a]"
                      style={{ marginBottom: 24, fontSize: 16, lineHeight: 18 }}>
                    Habitación 302
                </Text>
                <SpecialDishCardComponent />
                <Text className="mt-6"
                      style={{ marginBottom: 20, fontSize: 16, lineHeight: 18, color: '#75624a' }}>
                    Explorar
                </Text>
                <View className="flex-row items-center justify-evenly">
                    {categorias.map(categoria => (
                        <TouchableOpacity
                            key={categoria.mecaId}
                            className="flex-col items-center justify-center bg-white rounded-lg p-4 w-32 h-32"
                            onPress={() => onNavigateMenu?.(categoria.mecaId)}
                        >
                            {categoria.mecaId === 1
                                ? <HandPlatter size={35} color="#75624a" />
                                : <Wine size={35} color="#75624a" />
                            }
                            <Text className="mt-4 font-bold">{categoria.mecaNombre}</Text>
                            <Text className="mt-1 text-[#75624a]">Ver menú</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <Text className="mt-6"
                      style={{ marginBottom: 20, fontSize: 16, lineHeight: 18, color: '#75624a' }}>
                    Tu pedido actual
                </Text>
                <View className="flex-row items-center justify-between bg-white h-[70px] w-full pl-4 pr-4 rounded-lg">
                    <Text>2 productos</Text>
                    <Text style={{ backgroundColor: '#4c3f08', color: '#efd444' }} className="p-2 rounded-lg">
                        En preparación
                    </Text>
                    <TouchableOpacity>
                        <ChevronRight />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
