import React from "react";
import { Navbar, Nav, Container, NavDropdown, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({setSearch}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  }

  return (
    <Navbar
      bg="primary"
      expand="lg"
      variant="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: "35px" }} className="py-0">
          <Link to="/">Notes</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e)=>setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo ? <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/mynotes" style={{ color: "white" }}>
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown
              title={userInfo?.name}
              id="navbarScrollingDropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav> :
          <Nav> <Nav.Link href="/login" style={{ color: "white" }}>
          <Link to="/login">Login</Link>
        </Nav.Link></Nav> 
        }

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
