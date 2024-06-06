import  { useState } from "react";
import '../components/ModalSignin.css'
import { useAuth } from "../AuthContext";

export default function ModalSignin({onToggleModal}) {
    const [passwd, setpasswdValue]=useState('')
    const [account, setaccountValue]=useState('')
    const {login}=useAuth();
    // const {account}=useAuth();

    const [loginStatus, setLoginStatus] = useState('');

    const handleLoginClick = async (event) => {
      event.preventDefault();
      const User = { account, passwd };
      console.log(User);
      
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(User)
        });
        
        const result = await response.json();
        if (result.success === "true") {
          login(account);
          localStorage.setItem("account",account);
          setLoginStatus(result.message);
          onToggleModal();
        } else {
          setLoginStatus(result.message);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoginStatus('Login failed: Server error');
      }
    }

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
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
            <div className="col-12">
                <button type="button" className="btn btn-outline-success" onClick={handleLoginClick}>登入</button> 
            </div>
            <p>{loginStatus}</p>
            <p className="Signup">還沒有帳號嗎？點此<button type="button" className="btn btn-link" onClick={onToggleModal}>註冊帳號</button></p>
          </div>
        </div>
        
        
    </>
  );
}
