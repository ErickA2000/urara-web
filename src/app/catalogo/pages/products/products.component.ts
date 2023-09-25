import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { BottonSheetFilterComponent } from '../../components/botton-sheet-filter/botton-sheet-filter.component';
import { Router, UrlTree } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  urlTre!: UrlTree;

  //tiene que ser un array
  forCard: ICard = {
    title: "prueba",
    img: "assets/img/prueba_card.jpg",
    ref: "1",
    slug: "prueba"
  }

  constructor( private _bottomSheet: MatBottomSheet, private router: Router, @Inject(PLATFORM_ID) private plataformID: Platform ){}

  ngOnInit(): void {

    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }

    this.urlTre = this.router.parseUrl(this.router.url);

    if( this.urlTre.queryParams ){

      if( this.urlTre.queryParams['categoria'] ){
        console.log(this.urlTre.queryParams['categoria']);
        //Aqui ejecutar metodo para consultar prendas por categoria
      }
    }

  }

  openBottomSheet(){
    this._bottomSheet.open( BottonSheetFilterComponent, {
      panelClass: "border-botton-sheet"
    } )
  }
}
