import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Public = (props) => {
  const { Cmp } = props;
  const navigate = useNavigate();
  useEffect(() => {
    console.log("from protected ", localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      navigate("/AddTitle");
    }
  }, []);
  return (
    <>
      <Cmp />
    </>
  );
};

export default Public;
