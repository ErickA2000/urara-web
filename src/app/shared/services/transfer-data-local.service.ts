import { EventEmitter, Injectable, Output } from '@angular/core';
import { ItransferDataOrderSummary } from '../interfaces/transfer-data';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import { IDeviceView, ISortDevices } from 'src/app/interfaces/auth/device.interface';
import { IPaginate, IPaginateQuery } from 'src/app/interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class TransferDataLocalService {

  @Output() transferDataOrderSummary: EventEmitter<ItransferDataOrderSummary> = new EventEmitter();
  @Output() dataUser: EventEmitter<IdataUser> = new EventEmitter();
  @Output() paginateOptions: EventEmitter<IPaginate> = new EventEmitter();
  @Output() queryPaginate: EventEmitter<IPaginateQuery> = new EventEmitter();

  public token?: string;
  public devices?: ISortDevices;
  public device?: IDeviceView;
}
