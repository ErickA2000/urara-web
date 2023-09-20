import { Component, Input, OnInit } from '@angular/core';
import { IShopping } from 'src/app/interfaces/account/shopping.interface';

@Component({
  selector: 'app-buys',
  templateUrl: './buys.component.html',
  styleUrls: ['./buys.component.scss']
})
export class BuysComponent {

  @Input() shopping?: IShopping


}
