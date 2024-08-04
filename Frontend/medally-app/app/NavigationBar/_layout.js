import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import TabBar from '../components/TabBar';

const _layout = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Tabs tabBar={(props) => <TabBar {...props} />}>
                <Tabs.Screen
                    name="Home"
                    options={{
                        href: './Home/',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="Nutrition"
                    options={{
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="SymptomChecker"
                    options={{
                        href: './SymptomChecker',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="Medication"
                    options={{
                        href: './Medication',
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="ProfileScreen"
                    options={{
                        href: './ProfileScreen',
                        headerShown: false,
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0, // Add some padding at the bottom to accommodate the tab bar
    },
});

export default _layout;
