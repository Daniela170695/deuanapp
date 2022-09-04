import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Order } from '../interfaces/order';

import { OrderService } from '../services/order/order.service';
import { CityService } from '../services/city/city.service';
import { EstablishmentService } from '../services/establishment/establishment.service';

@Component({
  selector: 'app-detail-order-urban',
  templateUrl: './detail-order-urban.page.html',
  styleUrls: ['./detail-order-urban.page.scss'],
})
export class DetailOrderUrbanPage implements OnInit {

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

  async getLocation(city:string, address:string){
    const location = await this.cityService.getOneCity(city);
    return address+", "+location[0].municipio+", "+location[0].departamento;
  }

  cancelOrder(){
    this.orderService.cancelOrder(this.orderIdFromRoute);
  }
}
