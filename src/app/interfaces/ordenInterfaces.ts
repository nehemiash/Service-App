import { Categoria } from './repuestoInterface';

export interface Ordenes {
    ok?: boolean;
    ordenes?: Orden[];
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
    valorPcs?: number;
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
    celular?: string;
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
    descripcion?: string;
    categoria?: string;
}


export interface OrdenDetalleResp {
    ok?: boolean;
    orden?: OrdenDetalle;
}

export interface OrdenDetalle {
    problema1?: Problema1[];
    problema2?: Problema1[];
    notas?: any[];
    completada?: boolean;
    _id?: string;
    numero?: number;
    creado?: string;
    serie1?: string;
    serie2?: string;
    producto?: ProductoD;
    fechaCompra?: string;
    cobertura?: string;
    cliente?: ClienteD;
    ubicacion?: string;
    accesorios?: string;
    notaCliente?: string;
    obs?: string;
    aspecto?: string;
    tecnico?: Tecnico;
    usuario?: Tecnico;
    repuestos?: any[];
    aprobado?: boolean;
    fechaAprob?: string;
    valorPreapro?: number;
    valorPcs?: number;
    valorMo?: number;
    costoFlete?: number;
    valorTotal?: number;
    descuento?: number;
    situacion?: string;
}

export interface Tecnico {
    _id?: string;
    nombre?: string;
}

export interface ClienteD {
    _id?: string;
    codigo?: number;
    nombre?: string;
    telefono?: string;
    celular?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    pais?: string;
}

export interface ProductoD {
    _id?: string;
    descripcion?: string;
    codigo?: string;
    marca?: string;
    modelo?: string;
}

export interface Problema1 {
    _id?: string;
    descripcion?: string;
}
