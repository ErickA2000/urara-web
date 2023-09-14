import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/account/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IdataUser } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-update-basic-info',
  templateUrl: './update-basic-info.component.html',
  styleUrls: ['./update-basic-info.component.scss']
})
export class UpdateBasicInfoComponent implements OnInit {

  private dataUser?: IdataUser;

  constructor( private fb: FormBuilder, private sharedMethodsService: SharedMethodsService, private authService: AuthService,
    private dialogsService: DialogsService, private userService: UserService ) {
    this.dataUser = this.authService.user;
  }


  updateForm: FormGroup = this.fb.group({
    nombre: [ '' , [ Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z ]+$/) ] ],
    username: [ '' , [ Validators.required, Validators.minLength(4), Validators.maxLength(15), Validators.pattern(/^[A-Za-z0-9@-_()]+$/) ] ]
  });

  ngOnInit(): void {
    this.updateForm.get('nombre')?.setValue(this.dataUser?.nombre);
    this.updateForm.get('username')?.setValue(this.dataUser?.username);

  }

  save(){
    this.dialogsService.openSpinner();

    if( !this.updateForm.get('nombre')?.dirty ) this.updateForm.get('nombre')?.disable();
    if( !this.updateForm.get('username')?.dirty ) this.updateForm.get('username')?.disable();


    if( !this.updateForm.dirty ){
      this.dialogsService.close();
      alertSwal.messageError( "No se han realizado cambios" );
      this.updateForm.get('nombre')?.enable();
      this.updateForm.get('username')?.enable();
      return;
    }
    
    this.userService.updateData( this.updateForm.value ).subscribe(
      res => {
        if( res.success ){
          this.dialogsService.close();
          alertSwal.messageSuccess( "Actualización informaciín básica", res.message || "" );
          this.updateForm.get('nombre')?.enable();
          this.updateForm.get('username')?.enable();
        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "Algo va mal" );
        }
      }
    )

    
  }

  back(){
    this.sharedMethodsService.backRoute();
  }

}