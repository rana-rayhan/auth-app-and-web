import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../api/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [isValdiToken, setValidToken] = useState(false);

  useEffect(() => {
    const isValidToken = async () => {
      try {
        const { data } = await axios.post(`${baseUrl}/api/users/verify-token`, {
          token,
        });
        setValidToken(false);
        console.log(data);
      } catch (error) {
        setValidToken(true);
        console.log(error);
        if (error?.response?.data.message.message) {
          console.log(error?.response?.data.message.message);
        } else {
          console.log(error?.response?.data.message);
        }
      }
    };

    isValidToken();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${baseUrl}/api/users/reset-password`, {
        token,
        password,
      })
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        setMessage(
          err.response.data.message.message || err.response.data.message
        );
      });
    setPassword("");
  };

  if (isValdiToken)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className=" text-center text-3xl text-gray-500 m-3">Token expired</h1>
      </div>
    );

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Your Password
            </label>
            <input
              id="password"
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Set Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
