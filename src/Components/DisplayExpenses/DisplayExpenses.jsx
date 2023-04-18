import Table from "react-bootstrap/Table";
import styles from "./DisplayExpense.module.css";
import { Alert, Button } from "react-bootstrap";
import { useState } from "react";

const DisplayExpenses = (props) => {
  const { listExpenses, deleteExpense, error, success } = props;
  let totalIncome = 0;
  let totalExpense = 0;
  console.log("error", error);
  console.log("success", success);
  const [err, setErr] = useState(error);
  const [sucs, setSucs] = useState(success);

  return (
    <>
      <h5 style={{ textAlign: "center" }}>List of all incomes and expenses</h5>
      {err && (
        <Alert onClose={() => setErr("")} variant="danger" dismissible>
          {err}
        </Alert>
      )}
      {sucs && (
        <Alert onClose={() => setSucs("")} variant="danger" dismissible>
          {sucs}
        </Alert>
      )}
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th className={styles.border} width="3%">
              Sr.No
            </th>
            <th className={styles.border} width="10%">
              Expense Name
            </th>
            <th className={styles.border} width="5%">
              You Got
            </th>
            <th className={styles.border} width="5%">
              You Gave
            </th>
            <th className={styles.border} width="10%">
              Date
            </th>
            <th className={styles.border} width="10%">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listExpenses.map((exp, index) => {
            if (exp.expense_type === 1) {
              totalIncome = totalIncome + parseInt(exp.amount);
            } else {
              totalExpense = totalExpense + parseInt(exp.amount);
            }
            return (
              <tr key={index}>
                <td className={styles.border}>{index + 1}</td>
                <td
                  style={{
                    border: "1px solid black",
                    justifyContent: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {exp.name}
                </td>
                <td
                  style={{
                    color: "green",
                    border: "1px solid black",
                    justifyContent: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {exp.expense_type === 1 ? (
                    <p style={{ margin: "0px" }}>{exp.amount}</p>
                  ) : (
                    ""
                  )}
                </td>
                <td
                  style={{
                    color: "red",
                    border: "1px solid black",
                    justifyContent: "center",
                    verticalAlign: "middle",
                  }}
                >
                  {exp.expense_type === 2 ? (
                    <p style={{ margin: "0px" }}>{exp.amount}</p>
                  ) : (
                    ""
                  )}
                </td>
                <td className={styles.border}>{exp.date}</td>
                <td className={styles.border}>
                  <Button variant="success" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ marginLeft: "5px" }}
                    onClick={() => {
                      deleteExpense(exp.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td
              colSpan={2}
              style={{ fontWeight: "bold", border: "1px solid black" }}
            >
              Total
            </td>
            <td className={styles.totalIncome}>{Math.abs(totalIncome)}</td>
            <td className={styles.totalExpenses}>{Math.abs(totalExpense)}</td>
            <td style={{ border: "1px solid black" }} colSpan={2}>
              Net Amount:{" "}
              <strong
                style={
                  totalIncome - totalExpense > 0
                    ? {
                        fontWeight: "bold",
                        color: "green",
                      }
                    : {
                        fontWeight: "bold",
                        color: "red",
                      }
                }
              >
                {Math.abs(totalIncome - totalExpense)}
              </strong>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default DisplayExpenses;
