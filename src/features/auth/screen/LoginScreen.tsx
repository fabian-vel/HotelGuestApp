import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<LoginNavigationProp>();

    const handleLoginSubmit = (code: string) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('Menu');
        }, 2000);
    };

    return (
        <SafeAreaView className="flex-1 bg-stone-100">
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
        </SafeAreaView>
    );
}

