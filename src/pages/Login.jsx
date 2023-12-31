//* Login page component *//

import { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import FujiLogo from "../assets/FujiLogo.png";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// import { Translate } from "@mui/icons-material";

function Login() {
  //*State for user login and password*//
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const system_no = 2;

  //*Navigate to home page*//
  const navigate = useNavigate();

  //*Database for user login and password*//
  const userDatabase = `http://10.17.66.242:3001/api/smart_planning/filter-user-login-smart-recovery?user_login=${userLogin}&system_no=${system_no}`;

  //*Check user login and password in database*//
  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .get(userDatabase)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (
          data[0].user_login === userLogin &&
          data[0].user_password === password &&
          data[0].system_no === 2
        ) {
          localStorage.setItem("userToken", JSON.stringify(data[0]));
          console.log("Logged in successfully");
          Swal.fire({
            icon: "success",
            title: "Login Success",
            text: "Welcome to IT Management System Recovery",
          });
          navigate("/home");
        } else {
          console.log("Login failed");
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Please check your username or password",
          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error.message);
        Swal.fire({
          icon: "error",
          title: "User does not exist",
          text: "Please check your username or password",
        });
      });

    localStorage.removeItem("guestToken");
  };

  const handleGuest = () => {
    localStorage.setItem(
      "guestToken",
      JSON.stringify({
        user_login: "Guest",
        role_type: "Guest",
        system_no: 2,
        role_no: 4,
      })
    );

    localStorage.removeItem("userToken");

    Swal.fire({
      icon: "warning",
      title: "Guest Mode",
      text: "Guest mode for read only",
    });
  };

  return (
    <>
      <div className="container">
        <div className="h-screen w-screen mx-auto flex flex-col justify-center items-center">
          <div className="flex justify-center">
            <img
              src={FujiLogo}
              alt="fuji"
              className="login-logo"
              style={{
                width: 60,
                margin: 10,
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="font-extrabold text-2xl">Smart IT Management</p>
              <p className="font-bold text-md text-right text-sky-800">
                System Recovery
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="standard"
              margin="normal"
              value={userLogin}
              onChange={(event) => setUserLogin(event.target.value)}
            />
            <br />
            <TextField
              label="Password"
              variant="standard"
              margin="normal"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <br />
            <button
              type="submit"
              className="bg-blue-500 my-8 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700 ease-linear transition-colors duration-300 transform hover:scale-105 motion-reduce:transform-none transfrom active:scale-95 motion-reduce:transfrom-none hover:shadow-blue-100 hover:shadow-lg"
            >
              Login <LockOpenOutlinedIcon sx={{ ml: 1 }} />
            </button>
            <br />
            <Link to="/home" onClick={handleGuest}>
              <p className="text-green-500 hover:scale-105 duration-300 hover:text-yellow-500">
                Go to dashboard with guest
              </p>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
