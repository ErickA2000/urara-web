import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Icategoria, Icolores, Iprenda } from '../../interfaces/prenda.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';
import { PrendaService } from 'src/app/shared/services/prenda.service';
import { Iprenda2 } from 'src/app/interfaces/shared/prenda.interface';
import { Subscription } from 'rxjs';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { AddCart, ProductoCart } from 'src/app/cart/interfaces/cart.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  actiImg!: string;

  prenda!: Iprenda;

  coloresPrenda!: Icolores[];

  stock: number = 0;
  minQuantity: number = 1;
  maxQuantity: number = 100;

  isColorsMany: boolean = false;

  private ref: string | null = "";
  private $activatedRoute?: Subscription;

  constructor( private fb: FormBuilder, private snackBarService: SnackBarService, private router: Router, @Inject(PLATFORM_ID) private plataformID: Platform,
  private prendaService: PrendaService, private activatedRoute: ActivatedRoute, private dialogsService: DialogsService, private cartService: CartService ){}

  productForm = this.fb.group({
    productID: [ '', [ Validators.required ] ],
    descuento: [ 0, [ Validators.min(0), Validators.max(100) ] ],
    tallasCantidadPrecio: this.fb.group({
      talla: [ '', [ Validators.required ] ],
      cantidad: [ 1, [ Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity), Validators.pattern(/^([0-9])*$/) ] ],
      precio: [ 0 , [ Validators.required ]],
      idColor: [ '', [ Validators.required ] ]
    })
  });

  ngOnInit(): void {
    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }
 
    this.$activatedRoute = this.activatedRoute.paramMap.subscribe( params => {
      this.ref = params.get('ref');
    })
    
    this.getOnePrenda(this.ref as string);

  }

  ngOnDestroy(): void {
    this.$activatedRoute?.unsubscribe();
  }

  getOnePrenda( ref: string ){

    this.dialogsService.openSpinner();

    this.prendaService.getOne( ref ).subscribe( res => {

      if( res.success ){

        this.prenda = res.data!;

        this.productForm.get('productID')?.setValue( res.data?._id || "" );
        this.productForm.get('descuento')?.setValue( res.data?.descuento || 1 );

        this.actiImg = this.prenda.imagenUrl[0];
        this.productForm.get("tallasCantidadPrecio.precio")?.setValue( this.prenda.tallasCantidadPrecio[0].precio );

        this.dialogsService.close();
      }

    })

  }

  changeImg( url: string ){
    this.actiImg = url;
  }

  changeSize( size: string ){
    
    for( let tcp of this.prenda.tallasCantidadPrecio ){
      if( tcp.talla == size ){
        this.productForm.get("tallasCantidadPrecio.precio")?.setValue(tcp.precio);

        this.coloresPrenda = tcp.colores;

        if( this.coloresPrenda.length > 3 ){
          this.isColorsMany = true;
        }else{
          this.isColorsMany = false;
        }

        this.productForm.get('tallasCantidadPrecio.idColor')?.setValue('');
        this.productForm.get('tallasCantidadPrecio.cantidad')?.setValue(1);
        this.stock = 0;

      }
    }

    
  }
  
  changeColor( idColor: string ){
    
    for( let color of this.coloresPrenda ){
      
      if( idColor === color.idColor._id ){
        
        this.productForm.get("tallasCantidadPrecio.idColor")?.setValue(idColor);
        this.stock = color.cantidad;
      }
    }

    if( this.productForm.get("tallasCantidadPrecio.cantidad")?.value! > this.stock ){
      this.productForm.get("tallasCantidadPrecio.cantidad")?.setValue(this.stock);
    }
  }

  verifyQuantityInInput( value: number ){
    
    if( !this.productForm.get("tallasCantidadPrecio.talla")?.value ){
      this.snackBarService.openSnackBar("No se a seleccionado una talla");
    }
    
    for( let color of this.coloresPrenda ){
      if( color.idColor._id == this.productForm.get("tallasCantidadPrecio.idColor")?.value ){
        if( value > color.cantidad ){
          this.snackBarService.openSnackBar("La cantidad es mayor a la disponible");
          this.productForm.setErrors({ quantityOverflow: true });
        }
      }
    }
  }

  addQuantity(){
    if( this.productForm.get('tallasCantidadPrecio.cantidad')?.value! <= this.maxQuantity - 1 ){

      if( this.productForm.get("tallasCantidadPrecio.talla")?.value != '' ){

        if( this.productForm.get("tallasCantidadPrecio.cantidad")?.value != this.stock ){

          let quantityValue = this.productForm.get('tallasCantidadPrecio.cantidad')?.value;
          quantityValue! += 1;
    
          this.productForm.get('tallasCantidadPrecio.cantidad')?.setValue(quantityValue!);

        }else {
          this.snackBarService.openSnackBar( "Cantidad total de productos" )
        }
        
      }else{
        this.snackBarService.openSnackBar( "No se a seleccionado una talla" );
      }


    }else{
      this.snackBarService.openSnackBar( "Cantidad maxima alcanzada" );
    }
  }

  removeQuantity(){
    if( this.productForm.get('tallasCantidadPrecio.cantidad')?.value! > this.minQuantity ){

      if( this.productForm.get("tallasCantidadPrecio.talla")?.value != '' ){
        
        let quantityValue = this.productForm.get('tallasCantidadPrecio.cantidad')?.value;
        quantityValue! -= 1;
  
        this.productForm.get('tallasCantidadPrecio.cantidad')?.setValue(quantityValue!);
      }else{
        this.snackBarService.openSnackBar( "No se a seleccionado una talla" );
      }
      

    }else{
      this.snackBarService.openSnackBar( "Cantiddad minima alcanzada" );
    }
  }

  selectCategoria( categoria: Icategoria){
    this.router.navigate(["/site/catalogo"], { 
      queryParams: { 
        filter: "categoria",
        value: categoria._id
       } 
    });
    
  }

  addToCart(){
    this.dialogsService.openSpinner();

    const product = this.productForm.value as ProductoCart

    this.cartService.addCart( { productos: product } ).subscribe(
      res => {
        this.dialogsService.close()
        this.snackBarService.openSnackBar( res.message || "" );
      }
    )
  }

}
