import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/forget-password",
        {
          email,
        }
      );
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data.message.message || "An error occurred");
    }
    setEmail("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Forget Password</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter Your Email
          </label>
          <input
            id="email"
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
