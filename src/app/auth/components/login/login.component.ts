import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor( private fb: FormBuilder, private authService: AuthService, private dialogService: DialogsService ) {}

  loginForm: FormGroup = this.fb.group({
    username: [ '', [ Validators.required ] ],
    clave: [ '', [ Validators.required ] ]
  });

  login(){

    this.dialogService.open( SpinnerComponent, { 
      panelClass: [ 'no-background' ],
      disableClose: true
    })

    console.log(this.loginForm.value)

    // this.authService.login( this.loginForm.value ).subscribe( 
    //   res => {

    //   }
    // )

  }

}
