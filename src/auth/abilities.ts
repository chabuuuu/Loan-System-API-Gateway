import { Subject } from "/home/haphuthinh/Documents/Workspace/LoanSystem/Loan-System-API-Gateway/src/auth/subject"
const roles = {
    Admin: {
        [Subject.Borrower]: {
            can : [
                'manage'
            ]
        },
        [Subject.Employee]: {
            can : [
                'manage'
            ]
        },
        [Subject.Lender]: {
            can : [
                'manage'
            ]
        },
        [Subject.Contract]: {
            can : [
                'manage'
            ]
        },
        [Subject.LoanPackage]: {
            can : [
                'manage'
            ]
        },
        [Subject.Schedule]: {
            can : [
                'manage'
            ]
        },
    },
    Employee: {
        [Subject.Borrower]: {
            can : [
                'manage'
            ]
        },
        [Subject.Employee]: {
            can : [
                'read'
            ]
        },
        [Subject.Lender]: {
            can : [
                'manage'
            ]
        },
        [Subject.Contract]: {
            can : [
                'manage'
            ]
        },
        [Subject.LoanPackage]: {
            can : [
                'manage'
            ]
        },
        [Subject.Schedule]: {
            can : [
                'read'
            ]
        },
    },
    Lender : {
        [Subject.Borrower]: {
            can : []
        },
        [Subject.Employee]: {
            can : []
        },
        [Subject.Lender]: {
            can : []
        },
        [Subject.Contract]: {
            can : [
                'manage'
            ]
        },
        [Subject.LoanPackage]: {
            can : [
                'read'
            ]
        },
        [Subject.Schedule]: {
            can : []
        },
    },
    Borrower : {
        [Subject.Borrower]: {
            can : ['read']
        },
        [Subject.Employee]: {
            can : []
        },
        [Subject.Lender]: {
            can : []
        },
        [Subject.Contract]: {
            can : []
        },
        [Subject.LoanPackage]: {
            can : [
                'read'
            ]
        },
        [Subject.Schedule]: {
            can : []
        },
    }
}
export default roles