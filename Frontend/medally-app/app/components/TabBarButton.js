import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { icons } from '../_assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = (props) => {
    const { isFocused, routeName, color, onPress, onLongPress } = props;

    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(
            typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
            { duration: 350 }
        );
    }, [scale, isFocused]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(
            scale.value,
            [0, 1],
            [1, 1.1]
        );
        const top = interpolate(
            scale.value,
            [0, 1],
            [0, 1]
        );

        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });

    const IconComponent = isFocused ? icons[routeName].filled : icons[routeName].regular;

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
            android_ripple={{ color: 'transparent' }} // Remove default ripple effect on Android
        >
            <Animated.View style={[animatedIconStyle]}>
                {IconComponent ? (
                    <IconComponent color={color} />
                ) : (
                    <Text style={{ color }}>Icon</Text> // Fallback UI, could be an icon or text
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default TabBarButton;
