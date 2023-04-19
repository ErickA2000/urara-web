import { Component } from '@angular/core';
import { ICard } from 'src/app/interfaces/shared/card.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
  //tiene que ser un array
  forCard: ICard = {
    title: "prueba",
    img: "assets/img/prueba_card.jpg",
    ref: 1,
    slug: "prueba"
  }
}
