import Transfer from "./components/Page/Transfer";
import History from "./components/Page/History";
import AddCtrl from "./components/Page/AddCtrl";
import ModalCtrl from "./components/ModalCtrl";
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
import { AuthProvider, useAuth } from "./AuthContext";
import AddGroup from "./components/Page/AddGroup";

function App() {


  return (
    
      <AuthProvider>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
      </AuthProvider>
  );
}

function Content(){
  const { isLoggedIn,login, colormode ,changeColor,setColor} = useAuth();

  if(localStorage.getItem('account')){
    login(localStorage.getItem('account'));
  }

  if(localStorage.getItem('colormode')=='dark'){
    setColor('dark');
  }
  return(
    <>
    {!isLoggedIn ? (
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
        <main className="main" style={{backgroundColor:colormode=='light'?'#fff':'#121212'}}>
          <Routes>
            <Route path="/Add" Component={AddCtrl} />
            <Route path="/Transfer" Component={Transfer} />
            <Route path="/History" Component={History} />
          </Routes>
        </main>
      </div>
    </div>
    </>
  )
}


export default App;
