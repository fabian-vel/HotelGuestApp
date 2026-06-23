import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator, ScrollView} from 'react-native';
import ToolBarComponent from '../../../shared/components/ToolBarComponent';
import AccordionComponent from "@/features/menu/components/AccordionComponent";
import {RootStackParamList} from "@/types/Navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {getCategoryImage} from "@/shared/util/imageMap";
import {BottomBarComponent, BottomBarTab} from "@/shared/components/BottomBarComponent";
import {useCategoriaStore} from "@/shared/store/categoriaStore";

type MenuNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen({ route }: Readonly<{ route: any }>) {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const categoriaId = route?.params?.categoriaId;
    const { categorias, loading, fetchCategorias } = useCategoriaStore();

    const navigation = useNavigation<MenuNavigationProp>();

    useEffect(() => {
        fetchCategorias();
    }, []);

    const categoriasFiltradas = categoriaId
        ? categorias.filter(c => c.mecaId === categoriaId)
        : categorias;

    const handleSelectSubmenu = (submenuId: number, submenuName: string) => {
        navigation.replace('MenuDetail', {submenuId, submenuName});
    };
    const handleSelectHome = () => {
        navigation.replace('Home');
    };

    const handleTabPress = (tab: BottomBarTab) => {
        switch (tab) {
            case 'Menu':
                break;
            case 'Inicio':
                handleSelectHome();
                break; // ← faltaba esto
            case 'Pedidos':
            case 'Perfil':
                console.log(`Vista "${tab}" aún no implementada`);
                break;
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <ToolBarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => setNotifications(0)}
                    showBackButton={false}
                    title={"Menú"}
                />
                <ScrollView style={{ flex: 1 }}>
                    {categoriasFiltradas.map((categoria) => (
                        <AccordionComponent
                            key={categoria.mecaId}
                            title={categoria.mecaNombre}
                            LocalImageTitle={getCategoryImage(categoria.mecaId, categoria.mecaImagenUrl)}
                            onSelectSubmenu={handleSelectSubmenu}
                            list={categoria.subCategorias.map((sub) => ({
                                id: sub.mecaId,
                                label: sub.mecaNombre,
                                localImage: getCategoryImage(sub.mecaId, sub.mecaImagenUrl),
                            }))}
                        />
                    ))}
                </ScrollView>
            </View>
            <BottomBarComponent activeTab="Menu" onTabPress={handleTabPress} />
        </SafeAreaView>
    );
}
