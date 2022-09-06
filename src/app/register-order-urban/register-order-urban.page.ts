import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { City } from '../interfaces/city';
import { Order } from '../interfaces/order';

import { CityService } from '../services/city/city.service';
import { OrderService } from '../services/order/order.service';
import { OrderTypeService } from '../services/order-type/order-type.service';
import { EstablishmentService } from '../services/establishment/establishment.service';
import { AuthService } from '../services/auth/auth.service';

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
    private router:Router,
    private cityService: CityService,
    private orderService: OrderService,
    private orderTypeService: OrderTypeService,
    private establishmentService: EstablishmentService,
    private authService: AuthService) {

    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    })
  }

  ngOnInit() {
    this.orderUrbanForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      kg: ['', [Validators.pattern('^[0-9]+$')]]
    });
  }

  get city(){
    return this.orderUrbanForm.get('city');
  }

  get address(){
    return this.orderUrbanForm.get('address');
  }

  get kg() {
    return this.orderUrbanForm.get('kg');
  }

  async registerOrder(){
    if(this.orderUrbanForm.valid){
      try {
        const idOrderType = "jgZuLrPdP4SaRjWopSCh";
        const orderType = await this.orderTypeService.getOrderType(idOrderType);
        const currentUser = await this.authService.getCurrentUser();
        const establishment = await this.establishmentService.getEstablishmentByUid(currentUser.uid);
        const kg = this.kg.value ? this.kg.value:null;
        const now = new Date();
        const order:Order = {
          establishment: establishment[0].id,
          type: idOrderType,
          courier: null,
          city_delivered: this.city.value,
          address_delivered: this.address.value,
          price: orderType.price,
          city_received: establishment[0].city,
          address_received: establishment[0].address,
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
        this.router.navigate(['tabs/order-urban']);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
