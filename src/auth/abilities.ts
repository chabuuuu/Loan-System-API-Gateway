let Admin : any = {level: 0}
let Employee : any = {level: 1}
let Lender : any = {level: 2}
let Borrower : any = {level :3}

Admin['Loanpackage'] = ['full-control']
Admin['Contract'] = ['full-control']
Admin['Schedule'] = ['full-control']

Employee['Loanpackage'] = ['full-control']
Employee['Contract'] = ['read', 'write']

Lender['Loanpackage'] = ['read']

Borrower['Loanpackage'] = ['read']

const roles : any = {Admin, Employee, Lender, Borrower}

export default roles
