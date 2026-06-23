export type RootStackParamList = {
  Login: undefined;
  Menu: { categoriaId?: number } | undefined;
  MenuDetail: {
    submenuId: number;
    submenuName: string;
  };
  Home: undefined;
};


