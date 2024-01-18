import React from "react";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword";
import Home from "./components/Home";
import ForgetPassword from "./components/ForgetPassword";

const App = () => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/api/users/reset-password/:token"
          element={<ResetPassword />}
        />
        <Route path="/api/users/forget-password" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
