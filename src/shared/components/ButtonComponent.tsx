import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps} from 'react-native';

interface ButtonComponentProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    isLoading?: boolean;
    className?: string;
}

export default function ButtonComponent({
                                            title,
                                            onPress,
                                            isLoading = false,
                                            className = '',
                                            ...props
                                        }: Readonly<ButtonComponentProps>) {
    const baseStyle = `w-full bg-emerald-600 items-center justify-center flex-row ${isLoading ? 'opacity-70' : ''}`;
    const finalStyle = `${baseStyle} ${className.includes('rounded-') ? '' : 'rounded-xl'} ${className.includes('p-') ? '' : 'p-4'} ${className}`;

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress} disabled={isLoading} className={finalStyle} {...props}>
            {isLoading ? (
                <ActivityIndicator color="#fff"/>
            ) : (
                <Text className="text-white text-sm font-semibold text-center">{title}</Text>
            )}
        </TouchableOpacity>
    );
}

