import React, { ReactNode ,useState } from "react";
import '../components/ModalSignup.css'
//import useModal from "./useModal";

//Signup 跟 Signin 還沒連動
export default function ModalSignup({onToggleModal}) {
    const [firstname, setfirstnameValue]=useState('')
    const [lastname, setlastnameValue]=useState('')
    const [account, setaccountValue]=useState('')
    const [passwd, setpasswdValue]=useState('')

    const handleclick=(event)=>{
      event.preventDefault()
      const student={firstname,lastname,account,passwd}
      console.log(student)
      fetch("http://localhost:8080/api/register",{
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
            <p className="h2">共同轉帳</p>
            <form className="row g-3">
              <div className="col-md-6">
                  <label htmlFor="inputFirstName4" className="form-label">姓</label>
                  <input 
                  value={firstname}
                  type="account" 
                  className="form-control"
                  onChange={(event)=>setfirstnameValue(event.target.value)}
                  />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputLastName4" className="form-label">名</label>
                <input 
                value={lastname}
                type="account" 
                className="form-control"
                onChange={(event)=>setlastnameValue(event.target.value)}
                />
              </div>
              <div className="md-6">
                <label htmlFor="inputEmail4" className="form-label">帳號</label>
                <input 
                value={account}
                type="account" 
                className="form-control"
                onChange={(event)=>setaccountValue(event.target.value)}
                />
              </div>
              <div className="md-6">
                <label htmlFor="inputPassword4" className="form-label">密碼</label>
                <input 
                value={passwd}
                type="password" 
                className="form-control" 
                id="inputPassword4"
                onChange={(event)=>setpasswdValue(event.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleclick}>註冊</button>
              </div>
            </form>
          </div>
        </div>
    </>
  );
}
