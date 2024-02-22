const root = process.env.ROOT_URL || "/api/v1";

export function proxy(app: any, endpoint: string){
    switch (endpoint) {
        case `${root}/borrower`:
            
            break;
    
        default:
            break;
    }
}