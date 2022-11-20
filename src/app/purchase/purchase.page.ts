import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ValidationErrors, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';

import { CityService } from '../services/city/city.service';
import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { AuthService } from '../services/auth/auth.service';
import { TypeRequestPriceService } from '../services/type-request-price/type-request-price.service';

import { take } from 'rxjs/operators';

export interface ProductPurchase{
  idProduct:string,
  nameProduct:string,
  nameCategory:string,
  quantity:number
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.page.html',
  styleUrls: ['./purchase.page.scss'],
})
export class PurchasePage implements OnInit {
  requestForm: FormGroup;
  cities: City[];
  displayError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private requestService: RequestService,
    private trackingRequestService: TrackingRequestService,
    private authService: AuthService,
    private typeRequestPriceService: TypeRequestPriceService) {
    this.cityService.getAllCities().then(data=>{
      this.cities = data;
    })

    this.displayError = false;


  }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      cityDelivered: ['', [Validators.required]],
      addressDelivered: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#\-_ ]+$')]],
      cellphoneDelivered: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      description:['', [Validators.required]]
    });
  }

  get cityDelivered(){
    return this.requestForm.get('cityDelivered');
  }

  get addressDelivered(){
    return this.requestForm.get('addressDelivered');
  }

  get cellphoneDelivered(){
    return this.requestForm.get('cellphoneDelivered');
  }

  get description(){
    return this.requestForm.get('description');
  }

  async register(){

      if(this.requestForm.valid){
        try {
          const typeRequest = 3;
          const currentUser = await this.authService.getCurrentUser();
          const typeRequestPrice = await this.typeRequestPriceService.getTypeRequestPrice(typeRequest);
          const now = new Date();
          const request:Request = {
            uid: currentUser.uid,
            courier: null,
            type_request: typeRequest,
            price: typeRequestPrice[0].price,
            city_received: null,
            address_received: null,
            cellphone_received: null,
            city_delivered: this.cityDelivered.value,
            address_delivered: this.addressDelivered.value,
            cellphone_delivered: this.cellphoneDelivered.value,
            content: null,
            description: this.description.value,
            created_datetime: now
          };
          const doc = await this.requestService.add(request);
          const requestId = doc.id;
          const trackingRequest:TrackingRequest = {
            request: requestId,
            cancelled: false,
            accepted: false,
            received: false,
            bought: false,
            delivered: false,
            cancelled_datetime: null,
            accepted_datetime: null,
            received_datetime: null,
            bought_datetime: null,
            delivered_datetime: null
          };
          this.trackingRequestService.add(trackingRequest);
          this.router.navigate(['principal/tracking-purchase', requestId])
        } catch (error) {
          console.log(error);
        }
      }

  }
 
}
