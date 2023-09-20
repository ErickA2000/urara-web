import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPaginate } from 'src/app/interfaces/global.interface';
import { TransferDataLocalService } from '../../services/transfer-data-local.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent implements OnInit, OnDestroy {

  pageSizeOptions = [2,5, 10, 25, 100];

  paginateOptions: IPaginate = {
    length: 0,
    limit: 0,
    page: 0,
    totalPages: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: 0,
    nextPage: 0,
    totalDocs: 0
  };

  private $transferDataLocalService?: Subscription;

  constructor( private thansferDataLocalService: TransferDataLocalService ){}

  ngOnInit(): void {
    this.$transferDataLocalService = this.thansferDataLocalService.paginateOptions.subscribe( options => {
      this.paginateOptions = options;
    } )
  }

  ngOnDestroy(): void {
    this.$transferDataLocalService?.unsubscribe();
  }

  getQuery( page: number, limit: number ){
    this.thansferDataLocalService.queryPaginate.emit( { page, limit } );
  }

  
}
