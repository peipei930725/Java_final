import useState  from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useAuth } from "../AuthContext";
import {HeaderCss } from "./Theme";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { logout } = useAuth();
  const { account } = useAuth();
  const {colormode}=useAuth();
  const { changeColor} = useAuth();
  return (
    <HeaderCss>
      <Navbar expand="lg" bg={colormode} variant={colormode} className="header" style={{paddingLeft:"5px"}}>
        <Container className="m-0 p-2" >
          <Navbar.Brand href="/" style={{fontSize:"25px" }}>
            <CurrencyExchangeIcon style={{ paddingBottom: "5%" }} />
            共同支付
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={account} id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1"></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.3">
                  更改密碼
                </NavDropdown.Item>
                <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={logout}>
                  <LogoutIcon />
                  登出
                </NavDropdown.Item>
              </NavDropdown>
              <Form style={{ color: colormode == "light" ? "black" : "white" }}>
                <Form.Check // prettier-ignore
                  className="switch"
                  type="switch"
                  id="custom-switch"
                  label="Dark Mode"
                  checked={colormode=='dark'?true:false}
                  onClick={changeColor}
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </HeaderCss>
  );
};

export default Header;
