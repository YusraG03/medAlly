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
      <select {...register("Do you have any blood pressure problems?", { required: true })}>
        <option value="None">None</option>
        <option value="Hypertension">Hypertension</option>
        <option value="Hypotension">Hypotension</option>
      </select>
      <select {...register("Do you have any cardiovascular problems?", { required: true })}>
        <option value="Abnormal heart rhythms, or arrhythmias">Abnormal heart rhythms, or arrhythmias</option>
        <option value="Aorta disease and Marfan syndrome">Aorta disease and Marfan syndrome</option>
        <option value="Congenital heart disease">Congenital heart disease</option>
        <option value="Coronary artery disease (narrowing of the arteries)">Coronary artery disease (narrowing of the arteries)</option>
        <option value="Deep vein thrombosis and pulmonary embolism">Deep vein thrombosis and pulmonary embolism</option>
        <option value="Heart attack">Heart attack</option>
        <option value="Heart failure">Heart failure</option>
        <option value="Heart muscle disease (cardiomyopathy)">Heart muscle disease (cardiomyopathy)</option>
        <option value="Heart valve disease">Heart valve disease</option>
        <option value="Pericardial disease">Pericardial disease</option>
        <option value="Peripheral vascular disease">Peripheral vascular disease</option>
        <option value="Rheumatic heart disease">Rheumatic heart disease</option>
        <option value="Stroke Vascular disease (blood vessel disease)">Stroke Vascular disease (blood vessel disease)</option>
      </select>
      <select {...register("Do you have any cholesterol problems?")}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select {...register("Do you have any diabetes problems?", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <input type="text" placeholder="Do you have any injuries/orthopedic problems?" {...register("Do you have any injuries/orthopedic problems?", {})} />
      <input type="text" placeholder="Any past history of surgeries?" {...register("Any past history of surgeries?", {})} />

      <input type="submit" />
      <Link href="./medical-history-two" asChild>
                <TouchableOpacity>
                    <Text>Next</Text>
                </TouchableOpacity>
     </Link>
    </form>
  );
}