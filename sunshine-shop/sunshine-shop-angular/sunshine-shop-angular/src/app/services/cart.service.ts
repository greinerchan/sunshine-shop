import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {

    let isInCart: boolean = false;
    let inCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      inCartItem = this.cartItems.find(item => item.id === cartItem.id);
      isInCart = (inCartItem != undefined);
    }


    if (isInCart) {
      inCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeTotal();

  }
  computeTotal() {

    let totalPriceVal: number = 0;
    let totalQuantityVal: number = 0;

    for (let cartItem of this.cartItems) {
      totalPriceVal += cartItem.unitPrice * cartItem.quantity;
      totalQuantityVal += cartItem.quantity;
    }

    this.totalPrice.next(totalPriceVal);
    this.totalQuantity.next(totalQuantityVal);

  }
}
