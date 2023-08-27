import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { scrollToTop } from 'src/app/utils/functions';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit{

  constructor( @Inject(PLATFORM_ID) private plataformID: Platform ){}

  logoUrara = "assets/img/logo_urara.png"

  ngOnInit(): void {
      if( isPlatformBrowser( this.plataformID ) ){
        scrollToTop();
      }
  }
}
