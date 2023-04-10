import Table from "react-bootstrap/Table";
import styles from "./DisplayExpense.module.css";
import { Button } from "react-bootstrap";

const DisplayExpenses = (props) => {
  const { listExpenses } = props;
  let add = 0;
  return (
    <>
      <h5 style={{ textAlign: "center" }}>List of all incomes and expenses</h5>
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
              Type
            </th>
            <th className={styles.border} width="5%">
              Amount
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
            const amt = `${
              exp.expense_type === 2 ? "-" + exp.amount : exp.amount
            }`;
            add = add + parseInt(amt);
            return (
              <tr key={index}>
                <td className={styles.border}>{index + 1}</td>
                <td
                  style={{
                    border: "1px solid black",
                    justifyContent: "center",
                  }}
                >
                  {exp.name}
                </td>
                <td className={styles.border}>
                  {exp.expense_type === 1 ? "Income" : "Expense"}
                </td>
                <td
                  style={
                    exp.expense_type === 2
                      ? { color: "red", border: "1px solid black" }
                      : { color: "green", border: "1px solid black" }
                  }
                >
                  {exp.amount}
                </td>
                <td className={styles.border}>{exp.date}</td>
                <td className={styles.border}>
                  <Button variant="success">Edit</Button>
                  <Button variant="danger" style={{ marginLeft: "5px" }}>
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
              colSpan={3}
              style={{ fontWeight: "bold", border: "1px solid black" }}
            >
              Total
            </td>
            <td style={{ border: "1px solid black", fontWeight: "bold" }}>
              {add}
            </td>
            <td colSpan={2} className={styles.border}></td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default DisplayExpenses;
