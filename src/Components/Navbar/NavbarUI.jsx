import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";

const NavbarUI = () => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/">Expenses Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Link
              style={{ color: "#eee", textDecoration: "none" }}
              to="/AddExpense"
            >
              Expenses
            </Link>
            <Link
              style={{
                color: "#eee",
                marginLeft: "5px",
                textDecoration: "none",
              }}
              to="#"
            >
              Login
            </Link>
            <Link
              style={{
                color: "#eee",
                marginLeft: "5px",
                textDecoration: "none",
              }}
              to="/register"
            >
              Register
            </Link>
            <Link
              style={{
                color: "#eee",
                marginLeft: "5px",
                textDecoration: "none",
              }}
              to="#"
            >
              Logout
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarUI;
