import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ToolBarComponent from '../../../shared/components/ToolBarComponent';
import AccordionComponent from "@/features/menu/components/AccordionComponent";
import {getCategoryImage} from "@/shared/util/imageMap";
import {useCategoriesStore} from "@/shared/store/categoryStore";
import {Submenu} from "@/types/Submenu";
import {AlertComponent} from "@/shared/components/AlertComponent";

interface MenuScreenProps {
    onSelectSubmenu: (submenu: Submenu) => void;
}

export default function MenuScreen({onSelectSubmenu}: Readonly<MenuScreenProps>) {

    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const {categories, loading, fetchCategories, error} = useCategoriesStore();

    useEffect(() => {
        fetchCategories();
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
            <View style={{flex: 1}}>
                <ToolBarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => setNotifications(0)}
                    showBackButton={false}
                    title={"Menú"}
                />
                <ScrollView style={{flex: 1}}>
                    {categories.map((categoria) => (
                        <AccordionComponent
                            key={categoria.mecaId}
                            title={categoria.mecaNombre}
                            LocalImageTitle={getCategoryImage(categoria.mecaId, categoria.mecaImagenUrl)}
                            onSelectSubmenu={onSelectSubmenu}
                            list={categoria.subCategorias.map((sub) => ({
                                id: sub.mecaId,
                                label: sub.mecaNombre,
                                localImage: getCategoryImage(sub.mecaId, sub.mecaImagenUrl),
                            }))}
                        />
                    ))}
                </ScrollView>
            </View>
            <AlertComponent
                visible={!!error}
                alertType="error"
                title="Error"
                message={error ?? 'Error inesperado'}
                onAccept={() => useCategoriesStore.setState({error: null})}
            />
        </SafeAreaView>
    );
}
