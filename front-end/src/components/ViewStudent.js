import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentService";

const ViewStudent = () => {
  
  const { id }   = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    id: id,
    firstName: "",
    lastName: "",
    cne: "",
    emailId: "",
    createdAt: "",
  });


  useEffect(() => {
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


  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Détails</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Prénom : {student.firstName}
          </label>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Nom : {student.lastName}
          </label>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            CNE : {student.cne}
          </label>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Email : {student.emailId}
          </label>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={() => navigate("/students")}
            className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
            Retour vers Liste
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
