import { Platform } from '@angular/cdk/platform';
import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ICard } from 'src/app/interfaces/shared/card.interface';
import { IsliderData } from 'src/app/interfaces/shared/slider.interface';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { PrendaService } from 'src/app/shared/services/prenda.service';
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

  categorias: IsliderData[] = [];

  //tiene que ser un array
  forCard: ICard[] = [];

  constructor( @Inject(PLATFORM_ID) private plataformID: Platform, private prendaService: PrendaService, private categoryService: CategoriaService ){}

  ngOnInit(): void {
    if( isPlatformBrowser( this.plataformID ) ){
      scrollToTop();
    }

    this.getNewPrendas( 1, 10, "-createdAt" );

    this.getAllCategorys();

  }

  getNewPrendas( page: number, limit: number, sort?: string ){

    this.prendaService.getPrendasPaginate( page, limit, sort ).subscribe( res => {

      if( res.success ){
        
        for( let prenda of res.data?.docs! ){
          const cart: ICard = {
            title: prenda.nombre,
            img: prenda.imagenUrl[0],
            ref: prenda.referencia,
            slug: prenda.slug
          };
          
          this.forCard?.push(cart);
        }

      }

    })

  }

  getAllCategorys(){

    this.categoryService.getCategorias().subscribe( res => {
      
      if( res.success ){

        for( let categoria of res.data ){
          const slider: IsliderData = {
            link: categoria._id,
            title: categoria.nombre
          };

          this.categorias.push(slider);
        }
      }

    })

  }


}
