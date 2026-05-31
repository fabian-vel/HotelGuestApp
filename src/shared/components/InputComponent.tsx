import React from 'react';
import {TextInput, View, Text, TextInputProps} from 'react-native';

interface InputComponentProps extends TextInputProps {
    label?: string;
    error?: string;
}

export default function InputComponent({label, error, ...props}: Readonly<InputComponentProps>) {

    const labelValid = typeof label === 'string' && label.trim().length > 0;
    const errorValid = typeof error === 'string' && error.trim().length > 0;

    return (
        <View className="w-full mb-4">
            {labelValid && <Text className="text-stone-700 font-medium mb-1.5 text-sm">{label}</Text>}
            <TextInput
                className={`w-full bg-white border ${error ? 'border-red-500' : 'border-stone-300'} rounded-xl p-4 text-stone-800 text-base`}
                placeholderTextColor="#a8a29e"
                {...props}
            />
            {errorValid && <Text className="text-red-500 text-xs mt-1 font-medium">{error}</Text>}
        </View>
    );
}

