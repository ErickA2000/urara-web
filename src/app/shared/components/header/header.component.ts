import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  constructor( @Inject(DOCUMENT) private document: Document ){}

  isDarkMode: boolean = false;

  changeMode( newValue: boolean ): void{
    if(newValue){
      this.document.body.classList.add('dark-mode');
    }else{
      this.document.body.classList.remove('dark-mode');
    }
  }

}
