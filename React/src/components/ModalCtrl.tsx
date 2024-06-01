import React, { useState } from 'react'
import ModalSignin from './ModalSignin'
import ModalSignup from './ModalSignup'

const ModalCtrl = () => {
  const[isSignup,setIsSignup]=useState(false)

  const handleToggleModal=()=>{
    setIsSignup(!isSignup)
  }

  return (
    <div>
    { isSignup ? (
      <ModalSignup onToggleModal={handleToggleModal} />
    ):(
      <ModalSignin onToggleModal={handleToggleModal} />
    )
    }
    </div>
  )
}

export default ModalCtrl