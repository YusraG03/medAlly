import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import textStyles from '../../assets/textStyles';
import colors from '../../assets/colors';

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);
    
    return (
      <form style={styles.renderer} onSubmit={handleSubmit(onSubmit)}>
        <input style={styles.formWrapper} type="text" placeholder="First name" {...register("First name", {required: true, maxLength: 80})} />
        <input style={styles.formWrapper} type="text" placeholder="Last name" {...register("Last name", {required: true, maxLength: 100})} />
        <input style={styles.formWrapper} type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input style={styles.formWrapper} type="password" placeholder="Password" {...register("Password", {required: true})} />
        <input type="submit" />
      </form>
    );
  }

const styles = StyleSheet.create({
    renderer:{
      marginTop : '10%',
    },
  
    title: {
    fontSize: 14,
    letterSpacing: -0.1,
    lineHeight: 15,
    fontWeight: "600",
    fontFamily: "Inter-SemiBold",
    color: "#121419",
    textAlign: "left",
    alignSelf: "stretch"
    },
  
    formWrapper: {
    font : textStyles.contentText,
    paddingLeft: 15,
    borderRadius: 4,
    borderStyle: "solid",
    borderColor: "#dbdbdb",
    borderWidth: 1,
    height: 40, 
    marginTop: 6,
    alignSelf: "stretch",
    marginBottom : '2%'
  
    },
    global: {
      full:{
        marginHorizontal: '5%'
      },
      half:{
        width: '45%'
      },
    }
    });
    