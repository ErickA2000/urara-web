import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-update-basic-info',
  templateUrl: './update-basic-info.component.html',
  styleUrls: ['./update-basic-info.component.scss']
})
export class UpdateBasicInfoComponent {

  constructor( private fb: FormBuilder, private sharedMethodsService: SharedMethodsService ) { }

  updateForm: FormGroup = this.fb.group({
    nombre: [ '', [ Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/) ] ],
    username: [ "", [ Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9@-_()]+$/) ] ]
  });

  save(){
    //encriptar objeto de formulario
    console.log(this.updateForm.value)
  }

  back(){
    this.sharedMethodsService.backRoute();
  }

}