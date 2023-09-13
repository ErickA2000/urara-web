import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor( private dialog: MatDialog ) { }

  open( component: ComponentType<any>, config?: MatDialogConfig ){
    this.dialog.open( component, config );
  }

  openSpinner(){
    this.dialog.open( SpinnerComponent, {
      panelClass: [ 'no-background' ],
      disableClose: true
    } )
  }

  close(){
    this.dialog.closeAll();
  }
}