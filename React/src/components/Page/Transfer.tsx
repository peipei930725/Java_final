import React, { useEffect, useState ,useRef} from 'react';
import './Transfer.css';
import { useAuth } from '../../AuthContext';

interface Item {
    name: string;
    value: string;
}

function Transfer() {
    const [dataList1, setDataList1] = useState([]);
    const [dataList2, setDataList2] = useState([]);  // [groupName, money
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const { account } = useAuth();
    const fetchedRef1 = useRef(false);
    const fetchedRef2 = useRef(false);

    function handleAcceptTransfer(groupName) {
        fetch('http://localhost:8080/api/acceptTransfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: groupName,
                account: account  // 將 account 加入到請求體中
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
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    function handleAccept(groupName) {
        fetch('http://localhost:8080/api/accept', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: groupName,
                account: account  // 將 account 加入到請求體中
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
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
    
    function handleReject(groupName) {
        fetch('http://localhost:8080/api/reject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupName: groupName,
                account: account  // 將 account 加入到請求體中
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
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleShowAll1 = () => {
        setShowAll1(!showAll1);
        setIsModalOpen1(true);
    };

    const handleShowAll2 = () => {
        setShowAll2(!showAll2);
        setIsModalOpen2(true);
    };

    const handleCloseModal1 = () => {
        setIsModalOpen1(false);
    };

    const handleCloseModal2 = () => {
        setIsModalOpen2(false);
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
            setDataList1(prevDataList => [...prevDataList, { groupName, money }]);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }, [account]);

    useEffect(() => {
        if (!fetchedRef2.current) {
            fetch(`http://localhost:8080/api/transfer/waitForAccept`, {
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
                setDataList2(prevDataList => [...prevDataList, { groupName, money }]);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    
            fetchedRef2.current = true;
        }
    }, [account]);

    return (
        <div className="container1">
            <div className="section">
                <div className="section-header">待轉帳</div>
                {dataList1 && dataList1.slice(0, 2).map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const money = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{money[i]}</div>
                            <div>
                                <button onClick={() => handleAcceptTransfer(index)}>轉帳</button>
                            </div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => handleShowAll1()}>
                    show all
                </div>
                {isModalOpen1 && (
                    <Modal onClose={handleCloseModal1}>
                        {dataList1.map((item, index) => {
                            const groupNames = item.groupName.split(',');
                            const money = item.money.split(',');
                            return groupNames.map((groupName, i) => (
                                <div key={`${index}-${i}`} className="row">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{groupName}</div>
                                        <div>{money[i]}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => handleAcceptTransfer(groupName)}>轉帳</button>
                                    </div>
                                </div>
                            ));
                        })}
                    </Modal>
                )} 
            </div>
            <div className="section">
                <div className="section-header">待接受</div>
                {dataList2 && dataList2.slice(0, 2).map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const money = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        <div key={i} className="row">
                            <div>{groupName}</div>
                            <div>{money[i]}</div>
                            <div>
                                <button onClick={() => handleAccept(groupName)}>接受</button>
                                <button onClick={() => handleReject(groupName)}>拒絕</button>
                            </div>
                        </div>
                    ));
                })}
                <div className="section-footer" onClick={() => handleShowAll2()}>
                    show all
                </div>
                {isModalOpen2 && (
                    <Modal onClose={handleCloseModal2}>
                        {dataList2.map((item, index) => {
                            const groupNames = item.groupName.split(',');
                            const money = item.money.split(',');
                            return groupNames.map((groupName, i) => (
                                <div key={`${index}-${i}`} className="row">
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div>{groupName}</div>
                                        <div>{money[i]}</div>
                                    </div>
                                    <div>
                                        <button onClick={() => handleAccept(groupName)}>接受</button>
                                        <button onClick={() => handleReject(groupName)}>拒絕</button>
                                    </div>
                                </div>
                            ));
                        })}
                    </Modal>
                )} 
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