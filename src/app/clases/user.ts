export type Roles = 'CLIENTE' | 'ST' | 'EMPLEADO' | 'ADMIN' | 'OWNER';
export type Estados = 'HABILITADO' | 'SUSPENDIDO' | 'ELIMINADO';
export enum ImportanciaRoles {
    'CLIENTE' = 1,
    'ST' = 2,
    'EMPLEADO' = 3,
    'ADMIN' = 4,
    'OWNER' = 5,
}
export class User {
    uid?: string;
    email?: string;
    displayName?: string;
    emailVerified?: boolean;
    password?: string;
    photoURL?: string;
    role?: Roles;
    securityCode?: string
    dni?: string;
    phoneNumber?: string;
    adress?: string;
    blocked?: string;
    estado?: Estados;
    tareas?: any[];
}
