import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Icategoria, Icolores, Iprenda } from '../../interfaces/prenda.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  actiImg!: string;

  prenda: Iprenda = {
    _id: "aaaa",
    nombre: "blusa de dama estilo de algo",
    referencia: 1,
    imagenUrl: ["assets/img/prueba_card.jpg", "assets/img/home/1.png"],
    descuento: 0,
    descripcion: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae quod nostrum maxime temporibus, 
                  labore esse in? Voluptatum quaerat, quis suscipit laudantium accusamus nisi quod ab quidem quia deleniti iusto sed.`,
    categoria: [ {
      _id: "aaaa",
      nombre: "niña"
    },
    {
      _id: "aaasss",
      nombre: "blusas"
    } ],
    slug: "prueba",
    tallasCantidadPrecio: [{
      talla: "32",
      cantidad: 10,
      precio: 55000,
      colores: [
        {
          idColor: {
            _id: "64dd1faeed3ee9e3b2de5ff7",
            nombre: "Morado",
            hex: "#e900fa"

          },
          cantidad: 10
        }
      ]
    },
    {
      talla: "16",
      cantidad: 20,
      precio: 50000,
      colores: [
        {
          idColor: {
            _id: "64dd1faeed3ee9e3b2de5ff7",
            nombre: "Morado",
            hex: "#e900fa"

          },
          cantidad: 5
        },{
          idColor: {
            _id: "64da83aca54b1f5b95de04c1",
            nombre: "gris",
            hex: "#808080"

          },
          cantidad: 10
        },{
          idColor: {
            _id: "64da83d3a54b1f5b95de04c7",
            nombre: "blanco",
            hex: "#ffffff"

          },
          cantidad: 10
        },{
          idColor: {
            _id: "64da83e1a54b1f5b95de04cd",
            nombre: "negro",
            hex: "#000000"

          },
          cantidad: 10
        }
      ]
    }],
    estado: "disponible",
    createdAt: "2023-01-12T18:30:02.976+00:00",
    updatedAt: "2023-01-12T18:30:02.976+00:00"
  }

  coloresPrenda!: Icolores[];

  stock: number = 0;
  minQuantity: number = 1;
  maxQuantity: number = 100;

  isColorsMany: boolean = false;

  constructor( private fb: FormBuilder, private snackBarService: SnackBarService, private router: Router, @Inject(PLATFORM_ID) private plataformID: Platform ){}

  productForm = this.fb.group({
    productID: [ this.prenda._id, [ Validators.required ] ],
    descuento: [ this.prenda.descuento, [ Validators.min(0), Validators.max(100) ] ],
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

      this.actiImg = this.prenda.imagenUrl[0];
      this.productForm.get("tallasCantidadPrecio.precio")?.setValue( this.prenda.tallasCantidadPrecio[0].precio );
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
    this.router.navigate(["/catalogo"], { 
      queryParams: { 
        categoria: categoria._id
       } 
    });
    
  }

  addToCart(){
    console.log("Add a product to cart:", this.productForm.value);
  }

}
