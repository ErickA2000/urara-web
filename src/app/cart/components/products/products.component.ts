import { Component, Input } from '@angular/core';
import { ICart } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  @Input() products!: ICart;
}
