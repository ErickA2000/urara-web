import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserService } from 'src/app/account/services/user.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import alertSwal from 'src/app/utils/alertSwal';
import { CustomValidator } from 'src/app/utils/custom.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor( private fb: FormBuilder, private dialogsService: DialogsService, private userService: UserService  ) { }

  changePassForm: FormGroup = this.fb.group({
    claveAntigua: [ "", [ Validators.required, Validators.minLength(6), 
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ],
    claveNueva: [ "", [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ],
    confirmarClave: [ "", [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ]
  });

  validateConfirmPass(): boolean | null | undefined {
    let res!: ValidationErrors | null;

    if( !this.changePassForm.get('claveNueva')?.dirty && !this.changePassForm.get('confirmarClave')?.dirty ) return null;

    res = CustomValidator.validateTwoValues(this.changePassForm.get('claveNueva')?.value, 
    this.changePassForm.get("confirmarClave")?.value);

    this.changePassForm.get('confirmarClave')?.setErrors(res);

    return this.changePassForm.get('confirmarClave')?.hasError('isDifferent');

  }

  saveChangePass(){
    this.dialogsService.openSpinner();
    this.changePassForm.get('confirmarClave')?.disable();    

    this.userService.updatePassword( this.changePassForm.value ).subscribe(
      res => {
        if( res.success ){
          this.dialogsService.close();
          alertSwal.messageSuccess( "Cambio contraseña", res.message || "" );
        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "Error al cambiar la contraseña" );
        }
      }
    )
  }

}
