enum Subject {
    Borrower = 'Borrower',
    Contract = 'Contract',
    Lender = 'Lender',
    User = 'User',

}
const borrower= {
    'read': [
        {
        'subject': Subject.Borrower,
        'condition': 'sameid'
        },
        {
            'subject': Subject.Contract,
            'condition': null
        },
    ],
}