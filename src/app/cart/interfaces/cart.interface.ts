export interface ICart {
    _id:       string;
    cliente:   Cliente;
    productos: Producto[];
    __v:       number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Cliente {
    _id:    string;
    nombre: string;
}

interface Producto {
    productID:            ProductID;
    descuento:            number;
    tallasCantidadPrecio: TallasCantidadPrecio;
}

export interface ProductID {
    _id:                  string;
    nombre:               string;
    imagenUrl:            string[];
    tallasCantidadPrecio: TallasCantidadPrecio[];
    descuento:            number;
    estado:               string;
}

interface TallasCantidadPrecio {
    talla:    string;
    cantidad: number;
    precio:   number;
    colores?: Colore[];
    idColor?: colores;
}

interface Colore {
    idColor:  string;
    cantidad: number;
}

interface colores {
    _id:       string;
    nombre:    string;
    hex:       string;
    createdAt?: Date;
    updatedAt?: Date;
    __v:       number;
}