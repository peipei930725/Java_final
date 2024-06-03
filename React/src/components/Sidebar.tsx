import {React ,useState}from 'react'
import Nav from 'react-bootstrap/Nav';
import NavLink, { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HistoryIcon from '@mui/icons-material/History';
// import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../AuthContext';

const Sidebar = () => {

    const [ColorMode,setColorMode]=useState('light')
    const {Account}=useAuth();
  return (
    <div>
    <Nav defaultActiveKey="/home" className="flex-column" style={{backgroundColor:ColorMode=='light'?'#F5F5F5':'#121212', height:'90vh'}}>
        <Nav.Link as={Link} className="nav-side" style={{color:ColorMode=='light'?'black':'#F5F5F5'}} to="/Add">
            <AddCircleOutlineIcon style={{paddingBottom:"5px", paddingRight:"5px"}}/>Add
            </Nav.Link>
        <Nav.Link as={Link} className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/Transfer">
            <AccountBalanceWalletIcon style={{paddingBottom:"5px", paddingRight:"5px"}}/>
            Transfer
            </Nav.Link>
        <Nav.Link as={Link} className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/History">
            <HistoryIcon style={{paddingBottom:"5px", paddingRight:"5px"}} />
            History
            </Nav.Link>
        {/* <Nav.Link as={Link} className="nav-side" style={{color:ColorMode=='light'?'black':'white'}} to="/Settings">
            <SettingsIcon style={{paddingBottom:"5px", paddingRight:"5px"}} />
            Settings
            </Nav.Link>  */}
            <p>Hi {Account}</p>
    </Nav>
    </div>
  )
}

export default Sidebar