import React, { createContext, useContext, useState } from 'react';

// 創建一個 UserContext
const UserContext = createContext(null);

// 在最頂層組件中提供 UserContext
function App() {
    const [userId, setUserId] = useState(null);

    // 假設在某個地方你已經獲取了 userId
    // setUserId(receivedUserId);

    return (
        <UserContext.Provider value={userId}>
            {/* 其他組件 */}
        </UserContext.Provider>
    );
}