import React, { useContext, useEffect, useState } from 'react'
import { ModalContext } from '../../Context/ModalContext'
import { useForm } from 'react-hook-form'
import { IoClose } from "react-icons/io5";
import axios from 'axios'

export default function Modal({getNotes,editing,updateNote}) {
      const {showModal, setShowModal,setEditing} = useContext(ModalContext)
      const {register, handleSubmit, setValue} = useForm({mode:'all'})


    async function addNote(values) {
        
        try {
          if(editing){
            updateNote(editing._id,values)
          }else{
            const res = await axios.post('https://note-sigma-black.vercel.app/api/v1/notes',values,{headers:{
              token: '3b8ny__' + localStorage.getItem('token')
          }})
          console.log(res);
          setShowModal(false)
          getNotes()
          }

      } catch (error) {
          console.log(error,'Error from add note');
          
      }
      
    }


    useEffect(()=>{
      if(editing){
        setValue('title', editing.title)
        setValue('content', editing.content)
      }
    },[])

  return <>
  <div className='bg-gray-200 opacity-[0.98] fixed mx-auto inset-0 min-h-screen flex justify-center items-center '>
    <div className='flex w-[90%] md:w-[50%] mx-auto'>
      <form onSubmit={handleSubmit(addNote)} className='w-[100%] bg-white'>
       <div>
            <div className='flex justify-between p-3 bg-white'>
                 <h3 className='text-lg  font-bold'>{editing?'Update Note':'Add Note'}</h3>
                  <button onClick={()=>setShowModal(false)} className='text-lg'><IoClose /></button>
             </div>
             <div className=' flex flex-col border-y-2 border-gray-200 p-3'>
                <input className='focus:outline-none mb-3' {...register('title')} type="text" placeholder='Note Title ' />
                <textarea {...register('content')} id="content" placeholder='Write your thoughts here...' className='h-16 resize-none focus:outline-none'></textarea>
              </div>
            <div className='flex justify-end p-3'>  
               <button onClick={addNote} type='submit' className='text-sm border border-gray-300 p-1 rounded'>{editing?'Update Note':'Add Note'}</button>
            </div>
       </div>
      </form>
    </div>
  </div>
  </>
}
