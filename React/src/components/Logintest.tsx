import React, { Fragment, useState } from 'react'

const Logintest = () => {
  const [passwd, setpasswdValue]=useState('')
  const [account, setaccountValue]=useState('')
  const handleclick=(event)=>{
    event.preventDefault()
    const student={account,passwd}
    console.log(student)
    //傳給spring boot 連結是資料庫的網址
    fetch("http://localhost:8080",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(student)
    }).then(()=>{
      console.log("New account added")
    })
  }
  return (
    <Fragment>
    <label htmlFor="inputPassword5" className="form-label">Account</label>
    <input 
    value={account}
    className="form-control" 
    type="text" 
    placeholder="" 
    aria-label="default input example"
    onChange={(event)=>setaccountValue(event.target.value)}
    >

    </input>
    <label htmlFor="inputPassword5" className="form-label">Password</label>
    <input 
    value={passwd}
    type="password" id="inputPassword5" 
    className="form-control" 
    aria-describedby="passwordHelpBlock"
    onChange={(event)=>setpasswdValue(event.target.value)}
    />
    <div id="passwordHelpBlock" className="form-text">
      Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
    </div>

    <button type="button" className="btn btn-primary" onClick={handleclick}>Submit</button>
    </Fragment>
  );
}

export default Logintest