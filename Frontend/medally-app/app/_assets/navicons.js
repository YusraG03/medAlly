import { AntDesign, Feather } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export const icons = {
    Home: (props)=> <Feather name="home" size={24} color="black" />,
    Nutrition: (props)=><MaterialCommunityIcons name="silverware-fork-knife" size={24} color="black" />,
    Checker: (props)=> <FontAwesome5 name="vector-square" size={24} color="black" />,
    Medication: (props)=> <AntDesign name="link" size={24} color="black" />,
    Profile: (props)=><Feather name="user" size={24} color="black" />,
}

