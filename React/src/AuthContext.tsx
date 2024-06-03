import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType{
    isLoggedIn: boolean
    login:(account:string)=>void
    logout:()=>void
    Account: String|null
    colormode: 'dark'|'light'
    changeColor:()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children:ReactNode}>=({children})=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [Account,setaccount]=useState('')
    const [colormode,setColorMode]=useState<'dark'|'light'>('light')

    const login=(account:string)=>{
      setaccount(account);
      setIsLoggedIn(true)
    }
    const logout=()=>{
      setaccount('')
      setIsLoggedIn(false);
    }
    
    const changeColor=()=>{
      if(colormode=='light') setColorMode('dark')
      else setColorMode('light')
    }

    return (
      <AuthContext.Provider value={{isLoggedIn,login,logout,Account,colormode,changeColor}}>
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