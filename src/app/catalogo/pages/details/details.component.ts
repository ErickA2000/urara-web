import { Component, OnInit } from '@angular/core';
import { Icategoria, Iprenda } from '../../interfaces/prenda.interface';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Router } from '@angular/router';

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
        cantidad: 2,
        precio: 20000,
        talla: "10"
      },{
        cantidad: 20,
        precio: 25000,
        talla: "16"
      }
    ],
    estado: "disponible",
    createdAt: "2023-01-12T18:30:02.976+00:00",
    updatedAt: "2023-01-12T18:30:02.976+00:00"
  }

  stock: number = 0;
  minQuantity: number = 1;
  maxQuantity: number = 100;

  constructor( private fb: FormBuilder, private snackBarService: SnackBarService, private router: Router ){}

  productForm = this.fb.group({
    productID: [ this.prenda._id, [ Validators.required ] ],
    descuento: [ this.prenda.descuento, [ Validators.min(0), Validators.max(100) ] ],
    tallasCantidadPrecio: this.fb.group({
      talla: [ '', [ Validators.required ] ],
      cantidad: [ 1, [ Validators.required, Validators.min(this.minQuantity), Validators.max(this.maxQuantity), Validators.pattern(/^([0-9])*$/) ] ],
      precio: [ 0 , [ Validators.required ]]
    })
  });

  ngOnInit(): void {
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
        this.stock = tcp.cantidad;
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

    for( let tcp of this.prenda.tallasCantidadPrecio ){
      if( tcp.talla == this.productForm.get("tallasCantidadPrecio.talla")?.value ){
        if( value > tcp.cantidad ){
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
    
  }

}
