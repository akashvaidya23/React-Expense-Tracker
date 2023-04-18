import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import style from "./ExpenseForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = [
  { value: "1", label: "Income" },
  { value: "2", label: "Expense" },
];

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const ExpenseForm = (props) => {
  const { saveTask } = props;
  const taskDetails = sessionStorage.getItem("title");
  const { name, id } = JSON.parse(taskDetails);
  // console.log(name, id);

  const [expenseType, setExpenseType] = useState("");
  const expenseTypeChangeHandler = (e) => {
    setExpenseType(e.target.value);
  };

  const [expenseAmount, setExpenseAmount] = useState("");
  const expenseAmountChangeHandler = (e) => {
    setExpenseAmount(e.target.value);
  };

  const [expenseDate, setExpenseDate] = useState("");
  const expenseDateChangeHandler = (e) => {
    setExpenseDate(e.target.value);
  };

  const [expenseName, setExpenseName] = useState("");
  const expenseNameChangeHandler = (e) => {
    setExpenseName(e.target.value);
  };

  const saveTaskHandler = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let user_id = user.id;
    console.log(expenseDate);
    if (expenseName && expenseType && expenseAmount && expenseDate) {
      const amount =
        expenseType === "Expense" ? "-" + expenseAmount : expenseAmount;
      const expense = {
        title: id,
        name: expenseName,
        type: expenseType,
        amount: parseInt(amount).toFixed(2),
        date: expenseDate,
        user_id,
      };
      saveTask(expense);
      setExpenseType("");
      setExpenseAmount("");
      setExpenseDate("");
      setExpenseName("");
    } else {
      alert("invalid input");
    }
  };

  return (
    <>
      <div className={style.main}>
        <div>
          <div style={{ textAlign: "center", fontWeight: "bolder" }}>
            <label htmlFor="ExpenseName">Title Name</label>
            <p>{name}</p>
          </div>
          <br />
          <label htmlFor="ExpenseName">Expense Name</label>
          {/* <br /> */}
          <Form.Control
            type="text"
            name="expenseName"
            autoComplete="off"
            onChange={expenseNameChangeHandler}
            value={expenseName}
            style={{ width: "210px", borderColor: "black" }}
          />
          <br />
          <label htmlFor="ExpenseType">ExpenseType</label>
          {/* <br /> */}
          <Form.Select
            aria-label="Default select example"
            name="expenseType"
            id="expenseType"
            onChange={expenseTypeChangeHandler}
            value={expenseType}
            style={{ width: "210px", borderColor: "black" }}
          >
            <option>Select Expense Type</option>
            {options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </Form.Select>
        </div>
        <br />
        <div>
          <label htmlFor="amount">Amount</label>
          {/* <br /> */}
          <Form.Control
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            value={expenseAmount}
            onChange={expenseAmountChangeHandler}
            style={{ width: "210px", borderColor: "black" }}
          />
          <br />
          <label htmlFor="amount">Date</label>
          {/* <DatePicker
            selected={expenseDate}
            dateFormat="MM/dd/yyyy h:mm aa"
            onChange={expenseDateChangeHandler}
            // maxDate={new Date()}
            locale="en-GB"
            placeholderText="Select Date!"
            className="red-border"
            // className={style.date}
          /> */}
          <Form.Control
            type="date"
            name="date"
            id="date"
            max={date}
            value={expenseDate}
            onChange={expenseDateChangeHandler}
            style={{ width: "210px", borderColor: "black" }}
          />
        </div>
        <br />
        <Button
          variant="primary"
          onClick={saveTaskHandler}
          style={{ textAlign: "center" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default ExpenseForm;
