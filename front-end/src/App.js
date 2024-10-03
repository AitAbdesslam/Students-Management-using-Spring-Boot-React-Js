import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import UpdateStudent from "./components/UpdateStudent";
import ViewStudent from "./components/ViewStudent";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<StudentList />}></Route>
          <Route path="/students" element={<StudentList />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/fetchUsers" element={<fetchUsers />} />
          <Route path="/editStudent/:id" element={<UpdateStudent />} />
          <Route path="/viewStudent/:id" element={<ViewStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
