import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';
import { AuthService } from '../services/auth/auth.service';
import { EstablishmentService } from '../services/establishment/establishment.service';

@Component({
  selector: 'app-order-parcel',
  templateUrl: './order-parcel.page.html',
  styleUrls: ['./order-parcel.page.scss'],
})
export class OrderParcelPage implements OnInit {
  orders:Order[];

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private establishmentService: EstablishmentService) {
      this.authService.getCurrentUser().then(user=>{
        this.establishmentService.getEstablishmentByUid(user.uid).then(establishment=>{
          this.orderService.getOrdersParcel(establishment[0].id).subscribe(orders=>{
            this.orders = orders;
          })
        })
      })
    }

  ngOnInit(){

  }

  openRegisterOrder(){
    this.router.navigate(['tabs/order-parcel/register-order-parcel']);
  }

  openDetailOrder(id:string){
    this.router.navigate(['tabs/order-parcel/detail-order-parcel/', id]);
  }

  openTracking(id:string){
    this.router.navigate(['tabs/order-parcel/tracking-order-parcel/', id]);
  }

}
