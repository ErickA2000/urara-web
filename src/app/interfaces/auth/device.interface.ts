export interface IDevice{
    _id?: string,
    idUsuario?: string,
    token?: string,
    estado: string,
    activa: boolean
    dispositivo?: string,
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

export interface ISortDevices{
    linux?: IDeviceView[];
    windows?: IDeviceView[];
    android?: IDeviceView[];
    ios?: IDeviceView[];
    other?: IDeviceView[];
}