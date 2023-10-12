import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { BottonSheetFilterComponent } from '../../components/botton-sheet-filter/botton-sheet-filter.component';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { scrollToTop } from 'src/app/utils/functions';
import { PrendaService } from 'src/app/shared/services/prenda.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { FindOptions } from 'src/app/interfaces/shared/prenda.interface';
import { Subscription } from 'rxjs';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';
import { IPaginate } from 'src/app/interfaces/global.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy{

  private $activatedRoute!: Subscription;
  private $transferDataLocal!: Subscription;

  private paginateOptions?: IPaginate;

  //tiene que ser un array
  arrayCard: ICard[] = [];

  constructor( private _bottomSheet: MatBottomSheet, @Inject(PLATFORM_ID) private plataformID: Platform,
    private prendaService: PrendaService, private dialogsService: DialogsService, private activatedRoute: ActivatedRoute,
    private transferDataLocalService: TransferDataLocalService ){}

  ngOnInit(): void {

    let queryParamss: Params;

    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }
    
    this.$activatedRoute = this.activatedRoute.queryParams.subscribe( 
      queryParams => {
        queryParamss = queryParams;
        if( queryParams['filter'] ){
  
          if( queryParams['filter'] === "categoria" ){
      
            this.getPrendasPaginate( 1, 25, undefined, { categoria: queryParams['value'], discount: queryParams['discount'] } );
          }
    
        }else{
          this.getPrendasPaginate( 1, 25 );
        }
        
      }
     );

    this.$transferDataLocal = this.transferDataLocalService.queryPaginate.subscribe(
      query => {

        if( queryParamss['filter'] ){
          if( queryParamss['filter'] === "categoria" ){

            this.getPrendasPaginate( query.page, query.limit, undefined, { categoria: queryParamss['value'], discount: queryParamss['discount'] } );
          }
        }else{
          this.getPrendasPaginate( query.page, query.limit );
        }

      }
    )

  }

  ngOnDestroy(): void {
    this.$activatedRoute.unsubscribe();
    this.$transferDataLocal.unsubscribe();
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

          this.paginateOptions = {
            length: res.data?.totalDocs!,
            limit: res.data?.limit!,
            page: res.data?.page!,
            totalPages: res.data?.totalPages!,
            hasNextPage: res.data?.hasNextPage!,
            hasPrevPage: res.data?.hasPrevPage!,
            prevPage: res.data?.prevPage!,
            nextPage: res.data?.nextPage!,
            totalDocs: res.data?.totalDocs!
          };

          setTimeout(() => {

            this.transferDataLocalService.paginateOptions.emit(this.paginateOptions);
          }, 1000)

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
