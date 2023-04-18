import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Cmp } = props;
  const navigate = useNavigate();
  useEffect(() => {
    // console.log("from protected ", localStorage.getItem("user"));
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Cmp />
    </>
  );
};

export default Protected;
