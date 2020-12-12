export interface Clientes {
    ok: boolean;
    pagina: number;
    total_paginas: number;
    total_clientes: number;
    clientes: Cliente[];
}

export interface Cliente {
    _id: string;
    nombre: string;
    empresa?: boolean;
    contacto?: string;
    documento: string;
    estado?: boolean;
    ruc?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    pais?: string;
    creado?: string;
    celular?: string;
    codigo?: number;
}

export interface ClientesDetalle {
    ok: boolean;
    cliente: ClienteDetalle;
}

export interface ClienteDetalle {
    estado?: boolean;
    _id?: string;
    nombre?: string;
    empresa?: boolean;
    contacto?: string;
    documento?: string;
    ruc?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    pais?: string;
    creado?: string;
    celular?: string;
    codigo?: number;
}
