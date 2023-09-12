export interface IdataUser{
    _id: string,
    nombre: string,
    telefono: telefono,
    email: string,
    username: string,
    clave?: string,
    emailverified: boolean,
    roles: [Iroles],
    verify2fa: Iverify2fa
    createdAt?: string,
    updatedAt?: string
}

interface Iroles{
    _id: string,
    nombre: string
}

export interface telefono{
    codigo_area: string;
    numero: string;
}

export interface Iverify2fa{
    estado: boolean;
    fechaActivacion?: Date,
    metodos: ImetodoVerify[],
    code_access: string
}

export interface ImetodoVerify{
    tipo: string;
    estado: boolean
}
