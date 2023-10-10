import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { BottonSheetFilterComponent } from '../../components/botton-sheet-filter/botton-sheet-filter.component';
import { Router, UrlTree } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';
import { PrendaService } from 'src/app/shared/services/prenda.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { FindOptions } from 'src/app/interfaces/shared/prenda.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  private urlTre!: UrlTree;

  //tiene que ser un array
  arrayCard: ICard[] = [];

  constructor( private _bottomSheet: MatBottomSheet, private router: Router, @Inject(PLATFORM_ID) private plataformID: Platform,
    private prendaService: PrendaService, private dialogsService: DialogsService ){}

  ngOnInit(): void {

    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }

    this.urlTre = this.router.parseUrl(this.router.url);

    if( this.urlTre.queryParams ){

      if( this.urlTre.queryParams['filter'] ){

        if( this.urlTre.queryParams['filter'] === "categoria" ){

          this.getPrendasPaginate( 1, 20, undefined, { categoria: this.urlTre.queryParams['value'] } )
        }

        
      }else{
        this.getPrendasPaginate( 1, 20 );
      }
    }

  }

  getPrendasPaginate( page: number, limit: number, sort?: string, find?: FindOptions ){
    this.dialogsService.openSpinner();

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
