import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit, OnDestroy {

  logoUrara = "assets/img/logo_urara.png";

  private $activatedRoute?: Subscription;

  resConfirm?: {
    success: boolean,
    message: string
  };

  constructor( private activatedRoute: ActivatedRoute, private auhtService: AuthService, private dialogsService: DialogsService ){}

  ngOnInit(): void {
    this.dialogsService.openSpinner();

    this.$activatedRoute = this.activatedRoute.params
      .pipe(
        switchMap( ({token}) => this.auhtService.confirmAccount(token) )
      )
      .subscribe( 
        res => {
          this.resConfirm = {
            success: res.success,
            message: res.message || ""
          };

          this.dialogsService.close();
        }
      )
      
  }

  ngOnDestroy(): void {
    this.$activatedRoute?.unsubscribe();
  }
}
