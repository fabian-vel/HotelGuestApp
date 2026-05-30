import React from "react";
import {Image, ImageSourcePropType, ImageStyle, StyleProp} from "react-native";

interface ImageComponentProps {
    image?: string;
    localImage?: ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
    className?: string;
}

export const ImageComponent = ({
                                    image,
                                    localImage,
                                    style,
                                    className
                               }: Readonly<ImageComponentProps>) => {

    const hasRemoteImage  = typeof image === "string" && image.trim().length > 0;

    const imageSource = hasRemoteImage
        ? { uri: image }
        : localImage ??
        require('../../../assets/img/default.png');

    return (
        <Image
            source={imageSource}
            style={style}
            className={className}
            resizeMode="contain"
        />
    );
};
