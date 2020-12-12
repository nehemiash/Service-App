export interface Usuarios {
    ok?: boolean;
    pagina?: number;
    total_paginas?: number;
    total_usuarios?: number;
    usuarios?: Usuario[];
}

export interface Usuario {
    estado?: boolean;
    _id?: string;
    nombre?: string;
    role?: string;
    email?: string;
    password?: string;
    telefono?: string;
    tecnico?: boolean;
    funcion?: string;
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

export interface Paises {
    id: number;
    name: string;
}