import { EventEmitter, Injectable, Output } from '@angular/core';
import { ItransferDataOrderSummary } from '../interfaces/transfer-data';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';

@Injectable({
  providedIn: 'root'
})
export class TransferDataLocalService {

  @Output() transferDataOrderSummary: EventEmitter<ItransferDataOrderSummary> = new EventEmitter();
  @Output() dataUser: EventEmitter<IdataUser> = new EventEmitter();

  public token?: string;

  constructor() { }
}
