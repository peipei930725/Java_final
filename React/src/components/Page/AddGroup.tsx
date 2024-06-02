import React, { ReactNode ,useState } from "react";
import './Add.css'

export default function AddGroup({onToggleModal}) {
    const [GroupID, SetGroupID]=useState('')

    const [TransferStatus, setTransferStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const AddGroup = { GroupID }
        console.log(AddGroup)
    
        try {
          const response = await fetch('http://localhost:8080/api/transfer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AddGroup)
          });
          const result = await response.json();
          if (result.success === "true") {
            SetGroupID('NewTransfer successful!');
          } else {
            SetGroupID('NewTransfer failed: ' + result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          SetGroupID('NewTransfer failed: Server error');
        }
      };

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            <p className="h2">加入群組</p>
            <form className="row g-3">
                <div className="md-6">
                  <label htmlFor="inputEmail4" className="form-label">加入群組:</label>
                  <input 
                  value={GroupID}
                  type="TransferName" 
                  className="form-control"
                  placeholder="請輸入群組名稱" 
                  onChange={(event)=>SetGroupID(event.target.value)}
                  />
                </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>建立轉帳</button>
                {/* <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button> */}
              </div>
            </form>
            <p>{GroupID}</p>
          </div>
        </div>
    </>
  );
}
