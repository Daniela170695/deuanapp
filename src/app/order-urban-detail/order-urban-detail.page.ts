import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-order-urban-detail',
  templateUrl: './order-urban-detail.page.html',
  styleUrls: ['./order-urban-detail.page.scss'],
})
export class OrderUrbanDetailPage implements OnInit {

  order: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get('id');
    console.log(orderIdFromRoute);
    // this.orderService.getOneOrder(orderIdFromRoute).subscribe(data=>{
    //   console.log(data);
    //   this.order = data;
    //   console.log(this.order);
    // })
  }

}
