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