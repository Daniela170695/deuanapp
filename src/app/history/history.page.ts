import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';
import { RequestService } from '../services/request/request.service';
import { AuthService } from '../services/auth/auth.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  requests:Request[];

  constructor(
    private requestService:RequestService,
    private trackingRequestService: TrackingRequestService,
    private authService: AuthService,
    private router: Router) {
    this.requests = [];
    this.getRequests();
  }

  ngOnInit() {
  }

  async getRequests(){
    const currentUser = await this.authService.getCurrentUser();
    const uid = currentUser.uid;
    const requests = await this.requestService.getAll(uid);
    requests.forEach(element => {
      this.trackingRequestService.getByRequest(element.id).pipe(take(1)).subscribe((trackingRequest:TrackingRequest[])=>{
        const cancelled = trackingRequest[0].cancelled;
        const delivered = trackingRequest[0].delivered;
        if(cancelled || delivered){
          this.requests.push(element);
        }
      })
    });
  }

  openDetailRequest(requestId:string){
    this.router.navigate(['principal/history/detail-request', requestId])
  }


}
