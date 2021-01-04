import { Categoria } from './repuestoInterface';

export interface OrdenResp {
    ok?: boolean;
    orden?: Orden;
}

export interface Orden {
    problema1?: Problema[];
    problema2?: Problema[];
    notas?: Nota[];
    obs?: string;
    completada?: boolean;
    _id?: string;
    numero?: number;
    creado?: string;
    serie1?: string;
    serie2?: string;
    producto?: Producto;
    fechaCompra?: string;
    cobertura?: string;
    cliente?: Cliente;
    ubicacion?: string;
    accesorios?: string;
    notaCliente?: string;
    aspecto?: string;
    reporte?: string;
    tecnico?: string;
    usuario?: Usuario;
    aprobado?: boolean;
    fechaAprob?: Date;
    valorPreapro?: number;
    valorMo?: number;
    costoFlete?: number;
    valorpcs?: number;
    valorTotal?: number;
    descuento?: number;
    situacion?: string;
    repuestos?: any[];
}

export interface Usuario {
    _id?: string;
}

export interface Cliente {
    _id?: string;
    codigo?: number;
    nombre?: string;
    telefono?: string;
    direccion?: string;
    email?: string;
    documento?: string;
}

export interface Producto {
    estado?: boolean;
    _id?: string;
    descripcion?: string;
    codigo?: string;
    numParte?: string;
    marca?: string;
    modelo?: string;
    configuracion?: string;
    color?: string;
    categoria?: Categoria;
    img?: any;

}

export interface Nota {
    _id?: string;
}

export interface Problema {
    _id?: string;
}

