import React from 'react'
import { BrowserRouter, Routes, Route ,NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import './Main.css'
import AddCtrl from './Page/AddCtrl';
import History from './Page/History';
import Transfer from './Page/Transfer';
import Settings from './Page/Settings'; // 假設你已經創建了一個設定頁面組件

const Main = () => {
  return (
    <>
    <BrowserRouter>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">共同轉帳</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
                <Form>
                    <Form.Check // prettier-ignore
                        className="switch"
                        type="switch"
                        id="custom-switch"
                        label="Dark Mode"
                    />
                </Form>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <div className='content'>
        <Nav defaultActiveKey="/home" className="flex-column">
            <NavLink className="nav-side" to="/Add">Add</NavLink>
            <NavLink className="nav-side" to="/Transfer">Transfer</NavLink>
            <NavLink className="nav-side" to="/History">History</NavLink>
            <NavLink className="nav-side" to="/Settings">Settings</NavLink> {/* 新增的設定頁面連結 */}
        </Nav>
        <main className='main'>
            <Routes>
                <Route path="/Add" Component={AddCtrl} />
                <Route path="/Transfer" Component={Transfer} />
                <Route path="/History" Component={History} />
                <Route path="/Settings" Component={Settings} /> {/* 新增的設定頁面路由 */}
            </Routes>
        </main>
        </div>
    </BrowserRouter>
  </>
  )
}

export default Main