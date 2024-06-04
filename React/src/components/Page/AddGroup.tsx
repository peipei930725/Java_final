import React, { ReactNode ,useState } from "react";
import './Add.css'
import { useAuth } from "../../AuthContext";

export default function AddGroup({onToggleModal}) {
    const [groupName, SetgroupName]=useState('')
    const {account,colormode} =useAuth()

    const [addGroupStatus, setAddGroupStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const AddGroup = { account,groupName }
        console.log(AddGroup)
    
        try {
          const response = await fetch('http://localhost:8080/api/addGroup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(AddGroup)
          });
          const result = await response.json();
          if (result.success === "true") {
            setAddGroupStatus(result.message);
          } else {
            setAddGroupStatus(result.message);
          }
        } catch (error) {
          if (error instanceof SyntaxError) {
            setAddGroupStatus('請輸入正確參數');
          }else{
          console.error('Error:', error);
          setAddGroupStatus('NewTransfer failed: Server error');
          }
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
                    value={groupName}
                    type="groupName" 
                    className="form-control"
                    placeholder="請輸入群組名稱" 
                    onChange={(event)=>SetgroupName(event.target.value)}
                    />
                  </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>加入群組</button>
                  <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button>
                </div>
              </form>
              <p>{addGroupStatus}</p>
            </div>
          </div>
      </>
    );
}
