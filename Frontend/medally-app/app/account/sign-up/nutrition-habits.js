import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("Are you Non Veg, Veg or Vegan? (3 Choices)", { required: true })}>
        <option value="Non Veg">Non Veg</option>
        <option value="Veg">Veg</option>
        <option value="Vegan? (3 Choices)">Vegan? (3 Choices)</option>
      </select>
      <input type="text" placeholder="Do you have any food allergies?" {...register("Do you have any food allergies?", {})} />
      <input type="text" placeholder="Any food you avoid for personal reason? " {...register("Any food you avoid for personal reason? ", {})} />

      <input type="submit" />
    </form>
  );
}