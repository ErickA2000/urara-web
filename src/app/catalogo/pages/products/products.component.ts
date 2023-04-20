import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { BottonSheetFilterComponent } from '../../components/botton-sheet-filter/botton-sheet-filter.component';

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

  constructor( private _bottomSheet: MatBottomSheet ){}

  openBottomSheet(){
    this._bottomSheet.open( BottonSheetFilterComponent, {
      panelClass: "border-botton-sheet"
    } )
  }
}
