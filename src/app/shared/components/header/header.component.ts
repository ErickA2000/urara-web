import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';
import alertSwal from 'src/app/utils/alertSwal';
import { TransferDataLocalService } from '../../services/transfer-data-local.service';
import { DialogsService } from '../../services/dialogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  logoUrara = "assets/img/logo_urara.png";
  
  constructor( @Inject(DOCUMENT) private document: Document, private authService: AuthService, private cartService: CartService,
  private transferDataLocalService: TransferDataLocalService, private dialogsService: DialogsService ){}

  isDarkMode: boolean = false;
  inSesion: boolean = false;

  cartQuantity: number = 0;
  
  private $inLogin?: Subscription;
  private $transferDataLocal?: Subscription;

  ngOnInit(): void {
      if(localStorage.getItem('dark-mode') == 'true'){
        this.isDarkMode = true;
        this.changeMode( this.isDarkMode );
      }else{
        this.isDarkMode = false;
        this.changeMode( this.isDarkMode );
      }

      this.authService.validateToken().subscribe(
        res => {
          this.inSesion = res;
          this.authService.inLogin.emit(res);
          if( !res ) localStorage.removeItem('token');
        }
      )


      this.$inLogin = this.authService.inLogin.subscribe(
        value => {
          this.inSesion = value;
        }
      )

      this.cartService.getCart().subscribe(
        res => {
          
        }
      )

      this.$transferDataLocal = this.transferDataLocalService.cartQuantity.subscribe(
        quantity => this.cartQuantity = quantity
      );
      
  }

  ngOnDestroy(): void {
      this.$inLogin?.unsubscribe();
      this.$transferDataLocal?.unsubscribe();
  }

  changeMode( newValue: boolean ): void{
    if(newValue){
      this.document.body.classList.add('dark-mode');
      localStorage.setItem('dark-mode', `${newValue}`);
    }else{
      this.document.body.classList.remove('dark-mode');
      localStorage.setItem('dark-mode', `${newValue}`);
    }
  }

  logout(){
    this.dialogsService.openSpinner();

    this.authService.logout().subscribe( res => {
    
      if( !res.success ){
        alertSwal.messageError( res.message || "Error al cerrar sesión" );
      }else{
        this.transferDataLocalService.cartQuantity.emit(0);
      }
      this.dialogsService.close();

    } );
  }

}
