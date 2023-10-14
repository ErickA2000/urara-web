export interface ItransferDataOrderSummary{
    productos: dataProduct[];
    iva?: number;
    iva_moneda?: number;
    subtotal?: number;
    total?: number;
}

interface dataProduct{
    productID: string;
    tempProduct?: {
        color: string
        imagenUrl: string
        nombre: string;
        precio: string
        stockByColor: number
    };
    descuento: number;
    tallasCantidadPrecio: {
        talla: string;
        cantidad: number;
        precio: number;
        idColor: string;
    } 
}