import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { IsliderData } from 'src/app/interfaces/shared/slider.interface';
import { NgxGlideComponent } from 'ngx-glide';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: true,
  imports: [ NgxGlideComponent, CommonModule, MaterialModule ]
})
export class SliderComponent implements OnInit {
  
  @Input() data!: IsliderData[];

  @ViewChild( NgxGlideComponent, { static: false } ) ngxGlide!: NgxGlideComponent;
  
  constructor( ){}

  ngOnInit(): void {
    
  }
}
