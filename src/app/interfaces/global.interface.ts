export interface IResponse{
    success: boolean,
    message?: string,
    data?: string | Object
}

export interface IRequestEncrypt {
    reqEncrypt: string;
}

export interface Icountries {
    countries: Country[];
}

export interface Country {
    name_en:      string;
    name_es:      string;
    continent_en: ContinentEn;
    continent_es: ContinentEs;
    capital_en:   string;
    capital_es:   string;
    dial_code:    string;
    code_2:       string;
    code_3:       string;
    tld:          string;
    km2:          number;
}

export enum ContinentEn {
    Africa = "Africa",
    Antarctica = "Antarctica",
    Asia = "Asia",
    Europe = "Europe",
    NorthAmerica = "North America",
    Oceania = "Oceania",
    SouthAmerica = "South America",
}

export enum ContinentEs {
    AméricaDelNorte = "América del Norte",
    AméricaDelSur = "América del Sur",
    Antártida = "Antártida",
    Asia = "Asia",
    Europa = "Europa",
    Oceanía = "Oceanía",
    África = "África",
}