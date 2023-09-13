import { telefono } from "./user.interface";

export interface Icredenciales {
    username: string,
    clave: string
}

export interface IcredencialesEncrypt {
    reqEncrypt: string;
}

export interface IResponseLogin{
    success: boolean,
    message: string,
    data?: string
}

export interface IDataRegister{
    nombre: string,
    telefono: telefono,
    email: string,
    username: string,
    clave: string,
}