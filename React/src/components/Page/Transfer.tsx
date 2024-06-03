import React, { useEffect, useState } from 'react';
import './Transfer.css';
import { useAuth } from '../../AuthContext';

interface Item {
    name: string;
    value: string;
}

function Transfer() {
    const [dataList, setDataList] = useState([]);
    const [dataList2, setDataList2] = useState([]);  // [groupName, money
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const { account } = useAuth();

    const handleAccept = (index) => {
        console.log('accept', index);
    };

    const handleReject = (index) => {
        console.log('reject', index);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/transfer/waitForTransfer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                account: account
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);  // 輸出返回的數據
            const groupName = data.groupName;
            const money = data.money;
            setDataList(prevDataList => [...prevDataList, { groupName, money }]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [account]);


    return (
        <div className="container1">
            <div className="section">
                <div className="section-header">待轉帳</div>
                {dataList && dataList.map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const moneys = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{moneys[i]}</div>
                            <div>
                                <button onClick={() => handleAccept(index)}>接受</button>
                                <button onClick={() => handleReject(index)}>拒絕</button>
                            </div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => setShowAll1(!showAll1)}>
                    {showAll1 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">待接受</div>
                {dataList && dataList.map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const moneys = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{moneys[i]}</div>
                            <div>
                                <button onClick={() => handleAccept(index)}>接受</button>
                                <button onClick={() => handleReject(index)}>拒絕</button>
                            </div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => setShowAll1(!showAll1)}>
                    {showAll1 ? 'see less' : 'see all'}
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