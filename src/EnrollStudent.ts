import CpfValidator from "./CpfValidator";

export default class EnrollStudent {
    private cpfValidator: CpfValidator;
    private students: Array<any> = [];
    
    constructor(cpfValidator: CpfValidator){
        this.cpfValidator = cpfValidator;
    }

    execute(enrollmentRequest: any) {        
        const student = enrollmentRequest.student
        const regexForValidStudentName = /^([A-Za-z]+ )+([A-Za-z])+$/;
        if(!student || !student.name || !regexForValidStudentName.test(student.name)) throw new Error("Invalid student name");
        if(!student.cpf || !this.cpfValidator.isValid(student.cpf)) throw new Error("Invalid student cpf");
        if(this.isAlreadyStored(student)) throw new Error("Enrollment with duplicated student is not allowed");
        this.students.push(student);        
    }

    private isAlreadyStored(student: any): boolean {
        return this.students.find(function (storedStudent: any){
            return storedStudent.cpf === student.cpf
        });
    }
}