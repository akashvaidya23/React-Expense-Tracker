import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUI from "../Navbar/NavbarUI";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);
    loginAPI(user);
    setIsLoading(false);
  };

  const loginAPI = async (user) => {
    let result = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });
    result = await result.json();
    console.log(result.success);
    if (result.success === 1) {
      setError("");
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/AddTitle");
    } else {
      setError("User not found for the credentials.");
    }
  };

  return (
    <>
      <NavbarUI />
      <h4 style={{ textAlign: "center" }}>Login</h4>
      <div className={styles.main}>
        <p className={styles.error}>{error}</p>
        <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              name="email"
              value={email}
              autoComplete="off"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="name@example.com"
              style={{ width: "210px", borderColor: "black" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter Password"
              style={{ width: "210px", borderColor: "black" }}
            />
          </Form.Group>
          <Button type="submit" varient="primary">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
