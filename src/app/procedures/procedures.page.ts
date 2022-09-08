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
  selector: 'app-procedures',
  templateUrl: './procedures.page.html',
  styleUrls: ['./procedures.page.scss'],
})
export class ProceduresPage implements OnInit {

  rhinocerosForm: FormGroup;
  cities: City[];

  constructor() { }

  ngOnInit() {
  }

}
