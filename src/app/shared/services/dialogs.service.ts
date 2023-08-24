import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor( private dialog: MatDialog ) { }

  open( component: ComponentType<any>, data?: object ){
    this.dialog.open( component, 
      {
        data
      }
      );
  }
}
