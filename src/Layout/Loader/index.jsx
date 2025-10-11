import React from "react";
import { ThreeDots } from "react-loader-spinner"; // choose any spinner

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loader-wrapper">
      <div className="loader-index">
       <ThreeDots
  visible={true}
  height="80"
  width="80"
  color="#7366ff"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
   </div>
  );
};

export default Loader;
