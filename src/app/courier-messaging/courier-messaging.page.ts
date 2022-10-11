import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { City } from '../interfaces/city';
import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';

import { CityService } from '../services/city/city.service';
import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { TypeRequestService } from '../services/type-request/type-request.service';
import { AuthService } from '../services/auth/auth.service';

import { take } from 'rxjs/operators';

@Component({
  selector: 'app-courier-messaging',
  templateUrl: './courier-messaging.page.html',
  styleUrls: ['./courier-messaging.page.scss'],
})
export class CourierMessagingPage implements OnInit {

  requestForm: FormGroup;
  cities: City[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cityService: CityService,
    private requestService: RequestService,
    private trackingRequestService: TrackingRequestService,
    private typeRequestService: TypeRequestService,
    private authService: AuthService) {
      this.cityService.getAllCities().then(data=>{
        this.cities = data;
      })
    }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
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
    return this.requestForm.get('cityReceived');
  }

  get addressReceived(){
    return this.requestForm.get('addressReceived');
  }

  get cellphoneReceived(){
    return this.requestForm.get('cellphoneReceived');
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

  get content(){
    return this.requestForm.get('content');
  }

  register(){
    if(this.requestForm.valid){
      this.authService.getCurrentUser().pipe(take(1)).subscribe(async(currentUser)=>{
        try {
          const idTypeRequest = "1bRq52ZqVrcBJwcmQUyD";
          const typeRequest = await this.typeRequestService.getTypeRequest(idTypeRequest);
          const now = new Date();
          const request:Request = {
            uid: currentUser.uid,
            courier: null,
            type_request: idTypeRequest,
            price: typeRequest.price,
            city_received: this.cityReceived.value,
            address_received: this.addressReceived.value,
            cellphone_received: this.cellphoneReceived.value,
            city_delivered: this.cityDelivered.value,
            address_delivered: this.addressDelivered.value,
            cellphone_delivered: this.cellphoneDelivered.value,
            content: this.content.value,
            created_datetime: now,
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
          this.router.navigate(['principal/tracking-courier-messaging', requestId])

        } catch (error) {
          console.log(error);
        }
      })

    }
  }

}
