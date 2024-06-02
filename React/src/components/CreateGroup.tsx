import React, { ReactNode ,useState } from "react";
import '../components/Add.css'

export default function CreateGroup({onToggleModal}) {
    const [GroupName, SetGroupName]=useState('')
    const [People, SetPeople]=useState('')

    const [CreateGroupStatus, SetCreateGroupStatus] = useState('');
    const handleSignupClick = async (event) => {
        event.preventDefault();
        const newGroup = { GroupName, People}
        // console.log(firstName, lastName, account, passwd)
        console.log(newGroup)
    
        try {
          const response = await fetch('http://localhost:8080/api/addGroup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newGroup)
          });
          const result = await response.json();
          if (result.success === "true") {
            SetCreateGroupStatus('AddGroup successful!');
          } else {
            SetCreateGroupStatus('AddGroup failed: ' + result.message);
          }
        } catch (error) {
          console.error('Error:', error);
          SetCreateGroupStatus('AddGroup failed: Server error');
        }
      };

  return (
    <>
        <div className="modal-overlay" >
          <div  className="modal-box">
            <p className="h2">建立群組</p>
            <form className="row g-3">
                <div className="md-6">
                  <label htmlFor="inputEmail4" className="form-label">群組名稱:</label>
                  <input 
                  value={GroupName}
                  type="GroupName" 
                  className="form-control"
                  placeholder="請輸入群組名稱" 
                  onChange={(event)=>SetGroupName(event.target.value)}
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
              <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={handleSignupClick}>建立群組</button>
                {/* <button type="button" className="btn btn-secondary" onClick={onToggleModal}>取消</button> */}
              </div>
            </form>
            <p>{CreateGroupStatus}</p>
          </div>
        </div>
    </>
  );
}