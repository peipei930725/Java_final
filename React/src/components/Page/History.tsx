import React, { useEffect, useState ,useRef } from 'react';
import { useAuth } from '../../AuthContext';
import { HistoryAndTransferContainer, Modaloverlay } from '../Theme';

interface Item {
    name: string;
    value: string;
}

function History() {
    const [dataList1, setDataList1] = useState([]);
    const [dataList2, setDataList2] = useState([]);
    const [dataList3, setDataList3] = useState([]);
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [showAll3, setShowAll3] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const [isModalOpen3, setIsModalOpen3] = useState(false);
    const [currentView, setCurrentView] = useState('');
    const { account } = useAuth();
    const fetchedRef1 = useRef(false);
    const fetchedRef2 = useRef(false);
    const fetchedRef3 = useRef(false);

    const handleButtonClick = (view) => {
        setCurrentView(view);
        setIsModalOpen(true);
    };
    
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

    const handleShowAll3 = () => {
        setShowAll3(!showAll3);
        setIsModalOpen3(true);
    };

    const handleCloseModal1 = () => {
        setIsModalOpen1(false);
    };

    const handleCloseModal2 = () => {
        setIsModalOpen2(false);
    };

    const handleCloseModal3 = () => {
        setIsModalOpen3(false);
    };

    useEffect(() => {
        if (!fetchedRef1.current) {
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
                setDataList1([]);
                setDataList1(prevDataList => [...prevDataList, { groupName, money }]);
                fetchedRef1.current = true;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    

        }
    }, [account]);

    useEffect(() => {
        if (!fetchedRef2.current) {
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
                setDataList2([]);
                setDataList2(prevDataList => [...prevDataList, { groupName, count }]);
                fetchedRef2.current = true;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    
  
        }
    }, [account]);

    useEffect(() => {
        if (!fetchedRef3.current) {
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
                setDataList3([]);
                setDataList3(prevDataList => [...prevDataList, { groupName, count }]);
                fetchedRef3.current = true;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    

        }
    }, [account]);

    return (
        <HistoryAndTransferContainer>
            <div className="section">
                <div className="section-header">已完成</div>
                {dataList1 && dataList1.slice(0, 2).map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const money = item.money.split(',');
                    return groupNames.map((groupName, i) => (
                        groupName != "null" && money[i] != "null" ? (
                            <div key={i} className="row">
                                <div>{groupName}</div>
                                <div>${money[i]}</div>
                            </div>
                        ) : "目前無資料"
                    ));
                })}
                <div className="section-footer" onClick={() => handleShowAll1()}>
                    show all
                </div>
                {isModalOpen1 && (
                    <Modaloverlay>
                        <div className='modal-box'>
                        {dataList1.map((item, index) => {
                            const groupNames = item.groupName.split(',');
                            const money = item.money.split(',');
                            return groupNames.map((groupName, i) => (
                                groupName != "null" && money[i] != "null" ? (
                                    <div key={`${index}-${i}`} className="row">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>{groupName}</div>
                                            <div>${money[i]}</div>
                                        </div>
                                    </div>
                                ) : null
                            ));
                        })}
                        <div className="col-12">

                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal1}>關閉</button>
                        </div>
                        </div>
                    </Modaloverlay>
                )} 
            </div>
            <div className="section">
                <div className="section-header">已轉帳</div>
                {dataList2 && dataList2.slice(0, 2).map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const count = item.count.split(',');
                    return groupNames.map((groupName, i) => (
                        groupName != "null" && count[i] != "null" ? (
                            <div key={i} className="row">
                                <div>{groupName}</div>
                                <div>{count[i]}</div>
                            </div>
                        ) : "目前無資料"
                    ));
                })}
                <div className="section-footer" onClick={() => handleShowAll2()}>
                    show all
                </div>
                {isModalOpen2 && (
                    <Modaloverlay>
                        <div className='modal-box'>
                        {dataList2.map((item, index) => {
                            const groupNames = item.groupName.split(',');
                            const counts = item.count.split(',');
                            return groupNames.map((groupName, i) => (
                                groupName != "null" && counts[i] != "null" ? (
                                    <div key={`${index}-${i}`} className="row">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>{groupName}</div>
                                            <div>{counts[i]}</div>
                                        </div>
                                    </div>
                                ) : null
                            ));
                        })}
                        <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal2}>關閉</button>
                        </div>
                        </div>
                    </Modaloverlay>
                )} 
            </div>
            <div className="section">
                <div className="section-header">待接受</div>
                {dataList3 && dataList3.slice(0, 2).map((item, index) => {
                    const groupNames = item.groupName.split(',');
                    const count = item.count.split(',');
                    return groupNames.map((groupName, i) => (
                        groupName != "null" && count[i] != "null" ? (
                            <div key={i} className="row">
                                <div>{groupName}</div>
                                <div>{count[i]}</div>
                            </div>
                        ) : "目前無資料"
                    ));
                })}
                <div className="section-footer" onClick={() => handleShowAll3()}>
                    show all
                </div>
                {isModalOpen3 && (
                    <Modaloverlay>
                        <div className='modal-box'>
                        {dataList3.map((item, index) => {
                            const groupNames = item.groupName.split(',');
                            const counts = item.count.split(',');
                            return groupNames.map((groupName, i) => (
                                groupName != "null" && counts[i] != "null" ? (
                                    <div key={`${index}-${i}`} className="row">
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div>{groupName}</div>
                                            <div>{counts[i]}</div>
                                        </div>
                                    </div>
                                ) : null
                            ));
                        })}
                        <div className="col-12">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal3}>關閉</button>
                        </div>
                        </div>
                    </Modaloverlay>
                )} 
            </div>
        </HistoryAndTransferContainer>
    );
}

export default History;