import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';
import { CityService } from '../services/city/city.service';
import { EstablishmentService } from '../services/establishment/establishment.service';


@Component({
  selector: 'app-order-urban-detail',
  templateUrl: './order-urban-detail.page.html',
  styleUrls: ['./order-urban-detail.page.scss'],
})
export class OrderUrbanDetailPage implements OnInit {

  order: Order;
  locationReceived: string;
  locationDelivered: string;
  orderIdFromRoute: string;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cityService: CityService,
    private establishmentService: EstablishmentService) {

    const routeParams = this.route.snapshot.paramMap;
    this.orderIdFromRoute = routeParams.get('id');
    this.orderService.getOneOrder(this.orderIdFromRoute).subscribe(async(data)=>{
      this.order = data;
      this.locationReceived = await this.getLocation(this.order.city_received, this.order.address_received);
      this.locationDelivered = await this.getLocation(this.order.city_delivered, this.order.address_delivered);
    });
  }

  ngOnInit() {

  }

  async getLocation(city:number, address:string){
    const location = await this.cityService.getOneCity(city);
    return address+" "+location[0].departamento+"-"+location[0].municipio;
  }

  cancelOrder(){
    this.orderService.cancelOrder(this.orderIdFromRoute);
  }
}