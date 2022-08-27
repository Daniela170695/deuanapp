import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';
import { AuthService } from '../services/auth/auth.service';
import { EstablishmentService } from '../services/establishment/establishment.service';

@Component({
  selector: 'app-order-urban',
  templateUrl: './order-urban.page.html',
  styleUrls: ['./order-urban.page.scss'],
})
export class OrderUrbanPage implements OnInit {

  orders:Order[];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private establishmentService: EstablishmentService) {

    this.authService.getCurrentUser().then(user=>{
      this.establishmentService.getEstablishmentByUid(user.uid).then(establishment=>{
        this.orderService.getAllOrders(establishment[0].id).subscribe(orders=>{
          this.orders = orders;
        })
      })
    })

  }

  ngOnInit() {

  }

  openRegisterOrder(){
    this.router.navigate(['tabs/order-urban/register-order-urban']);
  }

  openDetailOrder(id:string){
    this.router.navigate(['tabs/order-urban/order-urban-detail/', id]);
  }

  openTracking(id:string){
    this.router.navigate(['tabs/order-urban/tracking-order-urban/', id]);
  }

}
