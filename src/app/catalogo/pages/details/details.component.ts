import { Component, OnInit } from '@angular/core';
import { Iprenda } from '../../interfaces/prenda.interface';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor( private fb: FormBuilder ){}

  productForm = this.fb.group({
    productID: [ this.prenda._id, [ Validators.required ] ],
    descuento: [ this.prenda.descuento, [ Validators.min(0), Validators.max(0) ] ],
    tallasCantidadPrecio: this.fb.group({
      talla: [ '', [ Validators.required ] ],
      cantidad: [ 1, [ Validators.required, Validators.min(1), Validators.max(100), Validators.pattern(/^([0-9])*$/) ] ],
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
      }
    }
  }

  addQuantity(){
    if( this.productForm.get('tallasCantidadPrecio.cantidad')?.value! <= 99 ){

      if( this.productForm.get("tallasCantidadPrecio.talla")?.value != '' ){
        
        let quantityValue = this.productForm.get('tallasCantidadPrecio.cantidad')?.value;
        quantityValue! += 1;
  
        this.productForm.get('tallasCantidadPrecio.cantidad')?.setValue(quantityValue!);
      }


    }
  }

  removeQuantity(){
    if( this.productForm.get('tallasCantidadPrecio.cantidad')?.value! >= 1 ){

      if( this.productForm.get("tallasCantidadPrecio.talla")?.value != '' ){
        
        let quantityValue = this.productForm.get('tallasCantidadPrecio.cantidad')?.value;
        quantityValue! -= 1;
  
        this.productForm.get('tallasCantidadPrecio.cantidad')?.setValue(quantityValue!);
      }
      

    }
  }

}
