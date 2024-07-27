import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useForm, Controller } from 'react-hook-form';
import textStyles from '../../../assets/textStyles';
import colors from '../../../assets/colors';

export default function App() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <View style={styles.container}>
             {/* Screen Header*/} 
            <View style ={styles.header}>
            <Image 
                source={require('../../../assets/medAlly-logo/large.png')} 
                style={styles.logo}
            />
            <View style={styles.headertext}>
                <Text style={styles.screenTitle}>Welcome to MedAlly</Text>
                <Text style={styles.contentText}>Create your account within minutes to get started.</Text>
            </View>
            </View>
            

            <View style={styles.form}>
                <View style ={styles.name}>
                <View style = {styles.formItem.half}>
                    <Text style={styles.formHeader}>First Name</Text>
                    <Controller
                    control={control}
                    rules={{ required: true, maxLength: 80 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="e.g Jean"
                        />
                    )}
                    name="firstName"
                    />
                </View>
                
                <View style = {styles.formItem.half}>
                    <Text style={styles.formHeader}>Last Name</Text>
                    <Controller
                        control={control}
                        rules={{ required: true, maxLength: 100 }}
                        render={({ field: { onChange, onBlur, value } }) => (
                         <TextInput
                             style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="e.g Dookhit"
                            />
                        )}
                    name="lastName"
                    />                   
                </View>
                </View>

                
                <View style = {styles.formItem.full}>
                    <Text style={styles.formHeader}>Email</Text>
                    <Controller
                        control={control}
                        rules={{ required: true, pattern: /^\S+@\S+$/i }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                placeholder="user@email.com"
                                keyboardType="email-address"
                            />
                        )}
                    name="email"
                    />
                </View>           

                <View style = {styles.formItem.full}>
                    <Text style={styles.formHeader}>Password</Text>
                        <Controller
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.input}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    placeholder="Password"
                                    secureTextEntry
                            />
                     )}
                    name="password"
                    />
                </View>
                
                <Link href="./general-information" asChild>
            <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
            </Link>

            <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultwhite,
        justifyContent: 'center',
    },
    screenTitle: {
        alignSelf: "stretch",
        fontSize: 24,
        letterSpacing: -0.7,
        lineHeight: 24,
        fontWeight: "800",
        fontFamily: "Inter-ExtraBold",
        color: "#121419",
        textAlign: "center"
    },
    contentText: {
        alignSelf: "stretch",
        fontSize: 14,
        letterSpacing: -0.6,
        lineHeight: 16,
        fontFamily: "Inter-Regular",
        color: "#4f4f4f",
        textAlign: "center"
    },
    formHeader: {
        alignSelf: "stretch",
        fontSize: 14,
        letterSpacing: -0.1,
        lineHeight: 20,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#121419",
        textAlign: "left"
        },
    form: {
        flexDirection: 'column',
        marginTop: '10%',
        marginHorizontal : '5%',
        gap: '5%'
    },
    formItem:{
        full:{
            width: '100%'
        },
        half:{
            width: '49%'
        }
    },
    name:{
        flexDirection : 'row',
        gap : '2%',
        width: '100%'
    },
    
    input: {

        height: 40,
        borderColor: '#dbdbdb',
        fontSize: 16,
        letterSpacing: -0.2,
        lineHeight: 17,
        fontFamily: "Inter-Regular",
        color: "#7d7d7d",
        textAlign: "left",
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 15,
        marginBottom: 10
    },

    button: {
        backgroundColor: colors.defaultblack,
        padding: 10,
        borderRadius: 6,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        letterSpacing: 0,
        lineHeight: 18,
        fontWeight: "600",
        fontFamily: "Inter-SemiBold",
        color: "#f7f7f7",
    },
    header: {
        alignItems: 'center',
        gap:0
    },
    headertext:{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6
    },
    
    logo: {
        width: 72,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});