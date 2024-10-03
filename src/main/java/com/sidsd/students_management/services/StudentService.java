package com.sidsd.students_management.services;

import com.sidsd.students_management.model.Student;

import java.util.List;

public interface StudentService {
    Student createStudent(Student employee);

    List<Student> getAllStudents();

    boolean deleteStudent(Long id);

    Student getStudentById(Long id);

    Student updateStudent(Long id, Student employee);
}
