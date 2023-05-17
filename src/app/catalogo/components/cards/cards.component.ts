import { Component, Input } from '@angular/core';
import { ICard } from 'src/app/interfaces/shared/card.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {

  @Input() products!: ICard;

}
