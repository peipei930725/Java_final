import React, { ReactNode, createContext, useContext, useState } from 'react';

interface AuthContextType{
    isLoggedIn: boolean
    login:(account:string)=>void
    logout:()=>void
    account: String|null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children:ReactNode}>=({children})=> {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [account,setaccount]=useState('')

    const login=(account:string)=>{
      setaccount(account);
      setIsLoggedIn(true)
    }
    const logout=()=>{
      setaccount('')
      setIsLoggedIn(false);
    }

    return (
      <AuthContext.Provider value={{isLoggedIn,login,logout,account}}>
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