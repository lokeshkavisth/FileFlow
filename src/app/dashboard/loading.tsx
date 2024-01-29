import React from "react";
import { HashLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <HashLoader color="#36d7b7" />
    </div>
  );
};

export default Loading;
