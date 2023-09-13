import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import alertSwal from 'src/app/utils/alertSwal';
import { Router } from '@angular/router';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private authService: AuthService, private dialogService: DialogsService,
    private router: Router, private deviceService: DeviceService ) {
      this.deviceService.createObjDevice(window.navigator.userAgent);
    }

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

          }else{
            this.addDevice();
          }

        }else{
          this.dialogService.close();
          alertSwal.messageError( res.message || "Error al iniciar sesión" )
        }

      }
    )

  }

  private addDevice( ){
    this.deviceService.addDevice().subscribe(
      res => {
        if( res.success ){
          this.dialogService.close();
          this.router.navigate(['/site/home']);
        }else{
          this.dialogService.close();
          alertSwal.messageError( "Error al iniciar sesión " + res.message )
        }
      }
    )
  }

}
