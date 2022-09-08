import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Order } from '../interfaces/order';

import { CityService } from '../services/city/city.service';
import { OrderService } from '../services/order/order.service';
import { OrderTypeService } from '../services/order-type/order-type.service';
import { UserInfoService } from '../services/user-info/user-info.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-rhinoceros',
  templateUrl: './rhinoceros.page.html',
  styleUrls: ['./rhinoceros.page.scss'],
})
export class RhinocerosPage implements OnInit {

  rhinocerosForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private cityService: CityService,
    private orderService: OrderService,
    private orderTypeService: OrderTypeService,
    private userInfoService: UserInfoService,
    private authService: AuthService) {
      this.cityService.getAllCities().then(data=>{
        this.cities = data;
      })
    }

  ngOnInit() {
    this.rhinocerosForm = this.formBuilder.group({
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

  get nameReceived(){
    return this.rhinocerosForm.get('nameReceived');
  }

  get cityReceived(){
    return this.rhinocerosForm.get('cityReceived');
  }

  get addressReceived(){
    return this.rhinocerosForm.get('addressReceived');
  }

  get cellphoneReceived(){
    return this.rhinocerosForm.get('cellphoneReceived');
  }

  get cityDelivered(){
    return this.rhinocerosForm.get('cityDelivered');
  }

  get addressDelivered(){
    return this.rhinocerosForm.get('addressDelivered');
  }

  get cellphoneDelivered(){
    return this.rhinocerosForm.get('cellphoneDelivered');
  }

  get content(){
    return this.rhinocerosForm.get('content');
  }

  async registerOrder(){
    if(this.rhinocerosForm.valid){
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
          name_received: this.nameReceived.value,
          city_received: this.cityReceived.value,
          address_received: this.addressReceived.value,
          cellphone_received: this.cellphoneReceived.value,
          city_delivered: this.cityDelivered.value,
          address_delivered: this.addressDelivered.value,
          cellphone_delivered: this.cellphoneDelivered.value,
          content: this.content.value,
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
        const docRef = await this.orderService.add(order);
        this.router.navigate(['tabs/principal/rhinoceros/tracking-rhinoceros', docRef.id])
      } catch (error) {
        console.log(error);
      }
    }
  }

}
