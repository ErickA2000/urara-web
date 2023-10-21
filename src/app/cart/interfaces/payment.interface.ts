import { Idireccion, telefono } from "src/app/interfaces/auth/user.interface";
import { ProductoCart } from "./cart.interface";
import { IRES } from "src/app/interfaces/global.interface";

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

export interface ResponsePayment extends IRES{
    data?: DataRes
}

export interface DataRes {
    payUrl: string;
    data:   any;
}

interface Data {
    body:     Body;
    response: Body;
    status:   number;
}

interface Body {
    additional_info:      string;
    auto_return:          string;
    back_urls:            Urls;
    binary_mode:          boolean;
    client_id:            string;
    collector_id:         number;
    coupon_code:          null;
    coupon_labels:        null;
    date_created:         Date;
    date_of_expiration:   null;
    expiration_date_from: null;
    expiration_date_to:   null;
    expires:              boolean;
    external_reference:   string;
    id:                   string;
    init_point:           string;
    internal_metadata:    null;
    items:                Item[];
    marketplace:          string;
    marketplace_fee:      number;
    metadata:             Metadata;
    notification_url:     string;
    operation_type:       string;
    payer:                Payer;
    payment_methods:      PaymentMethods;
    processing_modes:     null;
    product_id:           null;
    redirect_urls:        Urls;
    sandbox_init_point:   string;
    site_id:              string;
    shipments:            Shipments;
    total_amount:         null;
    last_updated:         null;
}

interface Urls {
    failure: string;
    pending: string;
    success: string;
}

interface Item {
    id:          string;
    category_id: string;
    currency_id: string;
    description: string;
    title:       string;
    quantity:    number;
    unit_price:  number;
}

interface Metadata {
}

interface Payer {
    phone:          Phone;
    address:        Address;
    email:          string;
    identification: Identification;
    name:           string;
    surname:        string;
    date_created:   null;
    last_purchase:  null;
}

interface Address {
    zip_code:      string;
    street_name:   string;
    street_number: null;
}

interface Identification {
    number: string;
    type:   string;
}

interface Phone {
    area_code: string;
    number:    string;
}

interface PaymentMethods {
    default_card_id:           null;
    default_payment_method_id: null;
    excluded_payment_methods:  ExcludedPayment[];
    excluded_payment_types:    ExcludedPayment[];
    installments:              number;
    default_installments:      number;
}

interface ExcludedPayment {
    id: string;
}

interface Shipments {
    default_shipping_method: null;
    receiver_address:        ReceiverAddress;
}

interface ReceiverAddress {
    zip_code:      string;
    street_name:   string;
    street_number: null;
    floor:         string;
    apartment:     string;
    city_name:     null;
    state_name:    null;
    country_name:  null;
}