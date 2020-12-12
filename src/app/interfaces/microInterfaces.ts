export interface Categorias {
    ok?: boolean;
    categorias?: Categoria[];
}

export interface CategSorts {
    categorias: Categoria[];
}

export interface Categoria {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    tipo?: string;
}

export interface NuevaCategoriaResp {
    ok: boolean;
    categorias: NuevaCategoria;
}

export interface NuevaCategoria {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    tipo?: string;
}

export interface CategoriasDetalle {
    ok: boolean;
    categoria: CategoriaDetalle;
}

export interface CategoriaDetalle {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    tipo?: string;
}