import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { icons } from '../_assets/icons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const TabBarButton = ({ isFocused, routeName, color, onPress, onLongPress }) => {
    const scale = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 });
    }, [isFocused, scale]);

    const animatedIconStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
        const top = interpolate(scale.value, [0, 1], [0, 1]);
        return {
            transform: [{ scale: scaleValue }],
            top
        };
    });

    const IconComponent = isFocused 
        ? icons[routeName]?.filled 
        : icons[routeName]?.regular;

    console.log(`Route: ${routeName}`, `IconComponent: ${IconComponent}`);

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
            android_ripple={{ color: 'transparent' }}
        >
            <Animated.View style={animatedIconStyle}>
                {IconComponent ? (
                    <IconComponent color={color} />
                ) : (
                    <Text style={{ color }}>Icon</Text>
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
