import React, { useState } from 'react';
import AddGroup from './AddGroup';
import AddTransfer from './AddTransfer';
import '../components/Add.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('');

  const handleButtonClick = (view) => {
    setCurrentView(view);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <div className="box">
        <div className="box-header">加入轉帳</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image1.png" alt="" onClick={() => handleButtonClick('AddTransfer')} />
            <p>輸入代碼</p>
          </div>
          <div className="icon-text">
            <img src="path-to-your-image2.png" alt="" onClick={() => handleButtonClick('AddTransfer')} />
            <p>掃描二維碼</p>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">快速建立轉帳</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image3.png" alt="" onClick={() => handleButtonClick('QuickTransfer')} />
            <p>建立轉帳</p>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">建立群組</div>
        <div className="box-content">
          <div className="icon-text">
            <img src="path-to-your-image4.png" alt="" onClick={() => handleButtonClick('AddGroup')} />
            <p>建立群組</p>
          </div>
          <div className="icon-text">
            <img src="path-to-your-image5.png" alt="" onClick={() => handleButtonClick('AddGroup')} />
            <p>加入群組</p>
          </div>
        </div>
      </div>
      
      {isModalOpen && currentView === 'AddTransfer' && (
        <Modal onClose={handleCloseModal}>
          <AddTransfer onToggleModal={handleCloseModal}/>
        </Modal>
      )}
      {isModalOpen && currentView === 'AddGroup' && (
        <Modal onClose={handleCloseModal}>
          <AddGroup onToggleModal={handleCloseModal}/>
        </Modal>
      )}
    </div>
  );
}

function Modal({ children, onClose }) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
        }}>
          {children}
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

export default App;