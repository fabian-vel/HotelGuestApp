import React, {useState} from 'react';
import {View, Alert, ScrollView} from 'react-native';
import Toolbar from './Toolbar';
import CardComponent from './CardComponent';
import CarouselComponent from './CarouselComponent';
import {Dish} from '@/types/domain';

const menuData: Dish[] = [
    {
        id: '1',
        title: 'Pizza Margherita',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Clásica pizza italiana con salsa de tomate, mozzarella fresca y albahaca.',
        price: 12.99,
    },
    {
        id: '2',
        title: 'Hamburguesa Americana',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Carne de res premium, queso cheddar, tocino ahumado y papas fritas.',
        price: 14.50,
    },
    {
        id: '3',
        title: 'Ensalada César',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Lechuga romana, pollo a la parrilla, crotones, queso parmesano y aderezo.',
        price: 9.99,
    },
    {
        id: '4',
        title: 'Pasta Carbonara',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Espagueti con salsa cremosa de huevo, queso pecorino romano y panceta crujiente.',
        price: 13.25,
    },
    {
        id: '5',
        title: 'Salmón a la Parrilla',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Filete de salmón con vegetales al vapor y salsa de limón.',
        price: 18.99,
    },
    {
        id: '6',
        title: 'Tiramisú',
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop',
        description: 'Postre italiano con capas de bizcocho, mascarpone y café espresso.',
        price: 7.50,
    },
];

export default function MenuScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);

    return (
        <View className="flex-1 bg-stone-100">
            <Toolbar
                searchValue={search}
                onChangeSearch={setSearch}
                notificationCount={notifications}
                onBellPress={() => {
                    Alert.alert('Notificaciones', 'Abriendo panel de estado de tus pedidos...');
                    setNotifications(0);
                }}
            />
            <CarouselComponent title="Menú de comidas" data={menuData}/>
            <View style={{flex: 1}}>
                <ScrollView
                    style={{flex: 1}}
                    contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 32}}
                    showsVerticalScrollIndicator={false}
                >
                    <View className="w-full items-center gap-4">
                        {menuData.map((dish) => (
                            <CardComponent key={dish.id} dish={dish} hideDescription={false}/>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

