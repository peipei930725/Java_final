import React, { useEffect, useState } from 'react';
import './History.css';
import { useAuth } from '../../AuthContext';

interface Item {
    name: string;
    value: string;
}

function History() {
    const [dataList1, setDataList1] = useState([]);
    const [dataList2, setDataList2] = useState([]);
    const [dataList3, setDataList3] = useState([]);
    const [data1, setData1] = useState<Item[]>([]);
    const [data2, setData2] = useState<Item[]>([]);
    const [data3, setData3] = useState<Item[]>([]);
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [showAll3, setShowAll3] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const { account } = useAuth();

    const handleButtonClick = (view) => {
        setCurrentView(view);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/api/history/done`, {
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
            setDataList1(prevDataList => [...prevDataList, { groupName, money }]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [account]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/history/toBeTransfer`, {
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
            const count = data.count;
            setDataList2(prevDataList => [...prevDataList, { groupName, count }]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [account]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/history/toBeAccept`, {
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
            const count = data.count;
            setDataList3(prevDataList => [...prevDataList, { groupName, count }]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [account]);

    return (
        <div className="container1">
            <div className="section">
                <div className="section-header">Done</div>
                {dataList1 && dataList1.map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const moneys = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{moneys[i]}</div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => setShowAll1(!showAll1)}>
                    {showAll1 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">To be Transfered</div>
                {dataList2 && dataList2.map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const count = item.count.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{count[i]}</div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => setShowAll1(!showAll2)}>
                    {showAll2 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">To be Accepted</div>
                {dataList3 && dataList3.map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const count = item.count.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{count[i]}</div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => setShowAll1(!showAll3)}>
                    {showAll3 ? 'see less' : 'see all'}
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

export default History;