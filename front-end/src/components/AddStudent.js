import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";

const AddStudent = () => {

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, []);
  
  const [student, setStudent] = useState({
    id: "",
    firstName: "",
    lastName: "",
    cne: "",
    emailId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  const saveStudent = (e) => {
    e.preventDefault();
    if (student.firstName && student.lastName && student.emailId) {
      StudentService.saveStudent(student)
      .then((response) => {
        console.log(response);
        navigate("/students");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setStudent({
      id: "",
      firstName: "",
      lastName: "",
      cne: "",
      emailId: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8 mb-4">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Ajouter un étudiant</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Prénom
          </label>
          <input
            type="text"
            name="firstName"
            value={student.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Nom
          </label>
          <input
            type="text"
            name="lastName"
            value={student.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            CNE
          </label>
          <input
            type="text"
            name="cne"
            value={student.cne}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            name="emailId"
            value={student.emailId}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveStudent}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
            Save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-orange-400 hover:bg-orange-700 py-2 px-6">
            Clear
          </button>
          <button
            onClick={() => navigate("/students")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddStudent;
