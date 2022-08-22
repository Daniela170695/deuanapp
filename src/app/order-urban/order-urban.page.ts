import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-order-urban',
  templateUrl: './order-urban.page.html',
  styleUrls: ['./order-urban.page.scss'],
})
export class OrderUrbanPage implements OnInit {

  orders:Order[];

  constructor(
    private router: Router,
    private orderService: OrderService) {

    const establishment = localStorage.getItem("establishment");
    this.orderService.getAllOrders(establishment).subscribe(orders=>{
      this.orders = orders;
    })

  }

  ngOnInit() {

  }

  openRegisterOrder(){
    this.router.navigate(['order-urban/register-order-urban']);
  }

  openDetailOrder(){
    const id = localStorage.getItem("establishment");
    this.router.navigate(['order-urban/order-urban-detail/', id]);
  }

}
