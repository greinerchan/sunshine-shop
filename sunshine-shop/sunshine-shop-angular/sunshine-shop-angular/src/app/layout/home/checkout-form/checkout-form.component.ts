import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        address: [''],
        postcode: [''],
        city: [''],
        state: [''],
        email:[''],
        phone: ['']
      })
    });
  }

  onSubmit() {
    console.log("Handling submit");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

}
