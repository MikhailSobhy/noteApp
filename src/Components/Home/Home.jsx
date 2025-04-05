import React, { useContext, useEffect, useState } from 'react'
import Modal from '../Modal/Modal'
import { ModalContext } from '../../Context/ModalContext'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import axios from 'axios'

export default function Home() {
  const {showModal, setShowModal,editing,setEditing} = useContext(ModalContext)
  const [notes,setNotes] = useState([])
  
  async function getNotes() {
      try {
        const res = await axios.get('https://note-sigma-black.vercel.app/api/v1/notes',{headers:{
          token: '3b8ny__' + localStorage.getItem('token')
        }})
        console.log(res);
        if (res.data.notes && res.data.notes.length > 0) {
          setNotes(res.data.notes);
        } else {
          setNotes([]);
        }
        
      } catch (error) {
        console.log(error, 'Error from get notes');
        if (error.response.status == 404) {
          setNotes([]); 
        }
        
      }
  }
    async function deleteNote(id) {
        try {
          const res = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{headers:{
            token : '3b8ny__' + localStorage.getItem('token')
          }})      
          console.log(res);
            getNotes()
        } catch (error) {
          console.log(error, 'Error from delete note');
          
        }
        
    }
    async function updateNote(id,values) {
      try {
        const res = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${id}`,values,{headers:{
          token: '3b8ny__' + localStorage.getItem('token')
        }})
        console.log(res);
        getNotes()
        setShowModal(false)
      } catch (error) {
        console.log(error, 'Error from update note');
        
      }
    }

    function handleUpdate(note){
      setShowModal(true)
      setEditing(note)
    }

     useEffect(()=>{
        getNotes()
  },[])


  return <>

  
  {notes.length>0?<h1 className='text-2xl font-bold mb-3 ml-1'>Notes</h1>:<div className='w-full md:w-[80%] mx-auto md:h-[200px] h-[100px] md:py-5 md:px-10 py-3 px-6 bg-gray-200 text-sm md:text-2xl items-center flex justify-center'>You Have not Notes</div>}
  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
    {notes.map((note)=>{return <div key={note._id}>
        <div className='col-span-1 w-full md:h-[300px] h-[200px] bg-gray-200 border rounded-[10px] p-3 flex flex-col justify-between '>
        <div className='break-words overflow-hidden'>
          <h3 className='font-bold mb-4'>{note.title}</h3>
          <p>{note.content}</p>
        </div>
          <div className='flex justify-between mt-3'>
            <button className='text-xl p-1 rounded-[50%] bg-black text-white' onClick={()=>deleteNote(note._id)}><MdDelete /></button>
            <button onClick={()=>handleUpdate(note)} className='text-xl p-1 rounded-[50%] bg-black text-white'><CiEdit /></button>
          </div>
        </div>
    </div>})}
  </div>
    {showModal?<Modal updateNote={updateNote} editing={editing} getNotes={getNotes}/>:''}
  </>
}