import { IRES } from "../global.interface";

export interface IResponsePrenda extends IRES{
    data?: IData
}

export interface IResponseOnePrenda extends IRES{
    data?: Iprenda2
}

export interface IData {
    docs:          Iprenda[];
    totalDocs:     number;
    limit:         number;
    totalPages:    number;
    page:          number;
    pagingCounter: number;
    hasPrevPage:   boolean;
    hasNextPage:   boolean;
    prevPage:      number;
    nextPage:      number;
}

export interface Iprenda {
    _id:                  string;
    nombre:               string;
    referencia:           string;
    slug:                 string;
    imagenUrl:            string[];
    descripcion:          string;
    tallasCantidadPrecio: TallasCantidadPrecio[];
    descuento:            number;
    estado:               string;
    categoria:            Categoria[];
    createdAt:            Date;
    updatedAt:            Date;
}

interface Categoria {
    _id:    string;
    nombre: string;
}

interface TallasCantidadPrecio {
    talla:    string;
    cantidad: number;
    precio:   number;
    colores:  Colore[];
}

interface Colore {
    idColor:  string;
    cantidad: number;
}

export interface Iprenda2 {
    _id:                  string;
    nombre:               string;
    referencia:           string;
    slug:                 string;
    imagenUrl:            string[];
    descripcion:          string;
    tallasCantidadPrecio: TallasCantidadPrecios[];
    descuento:            number;
    estado:               string;
    categoria:            Categoria[];
    createdAt:            Date;
    updatedAt:            Date;
}

interface TallasCantidadPrecios {
    talla:    string;
    cantidad: number;
    precio:   number;
    colores:  Coloress[];
}

interface Coloress {
    idColor:  IDColor;
    cantidad: number;
}

interface IDColor {
    _id:    string;
    nombre: string;
    hex:    string;
}