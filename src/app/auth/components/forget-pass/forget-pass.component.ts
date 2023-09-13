import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {

  constructor( private fb: FormBuilder, private location: Location, private authService: AuthService ) { }

  resetForm: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ] ]
  });

  sendEmail(){

    this.authService.resetPass( this.resetForm.value ).subscribe(
      res => {
        if( res.success ){
          alertSwal.messageSuccess( "Reestablecer contraseña", res.message || "" );

          //retornar a ruta anterior
          this.backRoute()
        }else{
          alertSwal.messageError( res.message || "A ocurrido un error" );
        }
      }
    )

  }

  backRoute(){
    this.location.back();
  }

}
