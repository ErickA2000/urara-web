import { Component, Input, OnInit } from '@angular/core';
import { ICart, ProductID } from '../../interfaces/cart.interface';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

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

  productsForm = this.fb.group({
    productos: this.fb.array([])
  });

  get getProduct(): FormArray {
    return this.productsForm.controls["productos"] as FormArray;
  }

  ngOnInit(): void {
      for( let product of this.products.productos){
        this.addProduct( { 
          productID: product.productID._id,
          tempProduct: product.productID,
          descuento: product.descuento,
          tallasCantidadPrecio: {
            talla: product.tallasCantidadPrecio.talla,
            cantidad: product.tallasCantidadPrecio.cantidad,
            precio: product.tallasCantidadPrecio.precio,
            idColor: product.tallasCantidadPrecio.idColor?._id || ''
          }
         })
      }
    
  }

  addProduct( product: IaddProduct ){
    const productForm = this.fb.group({
      productID: [ product.productID, [ Validators.required ] ],
      tempProduct: [],
      descuento: [ product.descuento, [ Validators.min(0), Validators.max(100) ] ],
      tallasCantidadPrecio: this.fb.group({
        talla: [ product.tallasCantidadPrecio.talla, [ Validators.required ] ],
        cantidad: [ product.tallasCantidadPrecio.cantidad, [ Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity), Validators.pattern(/^([0-9])*$/) ] ],
        precio: [ product.tallasCantidadPrecio.precio, [ Validators.required ]],
        idColor: [ product.tallasCantidadPrecio.idColor ]
      })
    });

    this.getProduct.push(productForm);
  }

  addQuantity(){

  }
  removeQuantity(){}

  verifyQuantityInInput( value: Event ){}

}

interface IaddProduct{
  productID: string;
  tempProduct: ProductID;
  descuento: number;
  tallasCantidadPrecio: {
    talla: string;
    cantidad: number;
    precio: number;
    idColor: string;
  }
}