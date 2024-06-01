import React, { ReactNode ,useState } from "react";
import '../components/ModalSignup.css'

export default function ModalSignup({onToggleModal}) {
    const [firstname, setfirstnameValue]=useState('')
    const [lastname, setlastnameValue]=useState('')
    const [account, setaccountValue]=useState('')
    const [passwd, setpasswdValue]=useState('')

<<<<<<< HEAD
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
=======
    const [signupStatus, setSignupStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const newUser = { firstname,lastname, account, passwd}
        console.log(newUser)
    
        try {
          const response = await fetch('http://localhost:8080/api/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
          });
          const result = await response.json();
          if (result.success) {
            setSignupStatus('Signup successful!');
          } else {
            setSignupStatus('Signup failed: ' + result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          setSignupStatus('Signup failed: Server error');
        }
      };
>>>>>>> 1b32e0150ac083ed2a8d60aa90a25cf176eb4dd1

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
                <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>註冊</button>
              </div>
            </form>
            <p>{signupStatus}</p>
          </div>
        </div>
    </>
  );
}
