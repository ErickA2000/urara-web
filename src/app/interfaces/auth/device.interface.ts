export interface IDevice{
    _id?: string,
    idUsuario?: string,
    token?: string,
    estado: string,
    activa: boolean
    dispositivo?: String,
    navegador?: string,
    ipv4?: string,
    ubicacion?: string,
    plataform?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface IDeviceView extends IDevice{
    icon?: string;
    thisDevice?: boolean;
}