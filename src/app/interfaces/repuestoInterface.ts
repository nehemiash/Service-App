export interface Repuestos {
    ok: boolean;
    pagina: number;
    total_paginas: number;
    total_repuesto: number;
    repuestos: Repuesto[];
}

export interface Repuesto {
    estado: boolean;
    _id: string;
    codigo: number;
    descripcion: string;
    marca: string;
    numParte: string;
    categoria?: CategoriaRepuesto;
    stockMin: string;
    precioCosto?: number;
    precioVenta?: number;
}

export interface RepuestosDetalle {
    ok: boolean;
    repuestoDB: RepuestoDetalle;
}

export interface RepuestoDetalle {
    estado?: boolean;
    _id?: string;
    codigo?: number;
    descripcion?: string;
    marca?: string;
    numParte?: string;
    categoria?: CategoriaRepuesto;
    stockMin?: string;
    precioCosto?: number;
    precioVenta?: number;
}

export interface Marcas {
    marcas: Marca[];
}

export interface Marca {
    _id: string;
}

export interface Categoria {
    _id?: string;
    descripcion?: string;
}
export interface CategoriaRepuesto {
    _id?: string;
    descripcion?: string;
}