import React, { ReactNode ,useState } from "react";
import '../components/Modal.css'
//import useModal from "./useModal";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function ModalSignin(props: ModalType) {
    const [passwd, setpasswdValue]=useState('')
    const [account, setaccountValue]=useState('')
    
    const handleclick=(event)=>{
      event.preventDefault()
      const student={account,passwd}
      console.log(student)
      fetch("http://localhost:8080/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)
      }).then(()=>{
        console.log("New account added")
      })
    }

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            {props.children}
            <p className="h2">共同轉帳</p>
            <div className="form-floating mb-3">
                <input 
                value={account}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                onChange={(event)=>setaccountValue(event.target.value)}
                />
                <label htmlFor="floatingInput">帳號</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                value={passwd}
                type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                onChange={(event)=>setpasswdValue(event.target.value)}
                />
                <label htmlFor="floatingPassword">密碼</label>
            </div>
            <div className="button">
                <button type="button" className="btn btn-outline-success" onClick={handleclick}>登入</button> 
                <hr/>
            </div>
            <p className="Signup">還沒有帳號嗎？點此<button type="button" className="btn btn-link" >註冊帳號</button></p>
          </div>
        </div>
        
        
    </>
  );
}
