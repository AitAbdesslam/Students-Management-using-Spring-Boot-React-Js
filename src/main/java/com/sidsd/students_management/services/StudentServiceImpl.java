package com.sidsd.students_management.services;

import com.sidsd.students_management.entity.StudentEntity;
import com.sidsd.students_management.model.Student;
import com.sidsd.students_management.repository.StudentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public Student createStudent(Student student) {
        //SimpleDateFormat CreatedAt = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //student.setCreatedAt(CreatedAt.toString());
        StudentEntity employeeEntity = new StudentEntity();
        BeanUtils.copyProperties(student, employeeEntity);
        studentRepository.save(employeeEntity);
        return student;
    }

    @Override
    public List<Student> getAllStudents() {
        List<StudentEntity> studentsEntities = studentRepository.findAll();

        List<Student> students = studentsEntities
                .stream()
                .map(emp -> new Student(
                		emp.getId(),
                        emp.getCne(),
                        emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmailId(),
                        emp.getCreatedAt()))
                .collect(Collectors.toList());
        return students;
    }

    @Override
    public boolean deleteStudent(Long id) {
        StudentEntity student = studentRepository.findById(id).get();
        studentRepository.delete(student);
        return true;
    }

    @Override
    public Student getStudentById(Long id) {
        StudentEntity employeeEntity = studentRepository.findById(id).get();
        Student student = new Student();
        BeanUtils.copyProperties(employeeEntity, student);
        return student;
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        StudentEntity studentEntity = studentRepository.findById(id).get();
        studentEntity.setEmailId(student.getEmailId());
        studentEntity.setCne(student.getCne());
        studentEntity.setFirstName(student.getFirstName());
        studentEntity.setLastName(student.getLastName());
        studentRepository.save(studentEntity);
        return student;
    }
}
