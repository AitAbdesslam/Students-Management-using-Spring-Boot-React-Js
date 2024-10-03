import React ,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);


  useEffect(() => {
      if (localStorage.getItem('token')) {
        setisLogin(true);
      }
  },[]);

  const Logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar bg-gray-800">
      <div className="h-16 px-8 py-4 items-center">
        <p className="text-white font-bold">
          <span>Gestion des étudiants</span>
        {isLogin && <button onClick={Logout} className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Se déconnecter</button>}
        </p>
        </div>
    </div>
  );
};

export default Navbar;
