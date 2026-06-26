import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator, TouchableOpacity} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/types/Navigation";
import {BottomBarComponent, BottomBarTab} from "@/shared/components/BottomBarComponent";
import {useNavigation} from "@react-navigation/native";
import {CalendarArrowDown, CalendarArrowUp, Phone, LogOut, ChevronRight, ReceiptText} from "lucide-react-native";
import {getTokenPayload} from "@/shared/util/jwtUtil";
import {getFechaAcceso} from "@/features/profile/service/FechaAccesoService";
import {HabitacionAcceso} from "@/types/HabitacionAcceso";
import {useAuthStore} from "@/features/auth/store/authStore";

const formatFecha = (fecha: Date): string =>
    new Date(fecha).toLocaleDateString('es-CO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    });

const getIniciales = (nombreCompleto: string): string =>
    nombreCompleto.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();


const Separador = () => (
    <View className="w-full bg-white border-x border-gray-300 items-center justify-center h-[1px]">
        <View style={{width: '80%', height: 1, backgroundColor: '#d1d5db'}}/>
    </View>
);

interface FilaAccionProps {
    icono: React.ReactNode;
    label: string;
    onPress?: () => void;
    labelColor?: string;
    className?: string;
}

const FilaAccion = ({icono, label, onPress, labelColor = '#000', className = ''}: FilaAccionProps) => (
    <View className={`flex-row w-full h-20 bg-white items-center p-4 ${className}`}>
        <View className="flex-row items-center flex-1">
            {icono}
            <Text className="ml-6 text-[16px] font-medium" style={{color: labelColor}}>
                {label}
            </Text>
        </View>
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
        >
            <ChevronRight color={'#000'}/>
        </TouchableOpacity>
    </View>
);

type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

export function ProfileScreen() {
    const navigation = useNavigation<ProfileNavigationProp>();
    const [habitacion, setHabitacion] = useState<string | null>(null);
    const [nombre, setNombre] = useState<string | null>(null);
    const [acceso, setAcceso] = useState<HabitacionAcceso | null>(null);
    const [iniciales, setIniciales] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const clearToken = useAuthStore((state) => state.clearToken);

    const handleTabPress = useCallback((tab: BottomBarTab) => {
        switch (tab) {
            case 'Inicio':
                navigation.replace('Home');
                break;
            case 'Menu':
                navigation.replace('Menu', {});
                break;
            default:
                break;
        }
    }, [navigation]);

    const handleLogout = useCallback(async () => {
        await clearToken();
        navigation.replace('Login');
    }, [clearToken, navigation]);

    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const payload = await getTokenPayload();
                if (payload) {
                    setHabitacion(payload.sub);
                    setNombre(payload.clienteNombre);
                    setIniciales(getIniciales(payload.clienteNombre));
                    const data = await getFechaAcceso({haacId: payload.accesoId});
                    setAcceso(data);
                }
            } catch (error) {
                console.error('Error al cargar perfil', error);
            } finally {
                setLoading(false);
            }
        };
        cargarPerfil();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}}>
            <View style={{flex: 1}} className="p-6 items-center">

                <View className="w-20 h-20 bg-emerald-100 justify-center items-center rounded-full mt-[40px]">
                    <Text className="font-bold text-3xl">{iniciales}</Text>
                </View>
                <Text className="mt-2 text-xl font-medium">{nombre}</Text>
                <Text className="text-xl font-medium">Habitación {habitacion}</Text>
                <View className="w-full mt-6">
                    <View
                        className="flex-col w-full h-20 bg-white rounded-t-xl items-center p-4 border-t border-x border-gray-300">
                        <View className="flex-row w-full">
                            <CalendarArrowUp/>
                            <Text className="text-[16px] ml-2">Check-in</Text>
                        </View>
                        <Text className="text-right text-[16px] w-full">
                            {acceso ? formatFecha(acceso.haacFechaInicio) : '-'}
                        </Text>
                    </View>
                    <Separador/>
                    <View
                        className="flex-col w-full h-20 bg-white rounded-b-xl items-center p-4 border-b border-x border-gray-300">
                        <View className="flex-row w-full">
                            <CalendarArrowDown/>
                            <Text className="text-[16px] ml-2">Check-out</Text>
                        </View>
                        <Text className="text-right text-[16px] w-full">
                            {acceso ? formatFecha(acceso.haacFechaFin) : '-'}
                        </Text>
                    </View>
                </View>

                <View className="w-full mt-6">
                    <FilaAccion
                        icono={<Phone/>}
                        label="Contactar recepción"
                        className="rounded-t-xl border-t border-x border-gray-300"
                    />
                    <Separador/>
                    <FilaAccion
                        icono={<ReceiptText/>}
                        label="Ver factura"
                        className="border-x border-gray-300"
                    />
                    <Separador/>
                    <FilaAccion
                        icono={<LogOut color="#dc2626"/>}
                        label="Cerrar sesión"
                        labelColor="#dc2626"
                        onPress={handleLogout}
                        className="rounded-b-xl border-b border-x border-gray-300"
                    />
                </View>

            </View>
            <BottomBarComponent activeTab="Perfil" onTabPress={handleTabPress}/>
        </SafeAreaView>
    );
}
