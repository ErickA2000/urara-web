import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imgSlider = ["assets/img/logo_urara.png", "assets/img/1273799.png", "assets/img/1273800.png", "assets/img/1273802.png"]

  ngOnInit(): void {
  }

}
