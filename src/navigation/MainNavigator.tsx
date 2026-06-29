import {useState} from "react";
import {BottomBarComponent, BottomBarTab} from "@/shared/components/BottomBarComponent";
import {HomeScreen} from "@/features/home/screen/HomeScreen";
import MenuScreen from "@/features/menu/screen/MenuScreen";
import {OrderScreen} from "@/features/order/screen/OrderScreen";
import {ProfileScreen} from "@/features/profile/screen/ProfileScreen";
import {MenuDetailsScreen} from "@/features/menu-details/screen/MenuDetailsScreen";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "@/types/Navigation";

type MainNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface Submenu {
    submenuId: number;
    submenuName: string;
}

export function MainNavigator() {
    const [activeTab, setActiveTab] = useState<BottomBarTab>('Inicio');
    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);
    const [submenu, setSubmenu] = useState<Submenu | null>(null);
    const navigation = useNavigation<MainNavigationProp>();

    const handleTabPress = (tab: BottomBarTab) => {
        if (tab === 'Menu') setCategoriaId(undefined);
        setSubmenu(null); // ← cierra MenuDetail al cambiar de tab
        setActiveTab(tab);
    };

    const handleNavigateMenu = (id?: number) => {
        setCategoriaId(id);
        setSubmenu(null);
        setActiveTab('Menu');
    };

    const handleLogout = () => {
        navigation.replace('Login');
    };

    const renderScreen = () => {
        if (submenu) {
            return (
                <MenuDetailsScreen
                    submenuId={submenu.submenuId}
                    submenuName={submenu.submenuName}
                    onBack={() => setSubmenu(null)}
                />
            );
        }
        switch (activeTab) {
            case 'Inicio':  return <HomeScreen onNavigateMenu={handleNavigateMenu}/>;
            case 'Menu': return (
                <MenuScreen
                    categoryId={categoriaId}
                    onSelectSubmenu={setSubmenu}
                />
            );
            case 'Pedidos': return <OrderScreen/>;
            case 'Perfil':  return <ProfileScreen onLogout={handleLogout}/>;
        }
    };

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                {renderScreen()}
            </View>
            <BottomBarComponent
                activeTab={activeTab}
                onTabPress={handleTabPress}
            />
        </View>
    );
}
