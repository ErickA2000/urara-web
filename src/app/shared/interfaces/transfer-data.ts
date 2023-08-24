export interface ItransferDataOrderSummary{
    productos: dataProduct[];
    subtotal?: number;
    total?: number;
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