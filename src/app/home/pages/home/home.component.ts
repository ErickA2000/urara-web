import { Component, OnInit } from '@angular/core';
import { IsliderData } from 'src/app/interfaces/shared/slider.interface';

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
      link: "niña",
      title: "niña"
    }, 
    {
      link: "niño",
      title: "niño"
    }, 
    {
      link: "dama",
      title: "dama"
    }, 
    {
      link: "caballero",
      title: "caballero"
    }
  ];

  constructor(  ){}

  ngOnInit(): void {
    
  }


}
