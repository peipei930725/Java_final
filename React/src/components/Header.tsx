import { React , useState }from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
    const [ColorMode,setColorMode]=useState('light')
  return (
    <div>
      <Navbar expand="lg" bg={ColorMode} variant={ColorMode} className="header">
        <Container className="m-0 p-1">
          <Navbar.Brand href="/">
            <CurrencyExchangeIcon style={{ paddingBottom: "5%" }} />
            共同支付
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <LogoutIcon />
                  登出
                </NavDropdown.Item>
              </NavDropdown>
              <Form style={{ color: ColorMode == "light" ? "black" : "white" }}>
                <Form.Check // prettier-ignore
                  className="switch"
                  type="switch"
                  id="custom-switch"
                  label="Dark Mode"
                  onClick={() =>
                    ColorMode == "light"
                      ? setColorMode("dark")
                      : setColorMode("light")
                  }
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
