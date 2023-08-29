import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/utils/custom.validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  constructor( private fb: FormBuilder  ) { }

  changePassForm: FormGroup = this.fb.group({
    clave: [ "", [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ],
    confirmarClave: [ "", [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ]
  });

  validateConfirmPass(): boolean | null | undefined {
    let res!: ValidationErrors | null;

    if( !this.changePassForm.get('clave')?.dirty && !this.changePassForm.get('confirmarClave')?.dirty ) return null;

    res = CustomValidator.validateTwoValues(this.changePassForm.get('clave')?.value, 
    this.changePassForm.get("confirmarClave")?.value);

    this.changePassForm.get('confirmarClave')?.setErrors(res);

    return this.changePassForm.get('confirmarClave')?.hasError('isDifferent');

  }

  saveChangePass(){
    //encriptar objeto de formulario

    console.log(this.changePassForm.value)
  }

}
