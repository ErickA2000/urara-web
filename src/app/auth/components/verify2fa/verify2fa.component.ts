import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DeviceService } from '../../services/device.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';
import { Router } from '@angular/router';
import alertSwal from 'src/app/utils/alertSwal';

@Component({
  selector: 'app-verify2fa',
  templateUrl: './verify2fa.component.html',
  styleUrls: ['./verify2fa.component.scss']
})
export class Verify2faComponent implements OnInit, OnDestroy {

  totalTime: number = 30;
  private _intervalId: any;

  constructor( private fb: FormBuilder, private authService: AuthService, private deviceService: DeviceService, 
    private dialogsService: DialogsService, private router: Router ) {
    this.timer();
  }

  usernameOrEmail: string = "";

  sendCodeForm: FormGroup = this.fb.group({
    code: ["", [ Validators.required, Validators.minLength( 6 ), Validators.pattern(/^([0-9])*$/) ]]
  })

  ngOnInit(): void {
    this.usernameOrEmail = this.router.parseUrl(this.router.url).queryParamMap.get('user') || "";

    this.deviceService.createObjDevice( window.navigator.userAgent );
  }

  ngOnDestroy(): void {
    clearInterval(this._intervalId);
  }

  resendCode(){
    if( this.totalTime === 0 ){
      
      this.authService.resendCode( this.usernameOrEmail ).subscribe(
        res => {
          if( !res.success ) alertSwal.messageError( res.message || "Algo va mal" );
        }
      )

      this.timer();
    }
  }
  
  sendCode(){
    this.dialogsService.openSpinner();

    this.authService.verify2fa( this.usernameOrEmail, this.sendCodeForm.value ).subscribe(
      res => {

        if( res.success ){
          this.addDevice();

        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "Algo va mal" );
        }
      }
    )
  }

  private timer(){
    this.totalTime = 30;
    this._intervalId = setInterval( () => this.timerReduce(), 1000);
  }
  
  private timerReduce(){
    
    if( --this.totalTime < 1 ){
      clearInterval(this._intervalId );
    }
  }

  private addDevice(){
    this.deviceService.addDevice().subscribe(
      res => {
        if( res.success ){
          this.dialogsService.close();
          this.authService.inLogin.emit(true);
          this.router.navigate(['/site/home']);
        }else{
          this.dialogsService.close();
          alertSwal.messageError( res.message || "Error al agregar dispositivo a la iniciar sesión" );
        }
      }
    )
  }
}

