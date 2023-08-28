import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/utils/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  prefijos = [ "+57" ];

  constructor( private fb: FormBuilder ) { }

  registerForm: FormGroup = this.fb.group({
    nombre: [ "", [ Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/) ] ],
    telefono: this.fb.group({
      codigo_area: [ '', Validators.required ],
      numero: [ '', [ Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^([0-9])*$/) ] ]
    }),
    email: [ "", [ Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/)]],
    username: [ '', [ Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9@-_()]+$/) ] ],
    clave: [ '', [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ],
    confirmarClave: [ '', [ Validators.required, Validators.minLength(6),
      Validators.pattern(/^(?=[A-Za-z@_]+[0-9]{1,9}|[0-9]+[A-Za-z@_]{1,9})[A-Za-z0-9@_]{2,30}$/) ] ],
    terminos: [ null, [ Validators.requiredTrue ]]
  });

  validateConfirmPass(): boolean | null | undefined{
    let res!: ValidationErrors | null;

    if( !this.registerForm.get('clave')?.dirty && !this.registerForm.get("confirmarClave")?.dirty ) return null;

    res = CustomValidator.validateTwoValues(this.registerForm.get('clave')?.value, 
      this.registerForm.get("confirmarClave")?.value);
    
    this.registerForm.get('confirmarClave')?.setErrors(res);
    return this.registerForm.get("confirmarClave")?.hasError('isDifferent');

  }

  register(){
    //encriptar objeto de formulario
    console.log(this.registerForm.value)
  }

}
