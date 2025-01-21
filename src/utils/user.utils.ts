import { Role } from '@prisma/client';

export function transformRoleToEnumRole(role:string){
    switch(role){
        case "ADMIN":
            return Role.ADMIN
        default:
            return Role.USER
    }
}