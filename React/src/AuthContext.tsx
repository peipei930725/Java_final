import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType{
    isLoggedIn: boolean
    login:(account:string)=>void
    logout:()=>void
    Account: String|null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children:ReactNode}>=({children})=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [Account,setAccount]=useState('')

    const login=(account:string)=>{
      setAccount(account);
      setIsLoggedIn(true)
    }
    const logout=()=>{
      setAccount('')
      setIsLoggedIn(false);
    }

    return (
      <AuthContext.Provider value={{isLoggedIn,login,logout,Account}}>
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