import React, { createContext, useState } from 'react'

export const ModalContext = createContext()

export default function ModalContextProvider({children}) {

    const [showModal,setShowModal] = useState(false)
    const [editing, setEditing] = useState(null)

  return <ModalContext.Provider value={{showModal, setShowModal, editing,setEditing}}>
    {children}
  </ModalContext.Provider>
}
