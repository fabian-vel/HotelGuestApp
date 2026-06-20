import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ActivityIndicator} from 'react-native';
import ToolbarComponent from '../../../shared/components/ToolbarComponent';
import AccordionComponent from "@/features/menu/components/AccordionComponent";
import {RootStackParamList} from "@/types/Navigation";
import {StackNavigationProp} from "@react-navigation/stack";
import {useNavigation} from "@react-navigation/native";
import {getCategorias} from "@/features/menu/service/MenuService";
import {getCategoryImage} from "@/shared/util/imageMap";
import {MenuCategoriaResponse} from "@/types/MenuCategoriaResponse";

type MenuNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
    const [search, setSearch] = useState('');
    const [notifications, setNotifications] = useState(3);
    const [categorias, setCategorias] = useState<MenuCategoriaResponse[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation<MenuNavigationProp>();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error('Error al cargar categorías', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorias();
    }, []);

    const handleSelectSubmenu = (submenuId: number, submenuName: string) => {
        navigation.replace('MenuDetail', {submenuId, submenuName});
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <View className="flex-1">
                <ToolbarComponent
                    searchValue={search}
                    onChangeSearch={setSearch}
                    notificationCount={notifications}
                    onBellPress={() => setNotifications(0)}
                    showBackButton={false}
                    title={"Menú"}
                />

                {categorias.map((categoria) => (
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
            </View>
        </SafeAreaView>
    );
}
