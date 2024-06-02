import React, { useState,useRef } from 'react';
import AddGroup from './AddGroup';
import AddTransfer from './AddTransfer';
import '../components/Add.css';

function App() {
    const [currentView, setCurrentView] = useState('');
    const myRef = useRef(null);
  
    const handleButtonClick = (view) => {
      setCurrentView(view);
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    };

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">加入轉帳</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image1.png" alt="輸入代碼" onClick={() => handleButtonClick('AddTransfer')} />
            <p>輸入代碼</p>
          </div>
          <div className="icon-text">
            <img src="path-to-your-image2.png" alt="掃描二維碼" onClick={() => handleButtonClick('AddTransfer')} />
            <p>掃描二維碼</p>
          </div>
        </div>
      </div>

      <div className="box" ref={myRef}>
        <div className="box-header">快速建立轉帳</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image3.png" alt="建立轉帳" onClick={() => handleButtonClick('QuickTransfer')} />
            <p>建立轉帳</p>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">建立群組</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image4.png" alt="建立群組" onClick={() => handleButtonClick('AddGroup')} />
            <p>建立群組</p>
          </div>
          <div className="icon-text">
            <img src="path-to-your-image5.png" alt="加入群組" onClick={() => handleButtonClick('AddGroup')} />
            <p>加入群組</p>
          </div>
        </div>
      </div>

      {currentView === 'AddTransfer' && <AddTransfer onToggleModal={true}/>}
      {/* {currentView === 'QuickTransfer' && <QuickTransfer />} */}
      {currentView === 'AddGroup' && <AddGroup onToggleModal={true}/>}
    </div>
  );
}

export default App;