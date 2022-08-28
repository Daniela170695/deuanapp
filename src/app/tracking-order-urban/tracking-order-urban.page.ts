import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../interfaces/order';
import { Courier } from '../interfaces/courier';
import { OrderService } from '../services/order/order.service';
import { CourierService } from '../services/courier/courier.service';

@Component({
  selector: 'app-tracking-order-urban',
  templateUrl: './tracking-order-urban.page.html',
  styleUrls: ['./tracking-order-urban.page.scss'],
})
export class TrackingOrderUrbanPage implements OnInit {

  order: Order;
  courier: Courier;

  constructor(
    private route:ActivatedRoute,
    private orderService: OrderService,
    private courierService: CourierService) {

    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get('id');
    this.orderService.getOneOrder(orderIdFromRoute).subscribe(data=>{
      this.order = data;
      this.courierService.getCourier(this.order.courier).subscribe(data=>{
        this.courier = data;
      })
    })

    }

  ngOnInit() {
  }

}
