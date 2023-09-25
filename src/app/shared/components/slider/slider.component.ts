import { Component, Input, OnInit, ViewChild, HostListener } from '@angular/core';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { IsliderData } from 'src/app/interfaces/shared/slider.interface';
import { NgxGlideComponent } from 'ngx-glide';
import { Params, Router } from '@angular/router';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [ 
    NgxGlideComponent, 
    NgFor, 
    NgIf,
    TitleCasePipe, 
    MaterialModule ]
})
export class SliderComponent implements OnInit {
  
  @ViewChild( NgxGlideComponent, { static: false } ) ngxGlide!: NgxGlideComponent;

  @Input() data!: IsliderData[];
  @Input() isClickable: boolean = false;
  @Input() isImage: boolean = true;
  @Input() routerName?: string;
  @Input() nameQueryParam?: string;

  //Config slider
  @Input() autoplay: number | boolean = 5000;
  @Input() animationDuration: number = 400;
  @Input() perView: number = 1;
  @Input() gap: number = 10;
  @Input() showBullets: boolean = true;
  @Input() rewind: boolean = true;

  public getScreenWidth: any;
  public getScreenHeight: any;
  
  constructor( private router: Router ){}

  ngOnInit(): void {
    if( !this.isImage ){
      this.getScreenHeight = window.innerHeight;
      this.getScreenWidth = window.innerWidth;
      this.changePerView();
    }
  }

  open( param: string ){
    if( this.isClickable ){
      if( this.routerName && this.nameQueryParam){
        
        if( this.nameQueryParam == "categoria" ){
          this.router.navigate([`/${this.routerName}`], { 
            queryParams: {
              filter: this.nameQueryParam,
              value: param
            }
          });

        }

      }
      
    }
  }

  changePerView(){
    if( this.getScreenWidth <= 480){
      this.perView = 1;
    }else if( this.getScreenWidth <= 900 ){
      this.perView = 2;
    }else{
      this.perView = 4;
    }
    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(){
    if( this.isImage === false ){
      this.getScreenHeight = window.innerHeight;
      this.getScreenWidth = window.innerWidth;
      this.changePerView();
    }
  }

}
