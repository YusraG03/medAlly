import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("How many times do you exercise per week?")}>
        <option value="None (0 Times per week)">None (0 Times per week)</option>
        <option value="Slightly Active (1-2 Times per week)">Slightly Active (1-2 Times per week)</option>
        <option value="Moderately Active (3-4 Times per week)">Moderately Active (3-4 Times per week)</option>
        <option value="Highly Active (5-6 Times per week)">Highly Active (5-6 Times per week)</option>
      </select>
      <select {...register("How often do you consume alcohol?")}>
        <option value="None (0 Times per week)">None (0 Times per week)</option>
        <option value="Sometimes (1-2 Times per week)">Sometimes (1-2 Times per week)</option>
        <option value="Often (3-4 Times per week)">Often (3-4 Times per week)</option>
        <option value="A Lot (>5 Times per week)">A Lot (5 Times per week)</option>
      </select>
      <select {...register("How often do you smoke?")}>
        <option value="None (0 Times per week)">None (0 Times per week)</option>
        <option value="Sometimes (1-2 Times per week)">Sometimes (1-2 Times per week)</option>
        <option value="Often (3-4 Times per week)">Often (3-4 Times per week)</option>
        <option value="A Lot (>5 Times per week)">A Lot (5 Times per week)</option>
      </select>
      <select {...register("How often do you drink coffee?", { required: true })}>
        <option value="None (0 Times per week)">None (0 Times per week)</option>
        <option value="Sometimes (1-2 Times per week)">Sometimes (1-2 Times per week)</option>
        <option value="Often (3-4 Times per week)">Often (3-4 Times per week)</option>
        <option value="A Lot (>5 Times per week)">A Lot (5 Times per week)</option>
      </select>
      <input type="text" placeholder="Do you do any other substances?" {...register("Do you do any other substances?", {})} />
      <select {...register("Do you have problem sleeping?", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
      <select {...register("Are you currently/post partum pregnant? ", { required: true })}>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <input type="submit" />
    </form>
  );
}