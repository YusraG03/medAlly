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
            <View style ={styles.header}>
            <Image 
                source={require('../../../assets/medAlly-logo/large.png')} 
                style={styles.logo}
            />
            <View style={styles.headertext}>
                <Text style={textStyles.screenTitle}>Welcome to MedAlly</Text>
                <Text style={textStyles.contentText}>Create your account within minutes to get started.</Text>
            </View>
            </View>
            

            <View style={styles.form}>
                <Controller
                    control={control}
                    rules={{ required: true, maxLength: 80 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="First name"
                        />
                    )}
                    name="firstName"
                />
                <Controller
                    control={control}
                    rules={{ required: true, maxLength: 100 }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Last name"
                        />
                    )}
                    name="lastName"
                />
                <Controller
                    control={control}
                    rules={{ required: true, pattern: /^\S+@\S+$/i }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            placeholder="Email"
                            keyboardType="email-address"
                        />
                    )}
                    name="email"
                />
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
                <TouchableOpacity
                    style={[
                        styles.formButton,
                        isFormValid() ? styles.nextButtonActive : styles.nextButtonDisabled
                    ]}
                    disabled={!isFormValid()}
                >
                    <Text style={styles.logIn}>Next</Text>
                </TouchableOpacity>
            </Link>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.defaultwhite,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    form: {
        width: '100%',
        marginTop: 20,
    },
    input: {
        height: 40,
        borderColor: '#dbdbdb',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 15,
        marginBottom: 10,
        width: '100%',
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
        color: colors.defaultwhite,
        fontSize: 18,
    },
    header: {
        alignItems: 'center',
        gap:0
    },
    headertext:{
        alignItems: 'center',
        gap: 6
    },
    
    logo: {
        width: 72,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 20,
    },
});