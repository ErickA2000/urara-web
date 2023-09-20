import { Idireccion } from "../auth/user.interface";

export interface IResponseShopping {
    success: boolean;
    message?: string;
    data?: IData
}

export interface IData {
    docs:          IShopping[];
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

export interface IShopping {
    _id:                  string;
    numFactura:           string;
    cliente:              string;
    vendedor:             string;
    productos:            Producto[];
    direccionFacturacion: Idireccion;
    subtotal:             number;
    descuento:            number;
    iva:                  string;
    iva_moneda:           number;
    total:                number;
    estado:               string;
    isCambioEstado:       boolean;
    idPago:               string;
    idEnvio:              IDEnvio;
    __v:                  number;
    createdAt:            Date;
    updatedAt:            Date;
}

interface IDEnvio {
    _id:             string;
    idCliente:       string;
    tokenServiEnvio: string;
    estado:          string;
    paqueteria:      string;
    montoEnvio:      number;
    __v:             number;
}

interface Producto {
    productID:            ProductID;
    descuento:            number;
    tallasCantidadPrecio: TallasCantidadPrecio;
}

interface ProductID {
    _id:       string;
    nombre:    string;
    imagenUrl: string[];
}

interface TallasCantidadPrecio {
    talla:    string;
    cantidad: number;
    precio:   number;
    idColor:  string;
}