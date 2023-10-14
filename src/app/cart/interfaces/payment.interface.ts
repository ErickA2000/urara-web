import { Idireccion, telefono } from "src/app/interfaces/auth/user.interface";
import { ProductoCart } from "./cart.interface";

export interface RequestPayment {
    payservice:           string;
    vendedor:             string;
    telefono:             telefono;
    products:             ProductInPayment[];
    productos:            ProductoCart[];
    direccionFacturacion: Idireccion;
    subtotal:             number;
    descuento:            number;
    iva:                  number;
    iva_moneda:           number;
    total:                number;
}

export interface ProductInPayment {
    title:       string;
    unit_price:  number;
    currency_id: string;
    quantity:    number;
}
