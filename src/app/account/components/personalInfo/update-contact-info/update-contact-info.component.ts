import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PREFIJOS } from 'src/app/constants/global.constans';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';

@Component({
  selector: 'app-update-contact-info',
  templateUrl: './update-contact-info.component.html',
  styleUrls: ['./update-contact-info.component.scss']
})
export class UpdateContactInfoComponent {
  prefijos = PREFIJOS;

  constructor( private fb: FormBuilder, private SharedMethodsServi: SharedMethodsService ) { }

  updateForm: FormGroup = this.fb.group({
    email: [ "", [ Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ] ],
    telefono: this.fb.group({
      codigo_area: [ "", [ Validators.required ] ],
      numero: [ "", [ Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^([0-9])*$/) ] ]
    })
  });

  save(){
    //encriptar objeto de formulario
    console.log(this.updateForm.value)
  }

  back(){
    this.SharedMethodsServi.backRoute();
  }

}
