import { Subject } from "/home/haphuthinh/Documents/Workspace/LoanSystem/Loan-System-API-Gateway/src/auth/subject"
//Permission alias: 
/*
+ 1: manage
+ 2: read
+ 3: write
+ 4: delete
+ 5: update
*/
//Subject alias:
/*
+ 1: Borrower
+ 2: Employee
+ 3: Lender
+ 4: Contract
+ 5: LoanPackage
+ 6: Schedule
*/
const Admin = {"1": [1], "2": [1], "3": [1], "4": [1], "5": [1], "6": [1]}
const Employee = {"1": [1], "2": [2], "3": [1], "4": [1], "5": [1], "6": [2]}
const Lender = {"1": [], "2": [], "3": [], "4": [1], "5": [2], "6": []}
const Borrower = {"1": [2], "2": [], "3": [], "4": [], "5": [2], "6": []}
const roles = {Admin, Employee, Lender, Borrower}
// const roles = {

//     Admin: {
//         [Subject.Borrower]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Employee]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Lender]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Contract]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.LoanPackage]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Schedule]: {
//             can : [
//                 'manage'
//             ]
//         },
//     },
//     Employee: {
//         [Subject.Borrower]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Employee]: {
//             can : [
//                 'read'
//             ]
//         },
//         [Subject.Lender]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Contract]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.LoanPackage]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.Schedule]: {
//             can : [
//                 'read'
//             ]
//         },
//     },
//     Lender : {
//         [Subject.Borrower]: {
//             can : []
//         },
//         [Subject.Employee]: {
//             can : []
//         },
//         [Subject.Lender]: {
//             can : []
//         },
//         [Subject.Contract]: {
//             can : [
//                 'manage'
//             ]
//         },
//         [Subject.LoanPackage]: {
//             can : [
//                 'read'
//             ]
//         },
//         [Subject.Schedule]: {
//             can : []
//         },
//     },
//     Borrower : {
//         [Subject.Borrower]: {
//             can : ['read']
//         },
//         [Subject.Employee]: {
//             can : []
//         },
//         [Subject.Lender]: {
//             can : []
//         },
//         [Subject.Contract]: {
//             can : []
//         },
//         [Subject.LoanPackage]: {
//             can : [
//                 'read'
//             ]
//         },
//         [Subject.Schedule]: {
//             can : []
//         },
//     }
// }
export default roles