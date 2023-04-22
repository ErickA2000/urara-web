import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor( private _snackBar: MatSnackBar ) { }

  openSnackBar( message: string, cssClass?: string, duration?: number ){
    if( !duration ){
      duration = 5000;
    }

    if( cssClass ){
      this._snackBar.openFromComponent( SnackBarComponent, {
        duration: duration,
        panelClass: cssClass,
        data: message
      } );

    }else{
      this._snackBar.openFromComponent( SnackBarComponent, {
        duration: duration,
        data: message
      } );
    }


  }

}
