import React, { useEffect, useState } from 'react';
import './Transfer.css';
import { useAuth } from '../../AuthContext';

interface Item {
    name: string;
    value: string;
}

function Transfer() {
    const [data1, setData1] = useState<Item[]>([]);
    const [data2, setData2] = useState<Item[]>([]);
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const { account } = useAuth();

    // const handleAccept = (index) => {
    //     console.log('accept', index);
    // };

    // const handleReject = (index) => {
    //     console.log('reject', index);
    // };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (account) {
          fetch(`http://localhost:8080/api/account/${account}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => setData1(data))
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
        }
      }, [account]);

      useEffect(() => {
        if (account) {
          fetch(`http://localhost:8080/api/account/${account}`)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => setData2(data))
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
        }
      }, [account]);

    return (
        <div className="container1">
            <div className="section">
                <div className="section-header">待轉帳</div>
                <ul className="section-content">
                    {(showAll1 ? data1 : data1.slice(0, 2)).map((item, index) => (
                        <li key={index}>
                            {item.name} <span>{item.value}</span>
                            {/* <button onClick={() => handleAccept(index)}>接受</button>
                            <button onClick={() => handleReject(index)}>拒絕</button> */}
                        </li>
                    ))}
                </ul>
                <div className="section-footer" onClick={() => setShowAll1(!showAll1)}>
                    {showAll1 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">待接受</div>
                <ul className="section-content">
                    {(showAll2 ? data2 : data2.slice(0, 2)).map((item, index) => (
                        <li key={index}>
                            {item.name} <span>{item.value}</span>
                            {/* <button onClick={() => handleAccept(index)}>接受</button>
                            <button onClick={() => handleReject(index)}>拒絕</button> */}
                        </li>
                    ))}
                </ul>
                <div className="section-footer" onClick={() => setShowAll2(!showAll2)}>
                    {showAll2 ? 'see less' : 'see all'}
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                    <h1>{currentView}</h1>
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

export default Transfer;