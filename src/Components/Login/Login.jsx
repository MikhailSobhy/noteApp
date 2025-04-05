import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { AuthContext } from '../../Context/AuthContext'

export default function Login() {
  const {token,setToken} = useContext(AuthContext)
  const navigate = useNavigate()
async function loginFn(values) {
try {
  const res = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
  console.log(res);
  localStorage.setItem('token', res.data.token)
  setToken(localStorage.getItem('token'))
  setTimeout(()=>{
    navigate('/')
  },500)
} catch (error) {
  console.log(error, 'Error from login function');
}
}

const schema = z.object({
  email: z.string().email("Email must be valid"),
  password: z.string().min(8,'Password must be at least 8')
})

const {register, handleSubmit, formState:{errors,isSubmitting}} = useForm({mode:"all", resolver: zodResolver(schema)})

  return <>
    <div className='flex justify-center h-screen items-center'>

    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(loginFn)}>

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
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isSubmitting?'Loading...':'Submit'}</button>

    </form>

    </div>
  </>
}
