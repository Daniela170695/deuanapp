import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Order } from '../interfaces/order';
import { OrderTracking } from '../interfaces/order-tracking';

import { CityService } from '../services/city/city.service';
import { OrderService } from '../services/order/order.service';
import { OrderTrackingService } from '../services/order-tracking/order-tracking.service';
import { OrderTypeService } from '../services/order-type/order-type.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.page.html',
  styleUrls: ['./shopping.page.scss'],
})
export class ShoppingPage implements OnInit {

  orderForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private orderService: OrderService,
    private orderTrackingService: OrderTrackingService,
    private orderTypeService: OrderTypeService,
    private authService: AuthService) {

    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    })

  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      nameReceived:['', [Validators.required, Validators.pattern('^[a-zA-Z_ ]+$')]],
      cityReceived: ['', [Validators.required]],
      addressReceived: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneReceived: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cityDelivered: ['', [Validators.required]],
      addressDelivered: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneDelivered: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      content:['', [Validators.required]]
    });
  }

}
