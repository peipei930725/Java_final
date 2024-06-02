import React, { ReactNode ,useState } from "react";
import '../components/Add.css'

export default function AddTransfer({onToggleModal}) {
    const [TransferName, SetTransferName]=useState('')
    const [People, SetPeople]=useState('')
    const [Money, SetMoney]=useState('')

    const [TransferStatus, setTransferStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const newTransfer = { TransferName, People, Money}
        console.log(newTransfer)
    
        try {
          const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTransfer)
          });
          const result = await response.json();
          if (result.success === "true") {
            setTransferStatus('NewTransfer successful!');
          } else {
            setTransferStatus('NewTransfer failed: ' + result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          setTransferStatus('NewTransfer failed: Server error');
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
                  value={TransferName}
                  type="TransferName" 
                  className="form-control"
                  placeholder="請輸入轉帳名稱" 
                  onChange={(event)=>SetTransferName(event.target.value)}
                  />
                </div>
                <div className="md-6">
                  <label htmlFor="inputEmail4" className="form-label">人數:</label>
                  <input 
                  value={People}
                  type="People" 
                  className="form-control"
                  placeholder="請輸入人數" 
                  onChange={(event)=>SetPeople(event.target.value)}
                  />
                </div>
              <div className="md-6">
                <label htmlFor="inputEmail4" className="form-label">金額:</label>
                <input 
                value={Money}
                type="Money" 
                className="form-control"
                placeholder="請輸入金額" 
                onChange={(event)=>SetMoney(event.target.value)}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>建立轉帳</button>
                {/* <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button> */}
              </div>
            </form>
            <p>{TransferStatus}</p>
          </div>
        </div>
    </>
  );
}
