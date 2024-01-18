import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      Welcome here
      <div>
        <Link
          to="/api/users/forget-password"
          className=" flex underline text-blue-800"
        >
          Click here for forget passowrd
        </Link>
      </div>
    </div>
  );
};

export default Home;
