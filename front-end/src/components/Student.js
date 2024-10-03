import React from "react";
import { useNavigate } from "react-router-dom";

const Student = ({ student, deleteStudent }) => {
  
  const navigate = useNavigate();

  const editStudent = (e, id) => {
    e.preventDefault();
    navigate(`/editStudent/${id}`);
  };

  const viewStudent = (e, id) => {
    e.preventDefault();
    navigate(`/viewStudent/${id}`);
  };

  return (
    <tr key={student.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.lastName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.cne}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.firstName}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.emailId}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{student.createdAt}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap font-medium text-sm flex">
        <a
          onClick={(e, id) => viewStudent(e, student.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">          
          <img src={require('../icons/icon-more-info.png')} alt="icon view" className="view-logo" width="40px" height="90%"/>
        </a>

        <a
          onClick={(e, id) => editStudent(e, student.id)}
          className="text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer">
          <img src={require('../icons/icon-edit.png')} alt="icon edit" className="edit-logo" width="40px" height="90%"/>
        </a>

        <a
          onClick={(e, id) => deleteStudent(e, student.id)}
          className="text-indigo-600 hover:text-indigo-800 hover:cursor-pointer">
          <img src={require('../icons/icon-remove.png')} alt="icon remove" className="remove-logo" width="40px" height="100%"/>
        </a>
      </td>
    </tr>
  );
};

export default Student;
