import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { data } from 'jquery';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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

  countries: Country[];
  states: State[];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];


  constructor(private formBuilder: FormBuilder, private checkoutform: CheckoutformService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
        phone: ['']
      }),

      billingAddress: this.formBuilder.group({
        postcode: [''],
        city: [''],
        state: [''],
        address: [''],
        country: [``]
      }),

      shippingAddress: this.formBuilder.group({
        address: [''],
        postcode: [''],
        city: [''],
        state: [''],
        country: [``]
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

    this.checkoutform.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

    // this.checkoutform.getStates().subscribe(
    //   data => {
    //     this.states = data;
    //   }
    // );


  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // const countryCode = formGroup.value.country.code;
    console.log(formGroup);
    const countryName = formGroup.value.country.name;
    this.checkoutform.getStates(countryName).subscribe(
      data => {
        if (formGroupName === `shippingAddress`) {
          this.shippingAddressStates = data;
        } else {
          this.billingAddressStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

copyShippingToBilling(event) {
  if (event.target.checked) {
    this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    this.billingAddressStates = this.shippingAddressStates;
  } else {
    this.checkoutFormGroup.controls.billingAddress.reset();
  }
}

onSubmit() {
  console.log("Handling submit");
  console.log(this.checkoutFormGroup.get('customer').value);
}

startFromOne() {
  const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

  const currentYear: number = new Date().getFullYear();
  const sYear: number = Number(creditCardFormGroup.value.expirationYear);

  let startMonth: number;

  if (currentYear === sYear) {
    startMonth = new Date().getMonth() + 1;
  } else {
    startMonth = 1;
  }

  this.checkoutform.getCreditCardMonths(startMonth).subscribe(data => {
    this.creditCardMonths = data;
  });
}
  

}
