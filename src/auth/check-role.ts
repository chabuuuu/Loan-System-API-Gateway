import BaseError from "@/utils/baseError";
import roles from "/home/haphuthinh/Documents/Workspace/LoanSystem/Loan-System-API-Gateway/src/auth/abilities";

interface Roles {
    [key: string]: {
        [key: string]: {
            can: string[];
        };
    };
}

export const checkRole = (action: any, subject: any) => (req: any, res: any, next: any) => {
    try {        
        const userRole: string = req.user.role || 'Anonymous';
        if ((roles as Roles)[userRole][subject].can.includes(action) || (roles as Roles)[userRole][subject].can.includes('manage')) {
            next();
        } else {
            throw new BaseError(403, 'Forbidden', 'You do not have permission to access this resource')
        }
    } catch (error) {
        next(error)
    }
};
