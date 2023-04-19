import { Component } from '@angular/core';
import { ICard } from 'src/app/interfaces/shared/card.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  //tiene que ser un array
  forCard: ICard = {
    title: "prueba",
    img: "assets/img/prueba_card.jpg",
    ref: 1,
    slug: "prueba"
  }
}
