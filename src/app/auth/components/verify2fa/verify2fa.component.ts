import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify2fa',
  templateUrl: './verify2fa.component.html',
  styleUrls: ['./verify2fa.component.scss']
})
export class Verify2faComponent implements OnDestroy {

  totalTime: number = 30;
  private _intervalId: any;

  constructor( private fb: FormBuilder ) {
    this.timer();
  }

  sendCodeForm: FormGroup = this.fb.group({
    code: ["", [ Validators.required, Validators.minLength( 6 ), Validators.pattern(/^([0-9])*$/) ]]
  })

  ngOnDestroy(): void {
      clearInterval(this._intervalId);
  }

  resendCode(){
    if( this.totalTime === 0 ){
      console.log("Resend code");
      this.timer();
    }
  }
  
  sendCode(){
    console.log("Send code:", this.sendCodeForm.value);
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
}

