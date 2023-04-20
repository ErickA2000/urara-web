export interface Iprenda{
    _id: string,
    nombre: string,
    referencia: number,
    imagenUrl: string[],
    descripcion: string,
    tallasCantidadPrecio: tallaCantidadPrecio[],
    categoria: categoria[],
    descuento: number,
    slug: string,
    estado: string,
    createdAt: string,
    updatedAt: string
}

export interface tallaCantidadPrecio{
    talla: string,
    cantidad: number,
    precio: number
}

interface categoria{
    _id: string, 
    nombre: string
}