import { Component, Input, OnInit } from '@angular/core';
import { ICart, ProductID } from '../../interfaces/cart.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() products!: ICart;

  minQuantity: number = 1;
  maxQuantity: number = 100;

  constructor( private fb: FormBuilder ){}

  private productForm!: FormGroup;

  productsForm = this.fb.group({
    productos: this.fb.array([ ])
  });


  get getProduct(): FormArray {
    return this.productsForm.controls["productos"] as FormArray;
  }

  ngOnInit(): void {
      for( let product of this.products.productos){
        
        let stockColor: number = 0;
        for( let tcp of product.productID.tallasCantidadPrecio ){
          
          if( product.tallasCantidadPrecio.talla === tcp.talla ){
            for( let color of tcp.colores! ){
              if( color.idColor === product.tallasCantidadPrecio.idColor?._id ){
                stockColor = color.cantidad;
              }
            }
          }
        }

        this.addProduct( { 
          productID: product.productID._id,
          tempProduct: product.productID,
          descuento: product.descuento,
          tallasCantidadPrecio: {
            talla: product.tallasCantidadPrecio.talla,
            cantidad: product.tallasCantidadPrecio.cantidad,
            precio: product.tallasCantidadPrecio.precio,
            idColor: product.tallasCantidadPrecio.idColor?._id || ''
          },
          tempColor: {
            nombre: product.tallasCantidadPrecio.idColor?.nombre || '',
            cantidad: stockColor
          }
         })
      }
    console.log(this.productsForm.value)
  }

  addProduct( product: IaddProduct ){
    this.productForm = this.fb.group({
      productID: [ product.productID, [ Validators.required ] ],
      tempProduct: this.fb.group({
        nombre: [ product.tempProduct.nombre ],
        imagenUrl: [ product.tempProduct.imagenUrl[0] ],
        color: [ product.tempColor.nombre ],
        stockByColor: [ product.tempColor.cantidad ]
      }),
      descuento: [ product.descuento, [ Validators.min(0), Validators.max(100) ] ],
      tallasCantidadPrecio: this.fb.group({
        talla: [ product.tallasCantidadPrecio.talla, [ Validators.required ] ],
        cantidad: [ product.tallasCantidadPrecio.cantidad, [ Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity), Validators.pattern(/^([0-9])*$/) ] ],
        precio: [ product.tallasCantidadPrecio.precio, [ Validators.required ]],
        idColor: [ product.tallasCantidadPrecio.idColor ]
      })
    });

    this.getProduct.push(this.productForm);
  }

  addQuantity(){

  }
  removeQuantity(){}

  verifyQuantityInInput( value: Event ){}

}

interface IaddProduct{
  productID: string;
  tempProduct: ProductID;
  tempColor: {
    nombre: string;
    cantidad: number;
  };
  descuento: number;
  tallasCantidadPrecio: {
    talla: string;
    cantidad: number;
    precio: number;
    idColor: string;
  }
}