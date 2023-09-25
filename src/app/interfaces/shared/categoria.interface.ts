import { IRES } from "../global.interface";

export interface IResponseAllCategory extends IRES{
    data: Icategoria[]
}

export interface Icategoria {
    _id:         string;
    nombre:      string;
    descripcion: string;
    estado:      string;
    createdAt:   Date;
    updatedAt:   Date;
}