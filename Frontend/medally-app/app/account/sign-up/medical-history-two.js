import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'expo-router';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';


export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Any other conditions/injuries we should be aware of? " {...register("Any other conditions/injuries we should be aware of? ", {})} />
      <input type="text" placeholder="Any drug allergies?" {...register("Any drug allergies?", {})} />

      <input type="submit" />
      <Link href="./nutrition-habits" asChild>
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
     </Link>
    </form>
  );
}