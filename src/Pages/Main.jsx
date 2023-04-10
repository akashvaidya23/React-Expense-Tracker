import { useEffect, useState } from "react";
import ExpenseForm from "../Components/ExpenseForm/ExpenseForm";
import DisplayExpenses from "../Components/DisplayExpenses/DisplayExpenses";

const Main = () => {
  const [listExpenses, setListExpenses] = useState([]);
  // const [isError, setIsError] = useState("");

  const fetchExpenses = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/expenses", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const responseData = await response.json();
    setListExpenses(responseData.data);
  };

  const onTaskSave = async (expense) => {
    await fetch("http://127.0.0.1:8000/api/expenses", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "access-control-allow-origin": "*",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(expense),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
    fetchExpenses();
  };

  useEffect(() => {
    console.log("Entry Added");
    fetchExpenses();
  }, []);

  return (
    <>
      <h4 style={{ textAlign: "center" }}>Expense Tracker</h4>
      <ExpenseForm saveTask={onTaskSave} />
      <br />
      <br />
      <DisplayExpenses listExpenses={listExpenses} />
    </>
  );
};

export default Main;
