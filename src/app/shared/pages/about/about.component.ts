import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { scrollToTop } from 'src/app/utils/functions';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  logoUrara = "assets/img/logo_urara.png";

  constructor( @Inject(PLATFORM_ID) private plataformID: Platform ){ }

  ngOnInit(): void {
      if( isPlatformBrowser( this.plataformID ) ){
        scrollToTop();
      }
  }

}
