import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICart, ProductID, UpdateCart } from '../../interfaces/cart.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import { ItransferDataOrderSummary } from 'src/app/shared/interfaces/transfer-data';
import { CartService } from '../../services/cart.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() products?: ICart;

  minQuantity: number = 1;
  maxQuantity: number = 100;

  constructor(private fb: FormBuilder, private snackBarService: SnackBarService, private transferDataLocalService: TransferDataLocalService,
    private cartService: CartService, private dialogService: DialogsService ) { }

  private productForm!: FormGroup;

  productsForm = this.fb.group({
    productos: this.fb.array([])
  });

  private timer: any;
  private delayValue = 500;
  private timer2: any;
  private timer3: any;

  get getProduct(): FormArray {
    return this.productsForm.controls["productos"] as FormArray;
  }

  ngOnInit(): void {
    if( this.products && this.products.productos.length > 0 ){

      for (let product of this.products.productos) {
  
        let stockColor: number = 0;
        for (let tcp of product.productID.tallasCantidadPrecio) {
  
          if (product.tallasCantidadPrecio.talla === tcp.talla) {
            for (let color of tcp.colores!) {
              if (color.idColor === product.tallasCantidadPrecio.idColor?._id) {
                stockColor = color.cantidad;
              }
            }
          }
        }
  
        this.addProduct({
          productID: product.productID._id,
          tempProduct: { ...product.productID, precio: product.tallasCantidadPrecio.precio },
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
    }

    this.timer2 = setTimeout( () => {
      this.transferData();
    }, 2000);

  }

  ngOnDestroy(): void {
      clearTimeout(this.timer);
      clearTimeout(this.timer2);
      clearTimeout(this.timer3);
  }

  private addProduct(product: IaddProduct) {
    let price: number = 0;
    if( product.descuento != 0 ){
      const valorAdescontar = product.tempProduct.precio * (product.descuento/100);
      price = product.tempProduct.precio - valorAdescontar;

    }else{
      price = product.tempProduct.precio;
    }

    this.productForm = this.fb.group({
      productID: [product.productID, [Validators.required]],
      tempProduct: this.fb.group({
        nombre: [product.tempProduct.nombre],
        imagenUrl: [product.tempProduct.imagenUrl[0]],
        color: [product.tempColor.nombre],
        stockByColor: [product.tempColor.cantidad],
        precio: [product.tempProduct.precio]
      }),
      descuento: [product.descuento, [Validators.min(0), Validators.max(100)]],
      tallasCantidadPrecio: this.fb.group({
        talla: [product.tallasCantidadPrecio.talla, [Validators.required]],
        cantidad: [product.tallasCantidadPrecio.cantidad, [Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity), Validators.pattern(/^([0-9])*$/)]],
        precio: [price, [Validators.required]],
        idColor: [product.tallasCantidadPrecio.idColor]
      })
    });

    this.getProduct.push(this.productForm);
  }

  addQuantity(index: number, quantityStock: number) {
    let indiceRecorrido = 0;

    for (let control of this.getProduct.controls) {

      if (indiceRecorrido === index) {
        if (control instanceof FormGroup) {

          if (control.get('tallasCantidadPrecio.cantidad')?.value <= this.maxQuantity - 1) {

            let valueQuantity = control.get('tallasCantidadPrecio.cantidad')?.value;
            valueQuantity += 1;

            if (valueQuantity > quantityStock) {
              this.snackBarService.openSnackBar("La cantidad solicitada es mayor a la ofrecida");
            } else {
              control.get('tallasCantidadPrecio.cantidad')?.setValue(valueQuantity);

              //Realizar enviar datos al componete de order summary
              this.transferData();
              
            }

          } else {
            this.snackBarService.openSnackBar("Cantidad maxima alcanzada");
          }

        }
      }
      indiceRecorrido++;
    }

    this.sendDataBackEnd();

  }

  removeQuantity(index: number) {
    let indiceRecorrido = 0;

    for (let control of this.getProduct.controls) {

      if (indiceRecorrido === index) {
        if (control instanceof FormGroup) {

          if (control.get('tallasCantidadPrecio.cantidad')?.value > this.minQuantity) {

            let valueQuantity = control.get('tallasCantidadPrecio.cantidad')?.value;
            valueQuantity -= 1;

            if (valueQuantity <= 0) {
              this.snackBarService.openSnackBar("La cantidad solicitada es menor a la ofrecida");
            } else {
              control.get('tallasCantidadPrecio.cantidad')?.setValue(valueQuantity);

              //Realizar enviar datos al componete de order summary y llamado a la api
              this.transferData();
            }

          } else {
            this.snackBarService.openSnackBar("Cantidad minima alcanzada");
          }

        }
      }
      indiceRecorrido++;
    }

    this.sendDataBackEnd();
  }

  verifyQuantityInInput( quantityStock: number, control: AbstractControl) {
    
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      
      if (control.dirty) {
        
        if (control.get('cantidad')?.value > this.minQuantity && control.get('cantidad')?.value <= this.maxQuantity - 1) {
  
          const valueQuantity = control.get('cantidad')?.value;
  
          if (valueQuantity < 1) {

            control.get('cantidad')?.setValue(1);
            //Realizar enviar datos al componete de order summary y llamado a la api
            this.transferData();
            this.snackBarService.openSnackBar("La cantidad solicitada es menor a la ofrecida");

          } else if(valueQuantity > quantityStock){

            control.get('cantidad')?.setValue(quantityStock);
            //Realizar enviar datos al componete de order summary y llamado a la api
            this.transferData();
            this.snackBarService.openSnackBar("La cantidad solicitada es mayor a la ofrecida");

          }
          else {
            control.get('cantidad')?.setValue(valueQuantity);
            //Realizar enviar datos al componete de order summary y llamado a la api
            this.transferData();
          }
  
        } else {
          control.get('cantidad')?.setValue(1);
          //Realizar enviar datos al componete de order summary y llamado a la api
          this.transferData();
          this.snackBarService.openSnackBar("Cantidad limite alcanzada");
        }
      }
    }, this.delayValue)
    
  }

  removeProduct( index: number ){
    this.dialogService.openSpinner();

    this.getProduct.removeAt(index);

    //Realizar enviar datos al componete de order summary y llamado a la api
    this.transferData();

    this.cartService.deleteProdcutCart( index ).subscribe(
      res => {
        this.snackBarService.openSnackBar( res.message || "" );
        this.dialogService.close();
      }
    );
  }

  private transferData(){
    // for( let control of this.getProduct.controls ){
    //   control.get("tempProduct")?.disable();
    // }
    
    this.transferDataLocalService.transferDataOrderSummary.emit(this.productsForm.value as ItransferDataOrderSummary);

    // for( let control of this.getProduct.controls ){
    //   control.get("tempProduct")?.enable();
    // }
  }

  private sendDataBackEnd( delayValue?: number ){
    
    if( !delayValue ) delayValue = 1000;
    
    this.timer3 = setTimeout( () => {
      this.dialogService.openSpinner();

      for( let control of this.getProduct.controls ){
        control.get("tempProduct")?.disable();
      }

      const data = this.productsForm.value as UpdateCart
      
      this.cartService.updateProductCart( data ).subscribe(
        res => {

          for( let control of this.getProduct.controls ){
            control.get("tempProduct")?.enable();
          }
    
          this.dialogService.close();
          this.snackBarService.openSnackBar( res.message || "" );
        }
      )
  

    }, delayValue );

  }

}

interface IaddProduct {
  productID: string;
  tempProduct: ProductID & {
    precio: number
  };
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