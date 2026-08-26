import { useEffect } from "react";
import axiosInstance from "../utils/Axios.instance";

const Test = () => {
  const fatchAll = async () => {
    const resp = await axiosInstance.get("/blog");
    console.log(resp);

    const resp2 = await axiosInstance.get("/service-category/name");
    console.log(resp2);
  };
  useEffect(() => {
    fatchAll();
  }, []);
  return <h1>heading</h1>;
};

export default Test;
