import React, { ReactNode ,useState } from "react";
import { useAuth } from "../../AuthContext";
import { Modaloverlay } from "../Theme";

export default function AddID({onToggleModal}) {
    const [transferId, setTransferId]=useState('')
    const {account,colormode} =useAuth()

    const [IDStatus, setIDStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const AddID = { account,transferId }
        console.log(AddID)
    
        try {
          const response = await fetch('http://localhost:8080/api/addTransfer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AddID)
          });
          const result = await response.json();
          if (result.success === "true") {
            setIDStatus(result.message);
          } else {
            setIDStatus(result.message);
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            setIDStatus('請輸入正確參數');
          }else{
          console.error('Error:', error);
          setIDStatus('NewTransfer failed: Server error');
          }
        }
      };

    return (
      <>
          <Modaloverlay >
            <div  className="modal-box">
              <p className="h2">加入交易</p>
              <form className="row g-3">
                  <div className="md-6">
                    <label htmlFor="inputEmail4" className="form-label">加入交易:</label>
                    <input 
                    value={transferId}
                    type="transferId" 
                    className="form-control"
                    placeholder="請輸入交易ID" 
                    onChange={(event)=>setTransferId(event.target.value)}
                    />
                  </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>加入</button>
                  <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button>
                </div>
              </form>
              <p>{IDStatus}</p>
            </div>
          </Modaloverlay>
      </>
    );
}
