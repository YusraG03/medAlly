import React from 'react';
import { Image } from 'react-native';

export const icons = {
    Home: {
        regular: (props) => <Image source={require('../_assets/nav_icons/home.png')} style={{ width: 24, height: 24 }} {...props} />,
        filled: (props) => <Image source={require('../_assets/nav_icons/home_filled.png')} style={{ width: 24, height: 24 }} {...props} />,
    },
    Nutrition: {
        regular: (props) => <Image source={require('../_assets/nav_icons/nutrition.png')} style={{ width: 24, height: 24 }} {...props} />,
        filled: (props) => <Image source={require('../_assets/nav_icons/nutrition_filled.png')} style={{ width: 24, height: 24 }} {...props} />,
    },
    SymptomChecker: {
        regular: (props) => <Image source={require('../_assets/nav_icons/chat.png')} style={{ width: 24, height: 24 }} {...props} />,
        filled: (props) => <Image source={require('../_assets/nav_icons/chat_filled.png')} style={{ width: 24, height: 24 }} {...props} />,
    },
    Medication: {
        regular: (props) => <Image source={require('../_assets/nav_icons/meds.png')} style={{ width: 24, height: 24 }} {...props} />,
        filled: (props) => <Image source={require('../_assets/nav_icons/meds_filled.png')} style={{ width: 24, height: 24 }} {...props} />,
    },
    Profile: {
        regular: (props) => <Image source={require('../_assets/nav_icons/acc.png')} style={{ width: 24, height: 24 }} {...props} />,
        filled: (props) => <Image source={require('../_assets/nav_icons/acc_filled.png')} style={{ width: 24, height: 24 }} {...props} />,
    },
};
