import { Product } from './product';

export class CartItem {

    id: number;
    name: string;
    imageUrl: string;
    unitPrice: number;
    quantity:number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.productName;       
        this.imageUrl = product.productImageUrl;
        this.unitPrice = product.productPrice;
        this.quantity = 1; 
    }
}
