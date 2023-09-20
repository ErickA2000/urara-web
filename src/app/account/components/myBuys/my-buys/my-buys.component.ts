import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/account/services/shopping.service';
import { IResponseShopping, IShopping } from 'src/app/interfaces/account/shopping.interface';
import { IPaginate } from 'src/app/interfaces/global.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { TransferDataLocalService } from 'src/app/shared/services/transfer-data-local.service';

@Component({
  selector: 'app-my-buys',
  templateUrl: './my-buys.component.html',
  styleUrls: ['./my-buys.component.scss']
})
export class MyBuysComponent implements OnInit, OnDestroy{

  private paginateOptions?: IPaginate;
  private $transferDataLocal?: Subscription;
  public shopping?: IShopping[];

  constructor( private shoppingService: ShoppingService, private dialogsService: DialogsService, 
    private transferDataLocalService: TransferDataLocalService ){

    this.getShopping( 1, 5 );
  }

  ngOnInit(): void {
      this.$transferDataLocal = this.transferDataLocalService.queryPaginate.subscribe( query => {
        this.getShopping( query.page, query.limit );
      } )
  }

  ngOnDestroy(): void {
      this.$transferDataLocal?.unsubscribe();
  }

  getShopping( page: number, limit: number ){
    this.dialogsService.openSpinner();

    this.shoppingService.getAllShopping( page, limit ).subscribe(
      res => {
        const response = res as IResponseShopping;

        console.log(response.data?.docs.reverse())

        this.shopping = response.data?.docs;

        this.paginateOptions = {
          length: response.data?.totalDocs!,
          limit: response.data?.limit!,
          page: response.data?.page!,
          totalPages: response.data?.totalPages!,
          hasNextPage: response.data?.hasNextPage!,
          hasPrevPage: response.data?.hasPrevPage!,
          prevPage: response.data?.prevPage!,
          nextPage: response.data?.nextPage!,
          totalDocs: response.data?.totalDocs!
        };

        this.transferDataLocalService.paginateOptions.emit(this.paginateOptions);

        this.dialogsService.close();
      }
    )
  }
}
