import React from 'react';
import {Text, View} from 'react-native';
import {Check, CircleX, CookingPot, PackageCheck, X} from 'lucide-react-native';

const VERDE = '#069535';
const GRIS = '#d1d5db';
const ROJO = '#dc2626';

const ESTADOS = {
    PENDIENTE: 1,
    PREPARACION: 2,
    ENTREGADO: 3,
    CANCELADO: 4,
};

interface OrderTimelineComponentProps {
    espeId: number;
}

export function OrderTimelineComponent({espeId}: Readonly<OrderTimelineComponentProps>) {

    const cancelado = espeId === ESTADOS.CANCELADO;

    const pasos = [
        {
            label: 'Pendiente',
            icon: Check,
            activo:
                espeId === ESTADOS.PENDIENTE ||
                espeId === ESTADOS.PREPARACION ||
                espeId === ESTADOS.ENTREGADO,
            seleccionado: espeId === ESTADOS.PENDIENTE,
            size: 28,
        },
        {
            label: 'En preparación',
            icon: CookingPot,
            activo:
                espeId === ESTADOS.PREPARACION ||
                espeId === ESTADOS.ENTREGADO,
            seleccionado: espeId === ESTADOS.PREPARACION,
            size: 26,
        },
        {
            label: 'Entregado',
            icon: PackageCheck,
            activo: espeId === ESTADOS.ENTREGADO,
            seleccionado: espeId === ESTADOS.ENTREGADO,
            size: 28,
        },
    ];

    return (
        <>
            <View className="flex-row justify-between items-center w-full">
                {pasos.map((paso, index) => {
                    const Icon = paso.icon;

                    return (
                        <React.Fragment key={paso.label}>
                            <View className="rounded-full justify-center items-center"
                                  style={{
                                      width: 40,
                                      height: 40,
                                      backgroundColor: !cancelado && paso.activo ? VERDE : GRIS,
                                  }}>
                                <Icon size={paso.size} color="#fff"/>
                            </View>

                            {index < pasos.length - 1 && (
                                <View className="mx-2"
                                      style={{
                                          flex: 1, height: 2,
                                          backgroundColor: !cancelado && pasos[index + 1].activo ? VERDE : GRIS,
                                      }}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </View>

            <View className="flex-row justify-between mt-2">
                {pasos.map((paso) => (
                    <Text
                        key={paso.label}
                        className="font-medium"
                        style={{
                            fontSize: 11,
                            color: !cancelado && paso.seleccionado ? VERDE : GRIS,
                        }}>
                        {paso.label}
                    </Text>
                ))}
            </View>

            {cancelado && (
                <View className="items-center mt-4">
                    <View className="flex-row items-center rounded-full px-4 py-2"
                          style={{backgroundColor: '#fef2f2'}}>
                        <CircleX color={ROJO} size={16}/>
                        <Text style={{color: ROJO, fontSize: 13, marginLeft: 6, fontWeight: '500'}}>
                            Pedido cancelado
                        </Text>
                    </View>
                </View>
            )}
        </>
    );
}
