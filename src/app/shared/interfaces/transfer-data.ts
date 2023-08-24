export interface ItransferDataOrderSummary{
    productos: dataProduct[];
}

interface dataProduct{
    productID: string;
    descuento: number;
    tallasCantidadPrecio: {
        talla: string;
        cantidad: number;
        precio: number;
        idColor: string;
    } 
}