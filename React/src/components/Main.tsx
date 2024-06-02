import React, { useState } from 'react'
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

//icon區
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LogoutIcon from '@mui/icons-material/Logout';

const Main = () => {
    const [ColorMode,setColorMode]=useState('light')

  return (
    <div className='mainapp'>
    <BrowserRouter>
        <Navbar expand="lg" bg={ColorMode} variant={ColorMode} className='header' >
        <Container className='m-0'>
            <Navbar.Brand href="#home">
                <CurrencyExchangeIcon style={{paddingBottom:"5%"}}/>
                共同支付
                </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse  className="justify-content-end" >
            <Nav >
                <NavDropdown title="User" id="basic-nav-dropdown" >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    <LogoutIcon />
                    登出
                </NavDropdown.Item>
                </NavDropdown>
                <Form style={{color:ColorMode=='light'?'black':'white'}}>
                    <Form.Check // prettier-ignore
                        className="switch"
                        type="switch"
                        id="custom-switch"
                        label="Dark Mode"
                        onClick={()=>ColorMode=='light'?setColorMode('dark'):setColorMode('light')}
                    />
                </Form>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        <div className='content' >
        <Nav defaultActiveKey="/home" className="flex-column" style={{backgroundColor:ColorMode=='light'?'#F5F5F5':'#121212'}}>
            <NavLink className="nav-side" style={{color:ColorMode=='light'?'black':'#F5F5F5'}} to="/Add">Add</NavLink>
            <NavLink className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/Transfer">Transfer</NavLink>
            <NavLink className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/History">History</NavLink>
            <NavLink className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/Settings">Settings</NavLink> 
        </Nav>
        <main className='main'style={{backgroundColor:ColorMode=='light'?'#F5F5F5':'#050505'}}>
            <Routes>
                <Route path="/Add" Component={AddCtrl} />
                <Route path="/Transfer" Component={Transfer} />
                <Route path="/History" Component={History} />
            </Routes>
        </main>
        </div>
    </BrowserRouter>
  </div>
  )
}

export default Main