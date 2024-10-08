import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentService";

const UpdateStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    id: id,
    firstName: "",
    lastName: "",
    cne: "",
    emailId: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setStudent({ ...student, [e.target.name]: value });
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    const fetchData = async () => {
      try {
        const response = await StudentService.getStudentById(student.id);
        setStudent(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const updateStudent = (e) => {
    e.preventDefault();
    console.log(student);
    if (student.firstName && student.lastName && student.emailId) {
      StudentService.updateStudent(student, id)
      .then((response) => {
        navigate("/students");
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Modification</h1>
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
            onClick={updateStudent}
            className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
            Update
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

export default UpdateStudent;
