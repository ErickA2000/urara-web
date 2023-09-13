import { EventEmitter, Injectable, Output } from '@angular/core';
import { ItransferDataOrderSummary } from '../interfaces/transfer-data';

@Injectable({
  providedIn: 'root'
})
export class TransferDataLocalService {

  @Output() transferDataOrderSummary: EventEmitter<ItransferDataOrderSummary> = new EventEmitter();

  public token?: string;

  constructor() { }
}
