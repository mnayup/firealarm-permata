import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import swal from 'sweetalert';

const Login =() => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const history = useNavigate();
    const Auth = async (e) => {
      e.preventDefault();
  
      axios({
        method: "post",
        url: "http://192.168.100.78:5000/login",
        data: {
          username: username,
          password: password,
        },
      })
        .then(async (respon) => {
          console.log(respon.data);
          await localStorage.setItem("refreshtoken", respon.data.accessToken);
          history("/");
        })
        .catch((err) => {
          console.log(err);
          if (err.message === "Network Error") {
            swal({
              title: "Trouble On Connection",
              text: "Please check your connection",
              icon: "warning",
              button: "OK",
            });
          }
          if (err.response) {
            setMsg(err.response.data.msg);
          }
        });
    };
    return (
        <div style={{backgroundColor:'grey',height:'100vh',width:'100vw',display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',}}>
            <div class="w-full max-w-sm">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Username
                </label>
                <input 
                    // onChange={(val)=>{setUsername(val.target.value)}}
                    onChange={(e) => setUsername(e.target.value)}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username" 
                    value={username}
                    type="text" 
                    placeholder="Username"
                    required/>
                </div>
                <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    // onChange={(val=>{setPassword(val.target.value)})}
                    onChange={(e) => setPassword(e.target.value)}
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password" 
                    value={password}
                    type="password" 
                    placeholder="******************"
                    required/>
                <p class="text-red-500 text-xs italic">{msg}</p>
                </div>
                <div class="flex items-center justify-between">
                <button onClick={Auth} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
                </div>
            </form>
            <p class="text-center text-black-500 text-xs">
                &copy;2022 Bina Area Persada. All rights reserved.
            </p>
            </div>
        </div>
    );
}

export default Login;