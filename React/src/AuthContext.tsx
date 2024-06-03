import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType{
    isLoggedIn: boolean
    login:(account0:string| null)=>void
    logout:()=>void
    account: string |null
    colormode: 'dark'|'light'
    setColor:(color:'dark'|'light')=>void
    changeColor:()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children:ReactNode}>=({children})=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [account,setaccount]=useState('')
    const [colormode,setColorMode]=useState<'dark'|'light'>('light')

    const login=(account0:string|null)=>{
      if(account0) setaccount(account0);
      setIsLoggedIn(true)
    }
    const logout=()=>{
      localStorage.clear()
      setaccount('')
      setIsLoggedIn(false);
    }
    
    const changeColor=()=>{
      if(colormode=='light'){
        localStorage.setItem('colormode','dark')
        setColorMode('dark')
      }
      else 
      {
        localStorage.setItem('colormode','light')
        setColorMode('light')
      }
    }
    
    const setColor=(color:'dark'|'light')=>{
      localStorage.setItem('colormode',color);
      setColorMode(color);
    }

    return (
      <AuthContext.Provider value={{isLoggedIn,login,logout,account,colormode,changeColor,setColor}}>
        {children}
      </AuthContext.Provider>  
    );
}

export const useAuth=()=>{
    const context =useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be use within an AuthPrpvider');
    }
    return context
}