package student.controller;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import student.dao.StudentDao;
import student.entity.Student;

import javax.annotation.Resource;
import javax.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;

/**
 * 学生信息表(Student)表控制层
 *
 * @author hui
 * @date 2022-01-03 19:55:32
 */
@RestController
@RequestMapping("/student")
public class StudentController {

    @Resource
    private StudentDao studentDao;

    @GetMapping("/list")
    public List<Student> list(Student param) {
        //分页对象
//        Pageable pageable = PageRequest.of(page, size);
        //查询条件
        Specification<Student> specification = (root, query, builder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (param.getCollegeName() != null) {
                predicates.add(builder.like(root.get("collegeName"), "%" + param.getCollegeName() + "%"));
            }
            if (param.getClassName() != null) {
                predicates.add(builder.like(root.get("className"), "%" + param.getClassName() + "%"));
            }
            if (param.getStudentId() != null) {
                predicates.add(builder.like(root.get("studentId"), "%" + param.getStudentId() + "%"));
            }
            if (param.getRealName() != null) {
                predicates.add(builder.like(root.get("realName"), "%" + param.getRealName() + "%"));
            }
            return builder.and(predicates.toArray(new Predicate[0]));
        };

        return studentDao.findAll(specification);
    }

    @PostMapping("/save")
    public boolean save(@RequestBody Student student) {
        if (student.getId() != null) {
            Student dbStudent = studentDao.getById(student.getId());
            student.setCreateTime(dbStudent.getCreateTime());
        }
        studentDao.save(student);
        return true;
    }

    @GetMapping("/colleges")
    public List<String> colleges() {
        return studentDao.listColleges();
    }

    @GetMapping("/classes")
    public List<String> classes(String collegeName) {
        return studentDao.listClasses(collegeName);
    }

}

