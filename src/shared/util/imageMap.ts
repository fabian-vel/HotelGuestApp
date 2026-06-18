export const localImageMap: Record<number, any> = {
    1: require('../../../assets/img/9.png'),
    2: require('../../../assets/img/10.png'),
    3: require('../../../assets/img/1.png'),
    4: require('../../../assets/img/5.png'),
    5: require('../../../assets/img/7.png'),
    6: require('../../../assets/img/6.png'),
    7: require('../../../assets/img/4.png'),
    8: require('../../../assets/img/2.png'),
    9: require('../../../assets/img/8.png'),
};

export const defaultImage = require('../../../assets/img/default.png');

export const getCategoryImage = (id: number, url?: string | null) => {
    if (url && url.trim() !== '') {
        return { uri: url }; // imagen remota
    }
    return localImageMap[id] ?? defaultImage; // fallback local
};
