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
    private orderService: OrderService) {
    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get('id');
    this.orderService.getOneOrder(orderIdFromRoute).subscribe(data=>{
      this.order = data;
    })
  }

  ngOnInit() {

  }

}
