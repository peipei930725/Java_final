import React, { ReactNode ,useState } from "react";
import './Add.css'
import { useAuth } from '../../AuthContext';

export default function AddTransfer({onToggleModal}) {
    const [transferName, SettransferName]=useState('')
    const [peopleCount, SetpeopleCount]=useState('')
    const [tradeAmount, SettradeAmount]=useState('')
    const {account} =useAuth()

    const [TransferStatus, setTransferStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const newTransfer = { account,transferName, peopleCount, tradeAmount}
        console.log(newTransfer)
    
        try {
          const response = await fetch('http://localhost:8080/api/transfer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTransfer)
          });
          const result = await response.json();
          if (result.success === "true") {
            setTransferStatus(result.message);
          } else {
            setTransferStatus(result.message);
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            setTransferStatus('請輸入正確參數');
          }else{
          setTransferStatus('NewTransfer failed: Server error');
          }
        }
      };

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            <p className="h2">建立轉帳</p>
            <form className="row g-3">
                <div className="md-6">
                  <label htmlFor="inputEmail4" className="form-label">轉帳名稱:</label>
                  <input 
                  value={transferName}
                  type="transferName" 
                  className="form-control"
                  placeholder="請輸入轉帳名稱" 
                  onChange={(event)=>SettransferName(event.target.value)}
                  />
                </div>
                <div className="md-6">
                  <label htmlFor="inputEmail4" className="form-label">人數:</label>
                  <input 
                  value={peopleCount}
                  type="peopleCount" 
                  className="form-control"
                  placeholder="請輸入人數" 
                  onChange={(event)=>SetpeopleCount(event.target.value)}
                  />
                </div>
              <div className="md-6">
                <label htmlFor="inputEmail4" className="form-label">金額:</label>
                <input 
                value={tradeAmount}
                type="tradeAmount" 
                className="form-control"
                placeholder="請輸入金額" 
                onChange={(event)=>SettradeAmount(event.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>建立轉帳</button>
                <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button>
              </div>
            </form>
            <p>{TransferStatus}</p>
          </div>
        </div>
    </>
  );
}
