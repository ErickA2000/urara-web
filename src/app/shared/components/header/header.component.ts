import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  
  constructor( @Inject(DOCUMENT) private document: Document, private authService: AuthService ){}

  isDarkMode: boolean = false;
  inSesion: boolean = false;

  private $inLogin?: Subscription;

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
      
  }

  ngOnDestroy(): void {
      this.$inLogin?.unsubscribe();
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
    this.authService.logout();
  }

}
