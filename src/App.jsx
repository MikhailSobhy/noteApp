import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import AuthContextProvider, { AuthContext } from './Context/AuthContext'
import ModalContextProvider from './Context/ModalContext'
import AuthGuard from './Components/AuthGuard/AuthGuard'
import Guard from './Components/Guard/Guard'
import Error from './Components/Error/Error'

const routes = createBrowserRouter([
  {path:'/', element: <Layout/>,children:[
    {index:true , element:<Guard><Home/></Guard>},
    {path:'login', element:<AuthGuard><Login/></AuthGuard>},
    {path:'register', element:<AuthGuard><Register/></AuthGuard>},
    {path:'*', element:<Error/>}

  ]}
])

export default function App() {
  return <>
  <AuthContextProvider>
    <ModalContextProvider>
       <RouterProvider router={routes}/>
    </ModalContextProvider>
  </AuthContextProvider>
  </>
}