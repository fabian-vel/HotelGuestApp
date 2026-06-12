import React, {useState} from 'react';
import {View, Text} from 'react-native';
import InputComponent from '../../../shared/components/InputComponent';
import ButtonComponent from '../../../shared/components/ButtonComponent';

interface LoginFormProps {
    onSubmit: (habitacion: string, code: string) => void;
    isLoading: boolean;
}

export default function LoginForm({onSubmit, isLoading}: Readonly<LoginFormProps>) {
    const [habitacion, setHabitacion] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [errors, setErrors] = useState({habitacion: '', code: ''});

    const handlePress = () => {
        const newErrors = {habitacion: '', code: ''};
        if (!habitacion.trim()) newErrors.habitacion = 'Ingresa el número de habitación';
        if (!accessCode.trim()) newErrors.code = 'Ingresa el código de acceso';

        if (newErrors.habitacion || newErrors.code) {
            setErrors(newErrors);
            return;
        }

        setErrors({habitacion: '', code: ''});
        onSubmit(habitacion, accessCode);
    };

    return (
        <View className="w-full max-w-sm p-6 bg-stone-50/80 rounded-2xl border border-stone-200 shadow-sm">
            <Text className="text-center text-stone-500 mb-6 text-sm">
                Introduce el número de habitación y el código de acceso proporcionado en recepción.
            </Text>
            <InputComponent
                label="Número de Habitación"
                placeholder="Ej: 302"
                value={habitacion}
                onChangeText={(text) => {
                    setHabitacion(text);
                    if (errors.habitacion) setErrors(prev => ({...prev, habitacion: ''}));
                }}
                error={errors.habitacion}
                keyboardType="numeric"
            />
            <InputComponent
                label="Código de Acceso"
                placeholder="Ej: A7X9"
                value={accessCode}
                onChangeText={(text) => {
                    setAccessCode(text);
                    if (errors.code) setErrors(prev => ({...prev, code: ''}));
                }}
                error={errors.code}
                autoCapitalize="characters"
            />
            <ButtonComponent
                title="Ingresar a la Habitación"
                onPress={handlePress}
                isLoading={isLoading}
            />
        </View>
    );
}
