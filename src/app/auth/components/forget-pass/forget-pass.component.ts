import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent {

  constructor( private fb: FormBuilder, private location: Location ) { }

  resetForm: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ] ]
  });

  sendEmail(){
    //encriptar form de email
    console.log(this.resetForm.value);

    //retornar a ruta anterior
    this.backRoute()
  }

  backRoute(){
    this.location.back();
  }

}
