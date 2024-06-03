import React, { useEffect, useState } from 'react';
import './History.css';
import { useAuth } from '../../AuthContext';

interface Item {
    name: string;
    value: string;
}

function History() {
    const [data1, setData1] = useState<Item[]>([]);
    const [data2, setData2] = useState<Item[]>([]);
    const [data3, setData3] = useState<Item[]>([]);
    const [showAll1, setShowAll1] = useState(false);
    const [showAll2, setShowAll2] = useState(false);
    const [showAll3, setShowAll3] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState('');

    const handleButtonClick = (view) => {
        setCurrentView(view);
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetch('your-backend-url/table1')
            .then(response => response.json())
            .then(data => setData1(data));
    }, []);

    useEffect(() => {
        fetch('your-backend-url/table2')
            .then(response => response.json())
            .then(data => setData2(data));
    }, []);

    useEffect(() => {
        fetch('your-backend-url/table3')
            .then(response => response.json())
            .then(data => setData3(data));
    }, []);

    return (
        <div className="container1" id='block'>
            <div className="section">
                <div className="section-header">Done</div>
                <ul className="section-content">
                    {(showAll1 ? data1 : data1.slice(0, 2)).map((item, index) => (
                        <li key={index}>{item.name} <span>{item.value}</span></li>
                    ))}
                </ul>
                <div className="section-footer" onClick={() => setShowAll1(!showAll1)}>
                    {showAll1 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">To be Transferred</div>
                <ul className="section-content">
                    {(showAll2 ? data2 : data2.slice(0, 2)).map((item, index) => (
                        <li key={index}>{item.name} <span>{item.value}</span></li>
                    ))}
                </ul>
                <div className="section-footer" onClick={() => setShowAll2(!showAll2)}>
                    {showAll2 ? 'see less' : 'see all'}
                </div>
            </div>
            <div className="section">
                <div className="section-header">To be Accepted</div>
                <ul className="section-content">
                    {(showAll3 ? data3 : data3.slice(0, 2)).map((item, index) => (
                        <li key={index}>{item.name} <span>{item.value}</span></li>
                    ))}
                </ul>
                <div className="section-footer" onClick={() => setShowAll3(!showAll3)}>
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