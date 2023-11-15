import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/account/services/user.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IdataUser, ImetodoVerify } from 'src/app/interfaces/auth/user.interface';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { SharedMethodsService } from 'src/app/shared/services/shared-methods.service';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-twofa',
  templateUrl: './twofa.component.html',
  styleUrls: ['./twofa.component.scss']
})
export class TwofaComponent implements OnInit, OnDestroy {

  dataUser?: IdataUser;

  constructor( private sharedMethodsServi: SharedMethodsService, private authService: AuthService, private userService: UserService,
    private dialogosService: DialogsService, private fb: FormBuilder ) { 
      this.dataUser = this.authService.user;
  }

  formVerify2fa: FormGroup = this.fb.group({
    estado: [ '', [ Validators.required ] ],
    metodos: this.fb.array([])
  });

  get methods(): FormArray{
    return this.formVerify2fa.controls['metodos'] as FormArray;
  }

  stateVerify2fa: {
    state: "activada" | "desactivada",
    fechaActivacion?: Date,
    textBtn: "activar" | "desactivar"
  } = {
    state: "desactivada",
    textBtn: "activar"
  }

  ngOnInit(): void {
    
    if( this.dataUser?.verify2fa.estado ){
      this.stateVerify2fa = {
        state: "activada",
        textBtn: "desactivar",
        fechaActivacion: this.dataUser.verify2fa.fechaActivacion
      };
    }else{
      this.stateVerify2fa = {
        state: "desactivada",
        textBtn: "activar"
      };
    }

    this.formVerify2fa.get("estado")?.setValue(this.dataUser?.verify2fa.estado);

    for( let method of this.dataUser?.verify2fa.metodos! ){
      const group = this.addMethod( method );
      this.methods.push( group );
    }

  }

  ngOnDestroy(): void {
    this.enableOrDisableMethod();
  }

  enableOrDisableVerify2fa(){
    this.dialogosService.openSpinner();
    this.formVerify2fa.get("estado")?.setValue(!this.dataUser?.verify2fa.estado);

    if( this.formVerify2fa.get("estado")?.value === true ){
      for( let control of this.methods.controls ){
        if( control.get('tipo')?.value === "email" ){
          control.get("estado")?.setValue(true);
        }
      }
    }

    //Crear objeto para enviar
    const verify2fa = {
      verify2fa: this.formVerify2fa.value
    }

    //Enviar peticion back-end
    this.userService.updateData( verify2fa ).subscribe(
      res => {

        if( res.success ){
          this.dialogosService.close();
          alertSwal.messageSuccess( "Cambio verificación en dos pasos", "Cambio exitoso" );
        }else{
          this.dialogosService.close();
          alertSwal.messageError( res.message || "Algo va mal" );
        }

      }
    )

  }

  private enableOrDisableMethod(){

    for( let control of this.methods.controls ){
      
      if( control.get("estado")?.dirty ){
        
        //Crear objeto para enviar
        const verify2fa = {
          verify2fa: this.formVerify2fa.value
        };

        this.userService.updateData( verify2fa ).subscribe(
          res => {

            if( res.success ){
              this.dialogosService.close();
              alertSwal.messageSuccess( "Cambio metodo de verificación en dos pasos", "" );
            }else{
              this.dialogosService.close();
              alertSwal.messageError( res.message || "Algo va mal" );
            }
          }
        )

      }
    }

  }

  private addMethod( method: ImetodoVerify ){
    return this.fb.group({
      tipo: [ method.tipo ],
      estado: [ method.estado ]
    })
  }

  getMethodByIndex( index: number ): FormGroup{
    return this.methods.at(index) as FormGroup;
  }

  back(){
    this.sharedMethodsServi.backRoute();
  }

}
