export interface IdataUser{
    _id: string,
    nombre: string,
    telefono: telefono,
    email: string,
    username: string,
    clave?: string,
    emailverified: boolean,
    roles: [Iroles],
    verify2fa: Iverify2fa,
    direcciones: Idireccion[]
    createdAt?: string,
    updatedAt?: string
}

export interface Idireccion{
    titulo?: string,
    pais: string,
    departamento: string,
    ciudad: string,
    barrio: string,
    tipocalle: string,
    callenumero: string,
    numero1: string,
    numero2: string,
    especificacionOpcional: string
}

export interface IDataUserOptional{
    nombre?: string,
    telefono?: telefono,
    email?: string,
    username?: string,
    clave?: string,
    verify2fa?: Iverify2fa
    direcciones?: Idireccion[];
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

export interface IChangePassword{
    claveAntigua: string;
    claveNueva: string;
}