import React, { useState ,useEffect, useContext } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { BsPersonAdd } from "react-icons/bs";
import { IoMdLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { CiSun } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { ModalContext } from "../../Context/ModalContext";

export default function Sidebar() {
    const {showModal, setShowModal,setEditing} = useContext(ModalContext)
  const navigate = useNavigate()
  const {token,setToken} = useContext(AuthContext)

  const [darkMode,setDarkMode] = useState(localStorage.getItem('dark'))
  const [addNote, setAddNote] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark', darkMode)
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('dark')

    }
  }, [darkMode]);

function logout(){
  localStorage.removeItem('token')
  setToken(null)
  navigate('/login')
  
}

  return <>
      <div className=" w-[80px] h-screen fixed top-0 bottom-0 left-0 border-r-2 grid grid-rows-12 dark:bg-gray-800">
        <div className="flex justify-center items-center border-b-2 row-span-1 dark:text-white">
          <p>Docket</p>
        </div>
        <div className="flex flex-col items-center row-span-10 py-5">
          <div className="flex justify-center items-center flex-col">
            {token?<button onClick={()=>setAddNote(!addNote)}><IoIosAddCircle className={`text-2xl ${addNote?'rotate-45':''} transition-all dark:text-white`} /></button>:''}
            {addNote&&token?<button onClick={()=>{setShowModal(!showModal)
              setEditing(null)
            }} className="bg-black dark:bg-gray-500 text-xs mt-2 rounded-md p-1 text-white">New Note</button>:''}
            {token?'':<>
              <Link to={'/login'}><IoMdLogIn className="text-2xl my-4 dark:text-white"/></Link>
              <Link to={'/register'}><BsPersonAdd className="text-2xl dark:text-white"/></Link>
            </>}
          </div>
         {token? <div className="mt-auto">
            <button onClick={logout}><CiLogout className="text-2xl dark:text-white"/></button>
          </div>:''}
        </div>
        <div className="row-span-1 border-t-2 flex justify-center items-center">

          <button onClick={()=>setDarkMode(!darkMode)}>
            {darkMode?<CiSun className="text-2xl dark:text-white"/>:<FaMoon className="text-2xl"/>}
          </button>
          
        </div>
      </div>
    </>
}