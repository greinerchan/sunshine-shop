import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { data } from 'jquery';
import { CheckoutformService } from 'src/app/services/checkoutform.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuanity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  
  constructor(private formBuilder: FormBuilder, private checkoutform: CheckoutformService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email:[''],
        phone: ['']
      }),

      billingAddress: this.formBuilder.group({
        postcode: [''],
        city: [''],
        state: [''],
        address: ['']
      }),

      shippingAddress: this.formBuilder.group({
        address: [''],
        postcode: [''],
        city: [''],
        state: ['']
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    const startMonth: number = new Date().getMonth() + 1;

    this.checkoutform.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.checkoutform.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );
  }

  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log("Handling submit");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

}
