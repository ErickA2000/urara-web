import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor( @Inject(DOCUMENT) private document: Document ){}

  isDarkMode: boolean = false;

  ngOnInit(): void {
      if(localStorage.getItem('dark-mode') == 'true'){
        this.isDarkMode = true;
        this.changeMode( this.isDarkMode );
      }else{
        this.isDarkMode = false;
        this.changeMode( this.isDarkMode );
      }
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

}
