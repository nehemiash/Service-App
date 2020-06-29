export interface Usuarios {
    ok?: boolean;
    usuarios?: Usuario[];
    cuantos?: number;
}

export interface Usuario {
    role?: string;
    estado?: boolean;
    google?: boolean;
    tecnico?: boolean;
    _id?: string;
    nombre?: string;
    email?: string;
    ultimoLogin?: string;
    creado?: string;
    password?: string;
    telefono?: string;
}

export interface RespUser {
    ok: boolean;
    usuario: Usuario;
}

export interface RespUserDet {
    role: string;
    estado: boolean;
    google: boolean;
    tecnico: boolean;
    _id: string;
    nombre: string;
    email: string;
    creado: string;
    telefono: string;
}

export interface OpcionesMenu {
    icon: string;
    name: string;
    redirectTo: string;
}
