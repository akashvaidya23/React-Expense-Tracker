import NavbarUI from "../Navbar/NavbarUI";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useRef, useState } from "react";
import style from "./TitleForm.module.css";
import { Alert } from "react-bootstrap";
import ListTitles from "../ListTitle/ListTitle";

const TitleForm = () => {
  const [title, setTitle] = useState("");
  const [Ealert, setAlert] = useState("");
  const [error, setError] = useState("");
  const [listTitles, setListTitles] = useState([]);

  const user = JSON.parse(localStorage.getItem("user")).id;
  const titleRef = useRef(null);

  const submitHandler = () => {
    if (title) {
      const ttl = { name: title, user_id: user };
      setTitle("");
      addTitle(ttl);
    } else {
      alert("Please enter title");
    }
  };

  const checkTitle = async (e) => {
    const enteredTitle = e.target.value;
    const result = await fetch(
      `http://127.0.0.1:8000/api/check/titles/${user}/${enteredTitle}`
    );
    const data = await result.json();
    if (data.success === 0) {
      setError("Title already exists");
      titleRef.current.focus();
      return;
    }
  };

  const addTitle = async (data) => {
    const result = await fetch("http://127.0.0.1:8000/api/title", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    });
    const title = await result.json();
    // console.log(title.success);
    if (title.success === 1) {
      setAlert(true);
      getTitles();
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const getTitles = async () => {
    const result = await fetch(`http://127.0.0.1:8000/api/title/${user}`);
    const data = await result.json();
    if (data.data.length > 0) {
      setListTitles(data.data);
    } else {
      setListTitles([]);
    }
  };

  const deleteTitle = async (deleting) => {
    console.log("delete from title from", deleting);
    const response = await fetch(
      `http://127.0.0.1:8000/api/title/${deleting.exp_id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    console.log(data.success);
    getTitles();
  };

  useEffect(() => {
    console.log("get titles");
    getTitles();
  }, []);

  return (
    <>
      <NavbarUI />
      <h4 style={{ textAlign: "center" }}>Add Title</h4>
      {Ealert && !error && (
        <Alert onClose={() => setAlert(false)} variant="success" dismissible>
          Title Added Successfully.
        </Alert>
      )}
      {!Ealert && error && (
        <Alert onClose={() => setError(false)} variant="danger" dismissible>
          Title already Exists.
        </Alert>
      )}
      <div className={style.main}>
        <div>
          <label htmlFor="ExpenseName">Expense Name</label>
          {/* <br /> */}
          <Form.Control
            ref={titleRef}
            type="text"
            name="expenseName"
            autoComplete="off"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onBlur={checkTitle}
            style={{ width: "210px", borderColor: "black" }}
          />
        </div>
        <br />
        <Button
          variant="primary"
          onClick={submitHandler}
          style={{ textAlign: "center" }}
        >
          Submit
        </Button>
      </div>
      <br />
      <br />
      <ListTitles list={listTitles} onDelete={deleteTitle} />
    </>
  );
};

export default TitleForm;
