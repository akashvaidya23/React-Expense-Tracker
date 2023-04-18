import { useEffect, useState } from "react";
import ExpenseForm from "../Components/ExpenseForm/ExpenseForm";
import DisplayExpenses from "../Components/DisplayExpenses/DisplayExpenses";
import NavbarUI from "../Components/Navbar/NavbarUI";

const Main = () => {
  const [listExpenses, setListExpenses] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const taskDetails = sessionStorage.getItem("title");
  const title = JSON.parse(taskDetails).id;
  const user = JSON.parse(localStorage.getItem("user")).id;

  const fetchExpenses = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/list/expenses/${user}/${title}`,
      {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const responseData = await response.json();
    // console.log(responseData);
    setListExpenses(responseData.data);
  };

  const onTaskSave = async (expense) => {
    console.log(expense.date);
    console.log(JSON.stringify(expense));
    const result = await fetch("http://127.0.0.1:8000/api/expenses", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(expense),
    });
    const data = result.json();
    console.log(data);
    fetchExpenses();
  };

  const deleteExpense = async (id) => {
    console.log("delete from main", id);
    const response = await fetch(`http://127.0.0.1:8000/api/expenses/${id}`, {
      method: "DELETE",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const data = await response.json();
    console.log(data.success);
    if (data.success) {
      fetchExpenses();
      setError("");
      setSuccess(data.message);
    } else {
      setError(data.message);
      setSuccess("");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <NavbarUI />
      <h4 style={{ textAlign: "center" }}>Add New Expenses</h4>
      <ExpenseForm saveTask={onTaskSave} />
      <br />
      <br />
      <DisplayExpenses
        listExpenses={listExpenses}
        deleteExpense={deleteExpense}
        error={error}
        success={success}
      />
    </>
  );
};

export default Main;
