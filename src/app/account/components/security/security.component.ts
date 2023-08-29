import { Component } from '@angular/core';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {

  constructor( private dialogService: DialogsService ) { }

  openDialogChangePass(){
    this.dialogService.open( ChangePasswordComponent )
  }
}
