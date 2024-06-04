import {React ,useState}from 'react'
import Nav from 'react-bootstrap/Nav';
import NavLink, { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../AuthContext';
import { SidebarCss } from './Theme';

const Sidebar = () => {
    const {colormode}=useAuth()

  return (
    <SidebarCss>
    <Nav defaultActiveKey="/home" className="flex-column" style={{ height:'90vh'}}>
        <Nav.Link as={Link} className="nav-side" to="/Add">
            <AddCircleOutlineIcon style={{paddingBottom:"5px", paddingRight:"5px"}}/>Add
            </Nav.Link>
        <Nav.Link as={Link} className="nav-side" to="/Transfer">
            <AccountBalanceWalletIcon style={{paddingBottom:"5px", paddingRight:"5px"}}/>
            Transfer
            </Nav.Link>
        <Nav.Link as={Link} className="nav-side" to="/History">
            <HistoryIcon style={{paddingBottom:"5px", paddingRight:"5px"}} />
            History
            </Nav.Link>
        <Nav.Link as={Link} className="nav-side" to="/Settings">
            <SettingsIcon style={{paddingBottom:"5px", paddingRight:"5px"}} />
            Settings
            </Nav.Link> 
    </Nav>
    </SidebarCss>
  )
}

export default Sidebar