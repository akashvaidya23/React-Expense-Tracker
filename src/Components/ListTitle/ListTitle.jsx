import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./ListTitle.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

const ListTitles = (props) => {
  const navigate = useNavigate();
  const [deleting, isDeleting] = useState({ status: false, exp_id: "" });
  const { list, onDelete } = props;

  const deleteTitle = (exp_id) => {
    isDeleting({ status: true, exp_id: exp_id });
  };

  return (
    <>
      {deleting.status === true && (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={() => {
            onDelete(deleting);
            isDeleting({ status: false, exp_id: "" });
          }}
          onCancel={() => {
            isDeleting({ status: false, exp_id: "" });
          }}
          focusCancelBtn
        >
          This action will not be reversed!!
        </SweetAlert>
      )}
      <h5 style={{ textAlign: "center" }}>List of Titles</h5>
      <Table striped className={styles.table}>
        <thead>
          <tr>
            <th className={styles.border} width="3%">
              Sr.No
            </th>
            <th className={styles.border} width="10%">
              Expense Name
            </th>
            <th className={styles.border} width="10%">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {list.map((lists, index) => {
            return (
              <tr key={index}>
                <td className={styles.border}>{index + 1}</td>
                <td className={styles.border}>{lists.name}</td>
                <td className={styles.border}>
                  <Button
                    onClick={() => {
                      sessionStorage.setItem("title", JSON.stringify(lists));
                      navigate(`/AddExpense/:${lists.id}`);
                    }}
                    variant="success"
                    size="sm"
                  >
                    Add Transaction
                  </Button>
                  <Button
                    style={{ marginLeft: "5px" }}
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      deleteTitle(lists.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListTitles;
