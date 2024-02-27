import BaseError from "@/utils/baseError";
import roles from "/home/haphuthinh/Documents/Workspace/LoanSystem/Loan-System-API-Gateway/src/auth/abilities";

interface Roles {
    [key: string]: {
        [key: string]: string[];
    };
}

export const checkRole = (action: any, subject: any) => (req: any, res: any, next: any) => {
    try {        
        const userRole: string = req.user.role || 'Anonymous';
        if ((roles as unknown as Roles)[userRole][subject].includes(action) || (roles as unknown as Roles)[userRole][subject].includes('1')) {
            next();
        } else {
            throw new BaseError(403, 'Forbidden', 'You do not have permission to access this resource')
        }
    } catch (error) {
        next(error)
    }
};
