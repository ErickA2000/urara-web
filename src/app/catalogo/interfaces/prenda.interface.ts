export interface Iprenda{
    _id: string,
    nombre: string,
    referencia: string,
    imagenUrl: string[],
    descripcion: string,
    tallasCantidadPrecio: tallaCantidadPrecio[],
    categoria: Icategoria[],
    descuento: number,
    slug: string,
    estado: string,
    createdAt: Date,
    updatedAt: Date
}

export interface tallaCantidadPrecio{
    talla: string,
    cantidad: number,
    precio: number
    colores: Icolores[]
}

export interface Icategoria{
    _id: string, 
    nombre: string
}

export interface Icolores {
    idColor:  Icolor;
    cantidad: number;
}

interface Icolor {
    _id:       string;
    nombre:    string;
    hex:       string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?:       number;
}