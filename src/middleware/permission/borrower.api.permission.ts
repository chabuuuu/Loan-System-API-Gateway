export function BorrowerAPIPermission(req: any, res: any, next: any) {
    if (req.user.role === 'Borrower') {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
}