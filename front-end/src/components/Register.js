import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import StudentService from "../services/StudentService";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  },[])
  
  const [MsgError, setMsgError] = useState(false);

  const [user, setUser] = useState({
    id: "",
    email: "",
    username: "",
    password: "",
    token: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };
 
  const reset = (e) => {
    e.preventDefault();
    setUser({
       id : "",
       email: "",
       username: "",
       password: "",
       token: "",
    });
  };


  const handleApi = (e) => {
    e.preventDefault();
    if(user.email && user.username && user.password){
    StudentService.register(user)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          navigate("/login");
        }else {
          setMsgError(true);
        }
      })
      .catch((error) => {
        setMsgError(true);
        console.log(error);
      });
    }
  };

  let msg_error = '';
  if (MsgError) {
    msg_error = <div className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mb-4">Quelque chose mal tourné ! </div>;
  }

  return (
    <div className="flex max-w-2xl mx-auto items-center shadow border-b">
      <div className="px-12 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>S'inscrire</h1>
        </div>
       
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
           Nom d'utilisateur
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
           Email
          </label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4 py-2">
          {msg_error}
          <a className="py-2 px-6 mb-6 table" href="/login">Vous avez déjà un compte ? S'identifier</a>
         <button
            onClick={handleApi}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6 mb-6">
            S'inscrire
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6 mb-6">
            Vider
          </button>
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}

export default Register;