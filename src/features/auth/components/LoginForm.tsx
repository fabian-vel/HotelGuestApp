import React, {useState} from 'react';
import {View, Text} from 'react-native';
import InputComponent from '../../../shared/components/InputComponent';
import ButtonComponent from '../../../shared/components/ButtonComponent';

interface LoginFormProps {
    onSubmit: (code: string) => void;
    isLoading: boolean;
}

export default function LoginForm({onSubmit, isLoading}: Readonly<LoginFormProps>) {
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    const handlePress = () => {
        if (!accessCode.trim()) {
            setError('Por favor, ingresa el código de tu habitación');
            return;
        }
        setError('');
        onSubmit(accessCode);
    };

    return (
        <View className="w-full max-w-sm p-6 bg-stone-50/80 rounded-2xl border border-stone-200 shadow-sm">
            <Text className="text-center text-stone-500 mb-6 text-sm">
                Introduce el código de acceso proporcionado en recepción para continuar.
            </Text>
            <InputComponent
                label="Código de Acceso"
                placeholder="Ej: HT-104-X"
                value={accessCode}
                onChangeText={(text) => {
                    setAccessCode(text);
                    if (error) setError('');
                }}
                error={error}
                autoCapitalize="characters"
                //secureTextEntry={true}
            />
            <ButtonComponent title="Ingresar a la Habitación" onPress={handlePress} isLoading={isLoading}/>
        </View>
    );
}

