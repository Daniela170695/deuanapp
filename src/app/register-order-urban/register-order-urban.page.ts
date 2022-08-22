import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { City } from '../interfaces/city';
import { Order } from '../interfaces/order';

import { CityService } from '../services/city/city.service';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-register-order-urban',
  templateUrl: './register-order-urban.page.html',
  styleUrls: ['./register-order-urban.page.scss'],
})
export class RegisterOrderUrbanPage implements OnInit {

  orderUrbanForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private orderService: OrderService,
    private router:Router) {

    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    })
  }

  ngOnInit() {
    this.orderUrbanForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      neighborhood: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\-_ ]+$')]],
      kg: ['', [Validators.pattern('^[0-9]+$')]]
    });
  }

  get city(){
    return this.orderUrbanForm.get('city');
  }

  get neighborhood(){
    return this.orderUrbanForm.get('neighborhood');
  }

  get address(){
    return this.orderUrbanForm.get('address');
  }

  get kg() {
    return this.orderUrbanForm.get('kg');
  }

  registerOrder(){
    if(this.orderUrbanForm.valid){
      const establishment = localStorage.getItem('establishment');
      const kg = this.orderUrbanForm.value.kg ? this.orderUrbanForm.value.kg:null;
      const now = new Date();
      const order:Order = {
        establishment: establishment,
        type: "jgZuLrPdP4SaRjWopSCh",
        courier: null,
        city: this.orderUrbanForm.value.city,
        neighborhood: this.orderUrbanForm.value.neighborhood,
        address: this.orderUrbanForm.value.address,
        kg: kg,
        cancelled: false,
        accepted: false,
        received: false,
        delivered: false,
        created_datetime: now,
        cancelled_datetime: null,
        accepted_datetime: null,
        received_datetime: null,
        delivered_datetime: null
      };
      this.orderService.add(order);
      this.router.navigate(['order-urban']);

    }
  }
}
