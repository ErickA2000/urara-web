import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/account/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PREFIJOS } from 'src/app/constants/global.constans';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-update-contact-info',
  templateUrl: './update-contact-info.component.html',
  styleUrls: ['./update-contact-info.component.scss']
})
export class UpdateContactInfoComponent implements OnInit {
  prefijos = PREFIJOS;
  dataUser?: IdataUser;

  constructor( private fb: FormBuilder, private SharedMethodsServi: SharedMethodsService, private authService: AuthService, private userService: UserService,
    private dialogsService: DialogsService ) { 
      this.dataUser = this.authService.user;
    }

  updateForm: FormGroup = this.fb.group({
    email: [ "", [ Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/) ] ],
    telefono: this.fb.group({
      codigo_area: [ "", [ Validators.required ] ],
      numero: [ "", [ Validators.required, Validators.minLength(10), Validators.maxLength(10),Validators.pattern(/^([0-9])*$/) ] ]
    })
  });

  ngOnInit(): void {
    this.updateForm.get('email')?.setValue(this.dataUser?.email);
    this.updateForm.get('telefono.codigo_area')?.setValue(this.dataUser?.telefono.codigo_area);
    this.updateForm.get('telefono.numero')?.setValue(this.dataUser?.telefono.numero);
  }

  save(){
    this.dialogsService.openSpinner();
    
    if( !this.updateForm.get('email')?.dirty ) this.updateForm.get('email')?.disable();
    if( !this.updateForm.get('telefono')?.dirty ) this.updateForm.get('telefono')?.disable();

    if( !this.updateForm.dirty ){
      this.dialogsService.close();
      alertSwal.messageError( "No se han realizado cambios" );
      this.updateForm.get('email')?.enable();
      this.updateForm.get('telefono')?.enable();
      return;
    }

    this.userService.updateData( this.updateForm.value ).subscribe(
      res => {
        if( res.success ){
          this.dialogsService.close();
          alertSwal.messageSuccess( "Actualización información de contacto", res.message || "" );
          this.updateForm.get('email')?.enable();
          this.updateForm.get('telefono')?.enable();
        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "Algo va mal" );
        }
      }
    )
  }

  back(){
    this.SharedMethodsServi.backRoute();
  }

}
