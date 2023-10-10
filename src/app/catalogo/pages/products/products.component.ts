import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { BottonSheetFilterComponent } from '../../components/botton-sheet-filter/botton-sheet-filter.component';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';
import { PrendaService } from 'src/app/shared/services/prenda.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { FindOptions } from 'src/app/interfaces/shared/prenda.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  private $activatedRoute!: Subscription;

  //tiene que ser un array
  arrayCard: ICard[] = [];

  constructor( private _bottomSheet: MatBottomSheet, @Inject(PLATFORM_ID) private plataformID: Platform,
    private prendaService: PrendaService, private dialogsService: DialogsService, private activatedRoute: ActivatedRoute ){}

  ngOnInit(): void {

    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }
    
    this.$activatedRoute = this.activatedRoute.queryParams.subscribe( 
      queryParams => {

        if( queryParams['filter'] ){
  
          if( queryParams['filter'] === "categoria" ){
  
            this.getPrendasPaginate( 1, 20, undefined, { categoria: queryParams['value'] } )
          }
    
        }else{
          this.getPrendasPaginate( 1, 20 );
        }
        
      }
     )

  }

  ngOnDestroy(): void {
    this.$activatedRoute.unsubscribe();
  }

  getPrendasPaginate( page: number, limit: number, sort?: string, find?: FindOptions ){
    this.dialogsService.openSpinner();

    while( this.arrayCard.length > 0 ) this.arrayCard.pop();

    this.prendaService.getPrendasPaginate( page, limit, sort, find ).subscribe(
      res => {

        if( res.success ){

          for( let prenda of res.data?.docs! ){
            const card: ICard = {
              title: prenda.nombre,
              img: prenda.imagenUrl[0],
              ref: prenda.referencia,
              slug: prenda.slug
            };

            this.arrayCard.push(card);
          }

        }

        this.dialogsService.close();
      }
    )
  }

  

  openBottomSheet(){
    this._bottomSheet.open( BottonSheetFilterComponent, {
      panelClass: "border-botton-sheet"
    } )
  }
}
