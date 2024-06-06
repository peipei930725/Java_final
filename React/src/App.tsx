import Transfer from "./components/Page/Transfer";
import History from "./components/Page/History";
import AddCtrl from "./components/Page/AddCtrl";
import ModalCtrl from "./components/ModalCtrl";
import Header from "./components/Header";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { AuthProvider, useAuth } from "./AuthContext";
import { ThemeProvider } from "styled-components";
import {
  darkTheme,
  lightTheme,
  Maincontent,
  Content,
  MainApp,
} from "./components/Theme";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  const { isLoggedIn, login, colormode, changeColor, setColor } = useAuth();

  if (localStorage.getItem("account")) {
    login(localStorage.getItem("account"));
  }

  if (localStorage.getItem("colormode") == "dark") {
    setColor("dark");
  }
  return (
    <>
      <ThemeProvider theme={colormode == "light" ? lightTheme : darkTheme}>
        {!isLoggedIn ? (
          <>
            <ModalCtrl />
          </>
        ) : null}
        <MainApp>
          <Header />
          <Content>
            <Sidebar />
            <Maincontent>
              <Routes>
                <Route path="/Add" Component={AddCtrl} />
                <Route path="/Transfer" Component={Transfer} />
                <Route path="/History" Component={History} />
              </Routes>
            </Maincontent>
          </Content>
        </MainApp>
      </ThemeProvider>
    </>
  );
}

export default App;
