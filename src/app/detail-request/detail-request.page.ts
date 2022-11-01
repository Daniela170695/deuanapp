import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from '../interfaces/request';
import { TrackingRequest } from '../interfaces/tracking-request';
import { TypeRequestPrice } from '../interfaces/type-request-price';
import { RequestService } from '../services/request/request.service';
import { TrackingRequestService } from '../services/tracking-request/tracking-request.service';
import { TypeRequestPriceService } from '../services/type-request-price/type-request-price.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail-request',
  templateUrl: './detail-request.page.html',
  styleUrls: ['./detail-request.page.scss'],
})
export class DetailRequestPage implements OnInit {
  requestId:string;
  request: Request;
  trackingRequest: TrackingRequest;
  typeRequestPrice: TypeRequestPrice;

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private trackingRequestService: TrackingRequestService,
    private typeRequestPriceService: TypeRequestPriceService) {
    const routeParams = this.route.snapshot.paramMap;
    this.requestId = routeParams.get('requestId');
    this.requestService.getOne(this.requestId).pipe(take(1)).subscribe(async request=>{
      this.request = request;
      const typeRequestPrice = await this.typeRequestPriceService.getTypeRequestPrice(this.request.type_request);
      this.typeRequestPrice = typeRequestPrice[0];
    })
    this.trackingRequestService.getByRequest(this.requestId).pipe(take(1)).subscribe(data=>{
      this.trackingRequest = data[0];
    })
  }

  ngOnInit() {

  }

}
