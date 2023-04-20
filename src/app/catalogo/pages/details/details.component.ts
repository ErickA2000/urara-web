import { Component, OnInit } from '@angular/core';
import { Iprenda } from '../../interfaces/prenda.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  actiImg!: string;

  prenda: Iprenda = {
    _id: "aaaa",
    nombre: "prueba",
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

  ngOnInit(): void {
      this.actiImg = this.prenda.imagenUrl[0];
  }

  changeImg( url: string ){
    this.actiImg = url;
  }

}
