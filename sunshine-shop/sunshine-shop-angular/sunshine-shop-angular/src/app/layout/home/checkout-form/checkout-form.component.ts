import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { data } from 'jquery';
import { City } from 'src/app/common/city';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CheckoutformService } from 'src/app/services/checkoutform.service';
import { MyValidators } from 'src/app/validators/my-validators';

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
  
  shippingAddressCities: City[] = [];
  billingAddressCities: City[] = [];

  constructor(private formBuilder: FormBuilder, private checkoutform: CheckoutformService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(1), MyValidators.spaceCheck]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(1), MyValidators.spaceCheck]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), MyValidators.spaceCheck]),
        phone: ['']
      }),

      billingAddress: this.formBuilder.group({
        address:  new FormControl('', [Validators.required, Validators.minLength(1), MyValidators.spaceCheck]),
        postcode:  new FormControl('', [Validators.required, Validators.minLength(5), MyValidators.spaceCheck]),
        city: new FormControl('', [Validators.required]),
        state: ['', [Validators.required]],
        country: ['', [Validators.required]]
      }),

      shippingAddress: this.formBuilder.group({
        address:  new FormControl('', [Validators.required, Validators.minLength(1), MyValidators.spaceCheck]),
        postcode:  new FormControl('', [Validators.required, Validators.minLength(5), MyValidators.spaceCheck]),
        city: new FormControl('', [Validators.required]),
        state: ['', [Validators.required]],
        country: ['', [Validators.required]]
      }),

      creditCard: this.formBuilder.group({
        cardType: ['', [Validators.required]],
        nameOnCard: ['', [Validators.required]],
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]{3}')]],
        expirationMonth: ['', Validators.required],
        expirationYear: ['', Validators.required]
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

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressAddress() {return this.checkoutFormGroup.get('shippingAddress.address');}
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState() {return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressPostcode() {return this.checkoutFormGroup.get('shippingAddress.postcode');}
  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country');}

  get billingAddressAddress() {return this.checkoutFormGroup.get('billingAddress.address');}
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState() {return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressPostcode() {return this.checkoutFormGroup.get('billingAddress.postcode');}
  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country');}



  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }
  get creditCardExpirationMonth() { return this.checkoutFormGroup.get('creditCard.expirationMonth'); }
  get creditCardExpirationYear() { return this.checkoutFormGroup.get('creditCard.expirationYear'); }

  getCities(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);

    // const countryCode = formGroup.value.country.code;
    const stateName = formGroup.value.state.name;
    this.checkoutform.getCities(stateName).subscribe(
      data => {
        if (formGroupName === `shippingAddress`) {
          this.shippingAddressCities = data;
        } else {
          this.billingAddressCities = data;
        }
        formGroup.get('city').setValue(data[0]);
      }
    );
  }

  copyShippingToBilling(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
      this.billingAddressCities = this.shippingAddressCities;
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer').value);
    console.log("The email address is " + this.checkoutFormGroup.get('customer').value.email);
  
    console.log("The shipping address country is " + this.checkoutFormGroup.get('shippingAddress').value.country.name);
    console.log("The shipping address state is " + this.checkoutFormGroup.get('shippingAddress').value.state.name);
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
