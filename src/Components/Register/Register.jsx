import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import style from "./Register.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarUI from "../Navbar/NavbarUI";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("user-details ", localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      navigate("/AddTitle");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const history = useHistory();

  const signUp = (e) => {
    e.preventDefault();
    if (name && email && password && password === confirmPassword) {
      let data = {
        name,
        email,
        password,
      };
      signUpAPI(data);
      // navigate("/AddTitle");
    } else {
      alert("something Went Wrong!!");
    }
  };

  const signUpAPI = async (data) => {
    const result = await fetch("http://127.0.0.1:8000/api/sign-up", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const user = await result.json();
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user.data));
    // navigate("/AddTitle");
  };
  return (
    <>
      <NavbarUI />
      <h4 style={{ textAlign: "center" }}>Sign-Up</h4>
      <div className={style.main}>
        <Form onSubmit={signUp}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              value={name}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
              style={{ width: "210px", borderColor: "black" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email"
              name="email"
              value={email}
              autoComplete="off"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
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
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              style={{ width: "210px", borderColor: "black" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="confirm_password"
              name="confirm_password"
              value={confirmPassword}
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm Password"
              style={{ width: "210px", borderColor: "black" }}
            />
          </Form.Group>
          <Button type="submit" varient="primary">
            Register
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Register;
