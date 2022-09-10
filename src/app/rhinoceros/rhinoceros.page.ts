import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Order } from '../interfaces/order';
import { OrderTracking } from '../interfaces/order-tracking';

import { CityService } from '../services/city/city.service';
import { OrderService } from '../services/order/order.service';
import { OrderTypeService } from '../services/order-type/order-type.service';
import { AuthService } from '../services/auth/auth.service';
import { OrderTrackingService } from '../services/order-tracking/order-tracking.service';

@Component({
  selector: 'app-rhinoceros',
  templateUrl: './rhinoceros.page.html',
  styleUrls: ['./rhinoceros.page.scss'],
})
export class RhinocerosPage implements OnInit {

  orderForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private orderService: OrderService,
    private orderTypeService: OrderTypeService,
    private authService: AuthService,
    private orderTrackingService: OrderTrackingService) {
      this.cityService.getAllCities().then(data=>{
        this.cities = data;
      })
    }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      cityReceived: ['', [Validators.required]],
      addressReceived: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneReceived: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cityDelivered: ['', [Validators.required]],
      addressDelivered: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneDelivered: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      content:['', [Validators.required]]
    });
  }

  get cityReceived(){
    return this.orderForm.get('cityReceived');
  }

  get addressReceived(){
    return this.orderForm.get('addressReceived');
  }

  get cellphoneReceived(){
    return this.orderForm.get('cellphoneReceived');
  }

  get cityDelivered(){
    return this.orderForm.get('cityDelivered');
  }

  get addressDelivered(){
    return this.orderForm.get('addressDelivered');
  }

  get cellphoneDelivered(){
    return this.orderForm.get('cellphoneDelivered');
  }

  get content(){
    return this.orderForm.get('content');
  }

  async registerOrder(){
    if(this.orderForm.valid){
      try {
        const idOrderType = "jgZuLrPdP4SaRjWopSCh";
        const orderType = await this.orderTypeService.getOrderType(idOrderType);
        const currentUser = await this.authService.getCurrentUser();
        const now = new Date();
        const order:Order = {
          uid: currentUser.uid,
          courier: null,
          type: idOrderType,
          price: orderType.price,
          city_received: this.cityReceived.value,
          address_received: this.addressReceived.value,
          cellphone_received: this.cellphoneReceived.value,
          city_delivered: this.cityDelivered.value,
          address_delivered: this.addressDelivered.value,
          cellphone_delivered: this.cellphoneDelivered.value,
          content: this.content.value,
          created_datetime: now,
        };
        const doc = await this.orderService.add(order);
        const orderId = doc.id;
        const orderTracking:OrderTracking = {
          order: orderId,
          cancelled: false,
          accepted: false,
          received: false,
          delivered: false,
          cancelled_datetime: null,
          accepted_datetime: null,
          received_datetime: null,
          delivered_datetime: null
        }
        this.orderTrackingService.add(orderTracking);
        this.router.navigate(['tabs/principal/rhinoceros/tracking-rhinoceros', orderId])
      } catch (error) {
        console.log(error);
      }
    }
  }

}
