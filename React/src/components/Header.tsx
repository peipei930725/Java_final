import useState  from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import { useAuth } from "../AuthContext";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { logout } = useAuth();
  const { account } = useAuth();
  const {colormode}=useAuth();
  const { changeColor} = useAuth();
  return (
    <div>
      <Navbar expand="lg" bg={colormode} variant={colormode} className="header">
        <Container className="m-0 p-1">
          <Navbar.Brand href="/">
            <CurrencyExchangeIcon style={{ paddingBottom: "5%" }} />
            共同支付
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={account} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
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
    </div>
  );
};

export default Header;
