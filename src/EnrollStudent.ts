import CpfValidator from "./CpfValidator";

export type EnrollmentRequest = {
    student: Student
}

export default class EnrollStudent {
    private cpfValidator: CpfValidator;
    private students: Array<Student> = [];
    
    constructor(cpfValidator: CpfValidator){
        this.cpfValidator = cpfValidator;
    }

    execute(enrollmentRequest: EnrollmentRequest) {        
        const student = enrollmentRequest.student
        const regexForValidStudentName = /^([A-Za-z]+ )+([A-Za-z])+$/;
        if(!student || !student.name || !regexForValidStudentName.test(student.name)) throw new Error("Invalid student name");
        if(!student.cpf || !this.cpfValidator.isValid(student.cpf)) throw new Error("Invalid student cpf");
        if(this.isAlreadyStored(student)) throw new Error("Enrollment with duplicated student is not allowed");
        this.students.push(student);        
    }

    private isAlreadyStored(student: Student): boolean {        
        const storedStudent = this.students.find(function (storedStudent: Student){
            return storedStudent.cpf === student.cpf;
        });
        return storedStudent !== undefined
    }
}