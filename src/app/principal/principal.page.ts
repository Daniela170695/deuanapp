import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';

import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  display: boolean = false;
  requestId: string;
  requestType: number;

  constructor(
    private router:Router,
    private requestService: RequestService,
    private trackingRequestService:TrackingRequestService,
    private authService: AuthService,
    private iab: InAppBrowser) {
    this.validateRequestInProgress();
  }

  ngOnInit() {
  }

  async validateRequestInProgress(){
    const currentUser = await this.authService.getCurrentUser();
    const uid = currentUser.uid;
    const requests = await this.requestService.getAll(uid);
    requests.forEach(request => {
      this.trackingRequestService.getByRequest(request.id).subscribe(trackingRequest=>{
        const cancelled = trackingRequest[0].cancelled;
        const delivered = trackingRequest[0].delivered;
        if(cancelled==false && delivered == false){
          this.requestId = request.id;
          this.display = true;
        }
        else{
          this.requestId = null;
          this.display = false;
        }
      })
    });
  }

  openRhinoceros(){
    this.router.navigate(['principal/rhinoceros'])
  }

  openTypeService(){
    this.router.navigate(['principal/type-service'])
  }

  openTracking(){
   this.router.navigate(['principal/tracking-request', this.requestId]);
  }

  openStore(){
    this.iab.create('https://deunastore.com');
  }

}
