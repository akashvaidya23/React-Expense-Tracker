import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NavbarUI = () => {
  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.name);
  // const name = user.name && "";
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/" style={{ fontWeight: "bold" }}>
            Expenses Tracker
          </Navbar.Brand>
          <Nav className="me-auto">
            {localStorage.getItem("user") ? (
              <>
                {/* <Link
                  style={{ color: "#eee", textDecoration: "none" }}
                  to="/AddExpense"
                >
                  Expenses
                </Link> */}

                <Link
                  style={{
                    marginLeft: "15px",
                    color: "#eee",
                    textDecoration: "none",
                  }}
                  to="/AddTitle"
                >
                  Title
                </Link>
              </>
            ) : (
              <>
                <Link
                  style={{
                    color: "#eee",
                    marginLeft: "15px",
                    textDecoration: "none",
                  }}
                  to="/"
                >
                  Login
                </Link>
                <Link
                  style={{
                    color: "#eee",
                    marginLeft: "15px",
                    textDecoration: "none",
                  }}
                  to="/register"
                >
                  Sign-Up
                </Link>
              </>
            )}
          </Nav>
          {localStorage.getItem("user") && (
            <Nav>
              <NavDropdown
                title={JSON.parse(localStorage.getItem("user")).name}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item to="#">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Container>
      </Navbar>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarUI;
