import React, { ReactNode ,useState } from "react";
import '../components/ModalSignup.css'

export default function ModalSignup({onToggleModal}) {
    const [firstName, setfirstnameValue]=useState('');
    const [lastName, setlastnameValue]=useState('');
    const [account, setaccountValue]=useState('');
    const [passwd, setpasswdValue]=useState('');

    const [signupStatus, setSignupStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const newUser = { firstName, lastName, account, passwd };
        // console.log(firstname, lastname, account, passwd)
        console.log(newUser)
        console.log("Sending data:", JSON.stringify(newUser));
        try {
          const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
            
          });
          console.log(newUser)
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

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            <p className="h2">共同轉帳</p>
              <div className="col-md-6">
                  <label htmlFor="inputEmail4" className="form-label">姓</label>
                  <input 
                  value={firstName}
                  type="text" 
                  className="form-control"
                  onChange={(event)=>setfirstnameValue(event.target.value)}
                  />
              </div>
              <div className="col-md-6">
                <label htmlFor="inputEmail4" className="form-label">名</label>
                <input 
                value={lastName}
                type="text" 
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
                <label htmlFor="inputEmail4" className="form-label">密碼</label>
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
            <p>{signupStatus}</p>
          </div>
        </div>
    </>
  );
}
