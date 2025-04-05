import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'


export default function Register() {
  const navigate = useNavigate()
  async function registerFn (values) {
    try {
        const res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
        console.log(res);
        setTimeout(()=>{
          navigate('/login')
        },2000)
            
    } catch (error) {
        console.log(error,'Error from register function');
    }
}

  const schema = z.object({
    name: z.string().min(3,'name must be at least 3 letters'),
    email: z.string().email("Email must be valid"),
    password: z.string().min(8,'Password must be at least 8'),
    age: z.coerce.number().min(18).max(70),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, 'Phone must be egyptian number')
  })

const {register, handleSubmit, formState:{errors}} = useForm({mode:"all", resolver: zodResolver(schema)})

  return <>
      <div className='flex justify-center h-screen items-center'>
      
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(registerFn)}>
          <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
    <input type="text" id="name" {...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
  {errors.name?<div className='text-red-500 text-sm'>{errors.name.message}</div>:''}
           </div>
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input type="email" id="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
    {errors.email?<div className='text-red-500 text-sm'>{errors.email.message}</div>:''}
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input type="password" id="password" {...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
     {errors.password?<div className='text-red-500 text-sm'>{errors.password.message}</div>:''}
  </div>
  <div className="mb-5">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your age</label>
    <input type="text" id="age" {...register('age')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
     {errors.age?<div className='text-red-500 text-sm'>{errors.age.message}</div>:''}
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input type="tel" id="phone" {...register('phone')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
     {errors.phone?<div className='text-red-500 text-sm'>{errors.phone.message}</div>:''}
  </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    </div>
  </>
}
