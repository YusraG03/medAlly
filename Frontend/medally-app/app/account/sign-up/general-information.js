import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("Gender", { required: true })}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="datetime" placeholder="Date of Birth" {...register("Date of Birth", {required: true})} />
      <input type="number" placeholder="Weight" {...register("Weight", {required: true})} />
      <input type="number" placeholder="Height" {...register("Height", {required: true})} />

      <input type="submit" />
    </form>
  );
}