export interface IResponsePrenda{
    success: boolean;
    message?: string;
    data?: IData
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

export interface Categoria {
    _id:    string;
    nombre: string;
}

export interface TallasCantidadPrecio {
    talla:    string;
    cantidad: number;
    precio:   number;
    colores:  Colore[];
}

export interface Colore {
    idColor:  string;
    cantidad: number;
}