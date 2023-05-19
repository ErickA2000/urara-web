import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { IsliderData } from 'src/app/interfaces/shared/slider.interface';
import { scrollToTop } from 'src/app/utils/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  linkBoxImg = "assets/img/home/1.png"

  imgSlider: IsliderData[] = [ 
    {
      link: "assets/img/logo_urara.png",
      title: ""
    }, 
    {
      link: "assets/img/1273799.png",
      title: ""
    }, 
    {
      link: "assets/img/1273800.png",
      title: ""
    }, 
    {
      link: "assets/img/1273802.png",
      title: ""
    }
  ];

  categorias: IsliderData[] = [ 
    {
      link: "aaaa",
      title: "niña"
    }, 
    {
      link: "bbb",
      title: "niño"
    }, 
    {
      link: "cccc",
      title: "dama"
    }, 
    {
      link: "ddddd",
      title: "caballero"
    }
  ];

  //tiene que ser un array
  forCard: ICard = {
    title: "prueba",
    img: "assets/img/prueba_card.jpg",
    ref: 1,
    slug: "prueba"
  }

  constructor( @Inject(PLATFORM_ID) private plataformID: Platform ){}

  ngOnInit(): void {
    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }
  }


}
