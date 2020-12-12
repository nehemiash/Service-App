export interface Productos {
    ok?: boolean;
    pagina?: number;
    total_paginas?: number;
    total_prod?: number;
    productos?: Producto[];
}

export interface Producto {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    codigo?: string;
    numParte?: string;
    marca?: string;
    modelo?: string;
    categoria?: Categoria;
    img?: any;
}

export interface Categoria {
    _id?: string;
    descripcion?: string;
}


export interface ProductosDetalle {
    ok?: boolean;
    productoDB?: ProductoDetalle;
}

export interface ProductoDetalle {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    codigo?: string;
    numParte?: string;
    marca?: string;
    modelo?: string;
    color?: string;
    categoria?: CategoriaProducto;
}

export interface CategoriaProducto {
    _id?: string;
    descripcion?: string;
}

export interface Marcas {
    marcas: Marca[];
}

export interface Marca {
    _id: string;
}
