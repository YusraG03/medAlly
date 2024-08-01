import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            options={{
                href: '../Homepage',
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="Nutrition"
            options={{
                title: "Nutrition"
            }}
        />
        <Tabs.Screen
            name="Checker"
            options={{
                title: "Symptoms"
            }}
        />
        <Tabs.Screen
            name="Medication"
            options={{
                title: "Medication"
            }}
        />
         <Tabs.Screen
            name="Profile"
            options={{
                title: "Profile"
            }}
        />
    </Tabs>
  )
}

export default _layout