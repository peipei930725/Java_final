import React, { createContext, useContext, useState } from "react";
import AddGroup from "./components/Page/CreateGroup";
import AddTransfer from "./components/Page/AddTransfer";
import Transfer from "./components/Page/Transfer";
import History from "./components/Page/History";
import AddCtrl from "./components/Page/AddCtrl";
import ModalCtrl from "./components/ModalCtrl";
import Main from "./components/Main";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";

// 創建一個 UserContext
const UserContext = createContext(null);

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState({});

  const handleLogin = () => {
    // 处理登录逻辑，比如验证用户信息等
    setLoggedIn(true);
  };

  return (
    <div>
      <UserContext.Provider value={[userId, setUserId]}>
      <BrowserRouter>
        {!userId ? (
          <>
            <ModalCtrl />
          </>
        ) : null}
        <div className="maincpp">
          <div className="header">
            <Header />
          </div>
          <div className="content">
            <div className="Sidebar">
              <Sidebar />
            </div>
            <main className="main">
              <Routes>
                <Route path="/Add" Component={AddCtrl} />
                <Route path="/Transfer" Component={Transfer} />
                <Route path="/History" Component={History} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
