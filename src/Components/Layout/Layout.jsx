import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <Sidebar/>
  <div className='pl-[90px] md:pl-[120px] py-[10px] pr-[10px] md:py-[40px] md:pr-[40px] dark:bg-gray-600 min-h-screen'>
  <Outlet/>
  </div>
  </>
}
