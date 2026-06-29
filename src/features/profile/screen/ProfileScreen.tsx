import React, {useCallback, useEffect, useState} from 'react';
import {Text, View, ActivityIndicator} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context';
import {CalendarArrowDown, CalendarArrowUp, Phone, LogOut, ReceiptText} from "lucide-react-native";
import {getTokenPayload} from "@/shared/util/jwtUtil";
import {getAccessDate} from "@/features/profile/service/AccessDateService";
import {RoomAccess} from "@/types/RoomAccess";
import {useAuthStore} from "@/features/auth/store/authStore";
import {AlertState} from "@/types/AlertState";
import {AlertComponent} from "@/shared/components/AlertComponent";
import {SeparatorComponent} from "@/shared/components/SeparatorComponent";
import {ActionPanelComponent} from "@/features/profile/components/ActionPanelComponent";

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

interface ProfileScreenProps {
    onLogout?: () => void;
}

export function ProfileScreen({onLogout}: Readonly<ProfileScreenProps>) {
    const [habitacion, setHabitacion] = useState<string | null>(null);
    const [nombre, setNombre] = useState<string | null>(null);
    const [acceso, setAcceso] = useState<RoomAccess | null>(null);
    const [iniciales, setIniciales] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const clearToken = useAuthStore((state) => state.clearToken);
    const [alert, setAlert] = useState<AlertState>({visible: false});

    const handleLogout = useCallback(async () => {
        await clearToken();
        onLogout?.();
    }, [clearToken, onLogout]);

    const loadData = async () => {
        try {
            const payload = await getTokenPayload();
            if (payload) {
                setHabitacion(payload.sub);
                setNombre(payload.clienteNombre);
                setIniciales(getIniciales(payload.clienteNombre));
                const data = await getAccessDate({haacId: payload.accesoId});
                setAcceso(data);
            }
        } catch (error: any) {
            setAlert({
                visible: true,
                alertType: 'error',
                title: 'Error',
                message: error?.message ?? 'Error inesperado',
                onAccept: () => {
                    setAlert({visible: false});
                }
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fcf8f6'}} edges={['top', 'left', 'right']}>
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
                    <SeparatorComponent/>
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
                    <ActionPanelComponent
                        icono={<Phone/>}
                        label="Contactar recepción"
                        className="rounded-t-xl border-t border-x border-gray-300"
                    />
                    <SeparatorComponent/>
                    <ActionPanelComponent
                        icono={<ReceiptText/>}
                        label="Ver factura"
                        className="border-x border-gray-300"
                    />
                    <SeparatorComponent/>
                    <ActionPanelComponent
                        icono={<LogOut color="#dc2626"/>}
                        label="Cerrar sesión"
                        labelColor="#dc2626"
                        onPress={handleLogout}
                        className="rounded-b-xl border-b border-x border-gray-300"
                    />
                </View>
            </View>
            <AlertComponent {...alert}/>
        </SafeAreaView>
    );
}
