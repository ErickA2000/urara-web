import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor( private dialogService: DialogsService, private authService: AuthService ) { }

  stateVerify2fa: {
    state: "activa" | "desactivado" | "",
    icon: "check_circle" | "cancel" | ""
  } = {
    state: "",
    icon: ""
  }

  ngOnInit(): void {
    
    if( this.authService.user.verify2fa.estado ){
      this.stateVerify2fa = {
        state: "activa",
        icon: "check_circle"
      }

    }else{
      this.stateVerify2fa = {
        state: "desactivado",
        icon: "cancel"
      }
    }
  }

  openDialogChangePass(){
    this.dialogService.open( ChangePasswordComponent )
  }
}
