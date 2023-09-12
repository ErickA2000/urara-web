import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor( private dialog: MatDialog ) { }

  open( component: ComponentType<any>, config?: MatDialogConfig ){
    this.dialog.open( component, config );
  }

  close(){
    this.dialog.closeAll();
  }
}