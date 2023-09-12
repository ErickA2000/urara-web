import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import alertSwal from 'src/app/utils/alertSwal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private authService: AuthService, private dialogService: DialogsService,
    private router: Router ) {}

  loginForm: FormGroup = this.fb.group({
    username: [ '', [ Validators.required ] ],
    clave: [ '', [ Validators.required ] ]
  });

  login(){

    this.dialogService.open( SpinnerComponent, { 
      panelClass: [ 'no-background' ],
      disableClose: true
    })

    this.authService.login( this.loginForm.value ).subscribe( 
      res => {

        if( res.success ){

          if( res.message === "verification_in_process" ){
            this.router.navigate(["/auth/verify-2fa"], {
              queryParams: {
                user: this.loginForm.get('username')?.value
              }
            });
            this.dialogService.close();
          }

        }else{
          this.dialogService.close();
          alertSwal.messageError( "Error al iniciar sesión:" + res.message )
        }

      }
    )

  }

}
