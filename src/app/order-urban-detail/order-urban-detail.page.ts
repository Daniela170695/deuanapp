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

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private cityService: CityService,
    private establishmentService: EstablishmentService) {

    const routeParams = this.route.snapshot.paramMap;
    const orderIdFromRoute = routeParams.get('id');
    this.orderService.getOneOrder(orderIdFromRoute).subscribe(data=>{
      this.order = data;
      // this.cityService.getOneCity(this.order.cit).then(city=>{
      //   this.locationDelivered = this.order.address+" "+city[0].departamento+"-"+city[0].municipio;
      // })
    });

    const id = localStorage.getItem("establishment");
    this.establishmentService.getEstablishmentById(id).then(establishment=>{
      // this.cityService.getOneCity(establishment.city).then(city=>{
      //   this.locationReceived = establishment.address+" "+city[0].departamento+"-"+city[0].municipio;
      // })
    });
  }

  ngOnInit() {

  }

}
