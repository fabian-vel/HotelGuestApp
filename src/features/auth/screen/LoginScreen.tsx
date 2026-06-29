import React, { useState } from 'react';
import { View, Text } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/Navigation';
import {login} from "@/features/auth/service/authService";
import {useAuthStore} from "@/features/auth/store/authStore";
import {AlertState} from "@/types/AlertState";
import {AlertComponent} from "@/shared/components/AlertComponent";

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<LoginNavigationProp>();
    const saveToken = useAuthStore((state) => state.saveToken);
    const [alert, setAlert] = useState<AlertState>({visible: false});

    const handleLoginSubmit = async (habitacion: string, codigo: string) => {
        setLoading(true);
        try {
            const response = await login(habitacion, codigo);
            await saveToken(response.token);
            navigation.replace('Main');
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
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center px-6">
                <View className="items-center mb-8">
                    <Text className="text-3xl font-serif font-bold text-stone-900 tracking-wide">
                        Grand Hotel
                    </Text>
                    <Text className="text-emerald-700 font-medium tracking-widest text-xs uppercase mt-1">
                        Room Service
                    </Text>
                </View>
                <LoginForm onSubmit={handleLoginSubmit} isLoading={loading} />
                <Text className="text-stone-400 text-xs mt-12">
                    ¿Problemas con su código? Contacte a recepción.
                </Text>
            </View>
            <AlertComponent {...alert}/>
        </SafeAreaView>
    );
}
