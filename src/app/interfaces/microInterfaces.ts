import { Usuario } from "./interfaces";

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

export interface Notas {
    ok: boolean;
    nota: Nota;
}

export interface Nota {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    usuario?: Usuario;
    tipo?: string;
    creada?: string;
}

export interface ProblemasResp {
    categorias: Problema[];
}

export interface Problema {
    _id: string;
}

export interface NuevoProblemaResp {
    ok?: boolean;
    problema?: NuevoProblema;
}

export interface NuevoProblema {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    categoria?: string;
}

export interface ProblemaAgrup {
    ok?: boolean;
    problema?: ProblemaDetalle[];
}

export interface ProblemaDetalle {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    categoria?: string;
}