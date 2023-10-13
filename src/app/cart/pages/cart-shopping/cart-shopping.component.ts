import { Component, OnInit } from '@angular/core';
import { ICart } from '../../interfaces/cart.interface';
import { CartService } from '../../services/cart.service';
import { DialogsService } from 'src/app/shared/services/dialogs.service';

@Component({
  selector: 'app-cart-shopping',
  templateUrl: './cart-shopping.component.html',
  styleUrls: ['./cart-shopping.component.scss']
})
export class CartShoppingComponent implements OnInit {

  cart?: ICart;
  messageError?: string;

  constructor( private cartService: CartService, private dialogsService: DialogsService ){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.dialogsService.openSpinner();

    this.cartService.getCart().subscribe(
      res => {

        if( res.success ){
          this.cart = res.data;
        }else{
          
          this.messageError = "Carrito vacio";
        }
        this.dialogsService.close();
      }
    )
  }

}
