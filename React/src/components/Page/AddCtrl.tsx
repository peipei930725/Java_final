import React, { useState } from 'react';
import AddGroup from './AddGroup';
import AddTransfer from './AddTransfer';
import CreateGroup from './CreateGroup';
import AddID from './AddID';
import './Add.css';

import BorderColorIcon from '@mui/icons-material/BorderColor';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Groups2Icon from '@mui/icons-material/Groups2';

function AddCtrl() {
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
          <div className="icon-text" onClick={() => handleButtonClick('AddID')}>
            <KeyboardIcon sx={{fontSize:'80px'}}  />
            <p>輸入代碼</p>
          </div>
          <div className="icon-text" onClick={handleButtonClick}>
            <QrCode2Icon sx={{fontSize:'80px'}}  />
            <p>掃描二維碼</p>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">快速建立轉帳</div>
        <div className="box-content">
          <div className="icon-text">
            <BorderColorIcon sx={{fontSize:'80px'}} onClick={() => handleButtonClick('AddTransfer')} />
            <p>建立轉帳</p>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="box-header">建立群組</div>
        <div className="box-content">
          <div className="icon-text" onClick={() => handleButtonClick('CreateGroup')}>
          <Groups2Icon sx={{fontSize:'80px'}}  />
            <p>建立群組</p>
          </div>
          <div className="icon-text"onClick={() => handleButtonClick('AddGroup')}>
            <GroupAddIcon sx={{fontSize:'80px'}}  />
            <p>加入群組</p>
          </div>
        </div>
      </div>

      {isModalOpen && currentView === 'AddID' && (
        <Modal onClose={handleCloseModal}>
          <AddID onToggleModal={handleCloseModal}/>
        </Modal>
      )}
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
        {isModalOpen && currentView === 'CreateGroup' && (
            <Modal onClose={handleCloseModal}>
            <CreateGroup onToggleModal={handleCloseModal}/>
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

export default AddCtrl;